
"use client"
import React, { useEffect, useState } from 'react';
import { Users, Edit, Trash2, Search, Save, X } from 'lucide-react';
import LoginNavbar from "../Components/loginnavbar/page";
interface User {
  _id: string;
  username: string;
  password: string;
  mobileOrEmail: string;
}

const UserManagementDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<User>({
    _id: '',
    username: '',
    password: '',
    mobileOrEmail: ''
  });

  const filteredUsers = users.filter(user => 
    (user._id?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.username?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.mobileOrEmail?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const fetchUserData = async () => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setUsers(data.data);
      } else {
        console.error('Error:', data.msg);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditClick = (user: User) => {
    setEditingUserId(user._id);
    setEditForm(user);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditForm({
      _id: '',
      username: '',
      password: '',
      mobileOrEmail: ''
    });
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
  
      if (response.ok) {
        setUsers(users.map(user => 
          user._id === editForm._id ? editForm : user
        ));
        setEditingUserId(null);
        alert('User updated successfully');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      console.error('No token found');
      return;
    }
  
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch('/api/user/delete', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            _id: userId,
            status: 'delete'
          }),
        });
  
        if (response.ok) {
          setUsers(users.filter(user => user._id !== userId));
          alert('User deleted successfully');
        } else {
          const data = await response.json();
          throw new Error(data.message || 'Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <LoginNavbar />
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="bg-blue-600 text-white p-5 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8" />
              <h1 className="text-2xl font-bold">User Management</h1>
            </div>
            <span className="bg-blue-500 px-4 py-2 rounded-md">
              Users: {filteredUsers.length}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="p-5 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{user.username}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user._id ? (
                      <input
                        type="text" // Changed from "password" to "text"
                        value={editForm.password}
                        onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{user.password}</span> // Show actual password instead of asterisks
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editForm.mobileOrEmail}
                        onChange={(e) => setEditForm({...editForm, mobileOrEmail: e.target.value})}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{user.mobileOrEmail}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {editingUserId === user._id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementDashboard;