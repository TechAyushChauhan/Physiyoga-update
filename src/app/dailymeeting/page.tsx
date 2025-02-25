'use client'

import React, { useState, useEffect } from 'react';
import { Clock, Link, Send, Check, X, Search, Users } from 'lucide-react';
import LoginNavbar from "../Components/loginnavbar/page";
import LoginFooter from "../Components/loginfooter/page";
import ScheduleSection from './schedulegetallcomponent';

interface User {
  _id: string;
  username: string;
  mobileOrEmail: string;
}

interface MeetingParticipant {
  userid: string;
  name: string;
  email: string;
}

interface MeetingSchedule {
  topic: string;
  start_time: string;
  duration: string;
  link: string;
  participants: MeetingParticipant[];
}

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 z-50 animate-slide-up">
    <div className={`${
      type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
    } border px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-95 flex items-center justify-between`}>
      <div className="flex items-center">
        {type === 'success' ? 
          <Check className="w-5 h-5 mr-2 text-green-500" /> : 
          <X className="w-5 h-5 mr-2 text-red-500" />
        }
        {message}
      </div>
    </div>
  </div>
);

const MeetingInvitePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingTopic, setMeetingTopic] = useState('');
  const [meetingDuration, setMeetingDuration] = useState('30min');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setToast({
        show: true,
        message: 'Authentication token not found. Please login again.',
        type: 'error'
      });
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.type === 'S') {
        setUsers(data.data);
      } else {
        setToast({
          show: true,
          message: data.msg || 'Failed to fetch users',
          type: 'error'
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: 'Error fetching users. Please try again.',
        type: 'error'
      });
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUsers(prev => 
      prev.find(u => u._id === user._id)
        ? prev.filter(u => u._id !== user._id)
        : [...prev, user]
    );
  };

  const handleSendInvites = async () => {
    if (!meetingLink || !meetingTime || !meetingTopic || selectedUsers.length === 0) {
      setToast({
        show: true,
        message: 'Please fill in all fields and select at least one user',
        type: 'error'
      });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      return;
    }

    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setToast({
        show: true,
        message: 'Authentication token not found. Please login again.',
        type: 'error'
      });
      return;
    }

    // Format the meeting schedule data according to the API schema
    const meetingSchedule: MeetingSchedule = {
      topic: meetingTopic,
      start_time: new Date(meetingTime).toISOString(),
      duration: meetingDuration,
      link: meetingLink,
      participants: selectedUsers.map(user => ({
        userid: user._id,
        name: user.username,
        email: user.mobileOrEmail
      }))
    };

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingSchedule)
      });

      const data = await response.json();

      if (response.ok) {
        setToast({
          show: true,
          message: 'Meeting scheduled successfully!',
          type: 'success'
        });
        
        // Reset form
        setSelectedUsers([]);
        setMeetingLink('');
        setMeetingTime('');
        setMeetingTopic('');
      } else {
        throw new Error(data.msg || 'Failed to schedule meeting');
      }
    } catch (error) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'Failed to schedule meeting. Please try again.',
        type: 'error'
      });
    } finally {
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobileOrEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <LoginNavbar />
      <ScheduleSection />
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2 group">
            <Users className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            Schedule Meeting
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Meeting Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-lg font-semibold text-gray-800">Meeting Details</h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Meeting Topic */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Meeting Topic
              </label>
              <input
                type="text"
                value={meetingTopic}
                onChange={(e) => setMeetingTopic(e.target.value)}
                placeholder="Enter meeting topic"
                className="block w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Meeting Link */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Meeting Link
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="Paste meeting link here"
                  className="block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            
            {/* Meeting Time */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Meeting Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <input
                  type="datetime-local"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            {/* Meeting Duration */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Duration
              </label>
              <select
                value={meetingDuration}
                onChange={(e) => setMeetingDuration(e.target.value)}
                className="block w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-gray-50 focus:bg-white"
              >
                <option value="15min">15 minutes</option>
                <option value="30min">30 minutes</option>
                <option value="45min">45 minutes</option>
                <option value="60min">1 hour</option>
                <option value="90min">1.5 hours</option>
                <option value="120min">2 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Selection Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-lg font-semibold text-gray-800">Select Participants</h2>
          </div>
          
          <div className="p-6">
            {/* Search Box */}
            <div className="relative mb-6 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Selected Users Pills */}
            {selectedUsers.length > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Selected Users ({selectedUsers.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map(user => (
                    <div
                      key={user._id}
                      className="bg-white text-blue-800 px-3 py-1.5 rounded-full text-sm flex items-center border shadow-sm hover:shadow-md transition-all duration-200 group"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-2 group-hover:scale-110 transition-transform">
                        {getInitials(user.username)}
                      </span>
                      {user.username}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserSelect(user);
                        }}
                        className="ml-2 p-1 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3 text-gray-500 hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users List */}
            <div className="space-y-3 max-h-96 overflow-y-auto rounded-xl">
              {filteredUsers.map(user => (
                <div
                  key={user._id}
                  onClick={() => handleUserSelect(user)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] ${
                    selectedUsers.find(u => u._id === user._id)
                      ? 'bg-gradient-to-r from-blue-50 to-white border-blue-200 border shadow-sm'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 flex items-center justify-center text-sm font-medium transform hover:scale-110 transition-transform">
                      {getInitials(user.username)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{user.username}</p>
                      <p className="text-sm text-gray-500 truncate">{user.mobileOrEmail}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {selectedUsers.find(u => u._id === user._id) && (
                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0 animate-scale-check" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Send Button */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-t">
            <button
              onClick={handleSendInvites}
              disabled={!meetingLink || !meetingTime || selectedUsers.length === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-500 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span>Send Invites ({selectedUsers.length} users)</span>
            </button>
          </div>
        </div>
      </div>


      {/* Toast Notification */}
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      <style jsx global>{`
        @keyframes scale-check {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes slide-up {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-scale-check {
          animation: scale-check 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
            <LoginFooter />

    </div>
  );
};

export default MeetingInvitePage;