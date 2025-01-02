"use client";

import React, { useState } from "react";
import { Link } from "lucide-react";

const SessionManagement = () => {
  // Initial dummy data with meeting URLs
  const initialDummyData = [
    {
      memberName: "Alice Cooper",
      courseName: "Advanced JavaScript",
      sessionDate: "2024-01-15",
      sessionTime: "09:00",
      sessionNumber: 1,
      completionStatus: "Completed",
      meetingUrl: "https://meet.google.com/abc-defg-hij"
    },
    {
      memberName: "Bob Wilson",
      courseName: "React Fundamentals",
      sessionDate: "2024-01-16",
      sessionTime: "14:00",
      sessionNumber: 2,
      completionStatus: "Pending",
      meetingUrl: "https://zoom.us/j/123456789"
    },
    {
      memberName: "Carol Davis",
      courseName: "Web Design Basics",
      sessionDate: "2024-01-17",
      sessionTime: "11:30",
      sessionNumber: 3,
      completionStatus: "In Progress",
      meetingUrl: "https://teams.microsoft.com/l/meetup-join/123"
    }
  ];

  const [sessionData, setSessionData] = useState(initialDummyData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    sessionDate: "",
    sessionTime: "",
    sessionNumber: 1,
    meetingUrl: ""
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({
      sessionDate: sessionData[index].sessionDate,
      sessionTime: sessionData[index].sessionTime,
      sessionNumber: sessionData[index].sessionNumber,
      meetingUrl: sessionData[index].meetingUrl
    });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (editingIndex !== null) {
      const updatedData = [...sessionData];
      updatedData[editingIndex] = {
        ...updatedData[editingIndex],
        sessionDate: editData.sessionDate,
        sessionTime: editData.sessionTime,
        sessionNumber: editData.sessionNumber,
        meetingUrl: editData.meetingUrl
      };
      setSessionData(updatedData);
      setIsEditing(false);
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

  // Function to get platform icon/name from URL
  const getMeetingPlatform = (url: string) => {
    if (url.includes("zoom")) return "Zoom";
    if (url.includes("meet.google")) return "Google Meet";
    if (url.includes("teams")) return "MS Teams";
    return "Meeting Link";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-6 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Session Records
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-100">
                  {[
                    "Edit Session",
                    "Member Name",
                    "Course Name",
                    "Session Date",
                    "Session Time",
                    "Session Number",
                    "Meeting Link",
                    "Status"
                  ].map((header) => (
                    <th key={header} className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessionData.map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-sm"
                      >
                        Edit Session
                      </button>
                    </td>
                    <td className="px-4 py-2 font-medium">{data.memberName}</td>
                    <td className="px-4 py-2">{data.courseName}</td>
                    <td className="px-4 py-2">{data.sessionDate}</td>
                    <td className="px-4 py-2">{data.sessionTime}</td>
                    <td className="px-4 py-2">Session {data.sessionNumber}</td>
                    <td className="px-4 py-2">
                      <a
                        href={data.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-purple-600 hover:text-purple-800"
                      >
                        <Link className="w-4 h-4 mr-1" />
                        {getMeetingPlatform(data.meetingUrl)}
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        data.completionStatus === "Completed" ? "bg-green-100 text-green-800" :
                        data.completionStatus === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {data.completionStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Session Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Session Details</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">
                  Session Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={editData.sessionDate}
                  onChange={(e) => setEditData({ ...editData, sessionDate: e.target.value })}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="time" className="text-sm font-medium text-gray-700 mb-1">
                  Session Time
                </label>
                <input
                  id="time"
                  type="time"
                  value={editData.sessionTime}
                  onChange={(e) => setEditData({ ...editData, sessionTime: e.target.value })}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>


              <div className="flex flex-col">
                <label htmlFor="meetingUrl" className="text-sm font-medium text-gray-700 mb-1">
                  Meeting URL
                </label>
                <input
                  id="meetingUrl"
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={editData.meetingUrl}
                  onChange={(e) => setEditData({ ...editData, meetingUrl: e.target.value })}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManagement;