"use client";


import React, { useState } from "react";
import { Calendar, Clock, Copy, Video, ExternalLink } from "lucide-react";

const MeetScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [meetLink, setMeetLink] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [isLinkGenerated, setIsLinkGenerated] = useState<boolean>(false);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  // Generate time slots from 9 AM to 6 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 18; i++) {
      slots.push(`${i.toString().padStart(2, '0')}:00`);
      slots.push(`${i.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const generateMeetingCode = () => {
    // Generate a three-part code that follows Google Meet's format
    // Using both letters and numbers
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const generatePart = (length: number) => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
  
    // Google Meet format: xxx-yyyy-zzz (where x, y, z can be letters or numbers)
    return `${generatePart(3)}-${generatePart(4)}-${generatePart(3)}`;
  };

  const handleGenerateLink = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }

    const meetingCode = generateMeetingCode();
    const newMeetLink = `https://meet.google.com/${meetingCode}`;
    
    setMeetLink(newMeetLink);
    setIsLinkGenerated(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleJoinMeeting = () => {
    window.open(meetLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 p-6 text-white text-center">
          <Video className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Schedule Google Meet</h1>
          <p className="text-blue-100">Select date and time to generate your meeting link</p>
        </div>

        {/* Date and Time Selection */}
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select time</option>
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Generate Link Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerateLink}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Generate Meet Link
            </button>
          </div>

          {/* Meeting Link Section */}
          {isLinkGenerated && (
            <div className="mt-8 space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Video className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Your Google Meet Link</p>
                      <p className="text-sm text-blue-600">{meetLink}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-lg text-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copySuccess ? "Copied!" : "Copy Link"}
                    </button>
                    <button
                      onClick={handleJoinMeeting}
                      className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Join Meeting
                    </button>
                  </div>
                </div>
              </div>

              {/* Meeting Details */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Meeting Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📅 Date: {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>🕒 Time: {selectedTime}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetScheduler;