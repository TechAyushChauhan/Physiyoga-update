"use client";

import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    bio: "Passionate developer and tech enthusiast.",
    profilePicture: "/images/default-profile.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicture: imageUrl });
    }
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-6">
      {/* Header */}
      <header className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
          My Profile
        </h1>
      </header>

      {/* Profile Content */}
      <main
        className={`max-w-4xl mx-auto shadow-xl rounded-lg mt-10 p-6 transition-colors duration-300 ${
          isEditing ? "bg-white" : "bg-gray-100"
        }`}
      >
        {/* Profile Picture Section */}
        <div className="flex items-center justify-center flex-col">
          <img
            src={formData.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-green-400 to-blue-500"
          />
          {isEditing && (
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                aria-label="Upload Profile Picture"
                className="text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
            </div>
          )}
        </div>

        {/* User Details */}
        <div className="mt-8 space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-700">Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border rounded-lg p-2 w-2/3 bg-gray-50"
                aria-label="Edit Name"
              />
            ) : (
              <span className="text-gray-800">{user.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-700">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border rounded-lg p-2 w-2/3 bg-gray-50"
                aria-label="Edit Email"
              />
            ) : (
              <span className="text-gray-800">{user.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-700">Phone:</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border rounded-lg p-2 w-2/3 bg-gray-50"
                aria-label="Edit Phone"
              />
            ) : (
              <span className="text-gray-800">{user.phone}</span>
            )}
          </div>

          {/* Bio */}
          <div className="flex flex-col space-y-2">
            <label className="font-bold text-gray-700">Bio:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full bg-gray-50"
                aria-label="Edit Bio"
              ></textarea>
            ) : (
              <p className="text-gray-800">{user.bio}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
