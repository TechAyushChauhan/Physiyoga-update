"use client"

import React, { useState } from 'react';
import { Users, Edit, Trash2, Search, GraduationCap, BookOpen, Clock } from 'lucide-react';

// Mock user data (in a real application, this would come from a backend)
const initialUsers = [
  {
    id: 1,
    username: 'johndoe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    registeredAt: '2024-01-15',
    courses: [
      { id: 1, name: 'Advanced React Development', progress: 65 },
      { id: 2, name: 'Node.js Backend Mastery', progress: 40 }
    ]
  },
  {
    id: 2,
    username: 'janesmirth',
    email: 'jane.smith@example.com',
    phoneNumber: '+1 (555) 987-6543',
    registeredAt: '2024-02-20',
    courses: [
      { id: 3, name: 'Python for Data Science', progress: 85 }
    ]
  },
  {
    id: 3,
    username: 'alexwang',
    email: 'alex.wang@example.com',
    phoneNumber: '+1 (555) 246-8135',
    registeredAt: '2024-03-10',
    courses: [
      { id: 4, name: 'Machine Learning Fundamentals', progress: 55 },
      { id: 5, name: 'Cloud Computing Essentials', progress: 30 }
    ]
  },
  {
    id: 4,
    username: 'emilychan',
    email: 'emily.chan@example.com',
    phoneNumber: '+1 (555) 369-2580',
    registeredAt: '2024-04-05',
    courses: [
      { id: 6, name: 'Cybersecurity Foundations', progress: 75 }
    ]
  }
];

const UserManagementDashboard: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm)
  );

  // Handle user deletion
  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 font-sans">
      <div className="container mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden max-w-6xl">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 flex items-center shadow-md">
          <Users className="w-10 h-10 mr-4 text-emerald-100" />
          <h1 className="text-3xl font-extrabold tracking-tight">User Management Dashboard</h1>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500" />
            <input 
              type="text"
              placeholder="Search users by username, email, or phone number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 transition-all duration-300"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                {['ID', 'Username', 'Email/Phone', 'Registered At', 'Courses', 'Actions'].map((header) => (
                  <th 
                    key={header} 
                    className="px-6 py-4 text-left text-emerald-800 font-semibold uppercase tracking-wider text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="border-b border-gray-200 hover:bg-emerald-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-700">{user.id}</td>
                  <td className="px-6 py-4 font-medium text-emerald-900">{user.username}</td>
                  <td className="px-6 py-4">
                    <div className="text-gray-800">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.registeredAt}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {user.courses.map((course) => (
                        <div 
                          key={course.id} 
                          className="bg-indigo-50 rounded-lg p-2 flex items-center"
                        >
                          <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                          <div className="flex-grow">
                            <div className="text-sm font-medium text-indigo-900">{course.name}</div>
                            <div className="w-full bg-indigo-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{width: `${course.progress}%`}}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs text-indigo-700 ml-2">{course.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-3">
                      <button 
                        className="text-emerald-600 hover:text-emerald-800 transition-colors duration-200 p-2 rounded-full hover:bg-emerald-100"
                        title="Edit User"
                      >
                        <Edit className="w-6 h-6" />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                        title="Delete User"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User and Course Count */}
        <div className="p-6 bg-gray-100 flex justify-between items-center">
          <div>
            <span className="text-emerald-800 font-semibold text-lg mr-4">
              <GraduationCap className="inline-block mr-2 text-emerald-600" />
              Total Courses: {filteredUsers.reduce((total, user) => total + user.courses.length, 0)}
            </span>
          </div>
          <div>
            <span className="text-emerald-800 font-semibold text-lg">
              Total Users: {filteredUsers.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDashboard;