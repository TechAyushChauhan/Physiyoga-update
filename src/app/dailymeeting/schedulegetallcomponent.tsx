'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, ExternalLink, Edit } from 'lucide-react';

interface Participant {
  userid?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Meeting {
  _id: string;
  topic: string;
  start_time: string;
  link: string;
  duration: string | number;
  participants?: Participant[];
  userId?: string;
  courseId?: string;
  meetingDate?: string | null;
  day?: number;
  meetingLink?: string;
}

const ScheduleSection = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/schedule');
        if (!response.ok) throw new Error('Failed to fetch meetings');
        const data = await response.json();

        // Check if data is an array before using map
        if (Array.isArray(data)) {
          const sortedMeetings = data.sort((a: Meeting, b: Meeting) => {
            const dateA = new Date(a.start_time || 0).getTime();
            const dateB = new Date(b.start_time || 0).getTime();
            return dateB - dateA;
          });
          setMeetings(sortedMeetings);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load meetings');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const formatDuration = (duration: string | number) => {
    if (typeof duration === 'number') return `${duration} min`;
    return duration;
  };

  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr);
      if (isNaN(date.getTime())) return 'Invalid date';

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;

      return `${month} ${day}, ${year} ${formattedHours}:${minutes} ${ampm}`;
    } catch {
      return 'Invalid date';
    }
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
  };

  const handleUpdateMeeting = async () => {
    if (editingMeeting) {
      try {
        const response = await fetch(`http://localhost:3000/api/schedule`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingMeeting),
        });

        if (!response.ok) throw new Error('Failed to update meeting');
        
        // Fetch the updated meeting list after update
        const updatedMeetings = await response.json();
        setMeetings(updatedMeetings);
        setEditingMeeting(null);  // Close the editing state
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update meeting');
      }
    }
  };

  const calculateDuration = (startTime: string) => {
    const startDate = new Date(startTime);
    const currentDate = new Date();
    const durationInMinutes = Math.floor((currentDate.getTime() - startDate.getTime()) / 60000);
    
    // Return duration based on the minutes calculated
    if (durationInMinutes <= 15) return '15min';
    if (durationInMinutes <= 30) return '30min';
    if (durationInMinutes <= 45) return '45min';
    if (durationInMinutes <= 60) return '60min';
    if (durationInMinutes <= 90) return '90min';
    return '120min';
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-h-[calc(100vh-200px)] overflow-hidden flex flex-col">
      <div className="bg-white sticky top-0 z-10 p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Meetings</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(meetings) && meetings.length > 0 ? (
          meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:border-blue-200 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">{meeting.topic}</h3>
                  
                  <div className="mt-2 space-y-2">
                    {meeting.start_time && (
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDateTime(meeting.start_time)}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formatDuration(meeting.duration)}</span>
                    </div>

                    {meeting.participants && meeting.participants.length > 0 && (
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-2">
                            {meeting.participants.map((participant, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center"
                                title={participant.name}
                              >
                                {participant.avatar ? (
                                  <img
                                    src={participant.avatar}
                                    alt={participant.name}
                                    className="w-full h-full rounded-full"
                                  />
                                ) : (
                                  <span className="text-sm font-medium text-blue-600">
                                    {participant.name.charAt(0)}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm">
                            {meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={meeting.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Join
                  </a>
                  <button
                    onClick={() => handleEditMeeting(meeting)}
                    className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No upcoming meetings</div>
        )}
      </div>

      {editingMeeting && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Meeting</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Topic</label>
              <input
                type="text"
                value={editingMeeting.topic}
                onChange={(e) => setEditingMeeting({ ...editingMeeting, topic: e.target.value })}
                className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Start Time</label>
              <input
                type="datetime-local"
                value={editingMeeting.start_time}
                onChange={(e) => setEditingMeeting({ ...editingMeeting, start_time: e.target.value })}
                className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Meeting Link</label>
              <input
                type="url"
                value={editingMeeting.link}
                onChange={(e) => setEditingMeeting({ ...editingMeeting, link: e.target.value })}
                className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Duration</label>
              <select
                value={editingMeeting.duration}
                onChange={(e) => setEditingMeeting({ ...editingMeeting, duration: e.target.value })}
                className="w-full p-2 bg-white text-black border border-gray-300 rounded-lg"
              >
                <option value="15min">15 minutes</option>
                <option value="30min">30 minutes</option>
                <option value="45min">45 minutes</option>
                <option value="60min">1 hour</option>
                <option value="90min">1.5 hours</option>
                <option value="120min">2 hours</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingMeeting(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMeeting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleSection;
