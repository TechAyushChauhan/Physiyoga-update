"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const VideoUploadPage: React.FC = () => {
  const router = useRouter();

  // State for form inputs
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState<File | null>(null);

  // Mock course IDs (replace with actual API data if available)
  const mockCourses = [
    { id: 1, name: "Joint Shield: Knee Edition", progress: 80, key: "yogaforbeginners" },
    { id: 2, name: "Joint Shield: Lower Back Edition", progress: 50, key: "advancedyogaposes" },
    { id: 3, name: "NeckCare Nexus", progress: 90, key: "neckCare" },
    { id: 4, name: "Scaitcare", progress: 90, key: "scaitcare" },
    { id: 5, name: "ReVive Parkinson's: Mobility & Strength Rehab", progress: 90, key: "reviveparkinson" }
  ];

  // Generate days 1-20 for dropdown
  const days = Array.from({ length: 20 }, (_, i) => i + 1);

  // Convert seconds to MM:SS format
  const formatDuration = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    // Pad with leading zeros
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedVideo = e.target.files ? e.target.files[0] : null;
    setVideo(uploadedVideo);

    // Calculate video duration
    if (uploadedVideo) {
      const videoURL = URL.createObjectURL(uploadedVideo);
      const videoElement = document.createElement('video');
      videoElement.src = videoURL;
      
      videoElement.onloadedmetadata = () => {
        // Convert duration to MM:SS format
        const durationInSeconds = Math.round(videoElement.duration);
        setDuration(formatDuration(durationInSeconds));
      };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseId || !title || !description || !day || !duration || !video) {
      alert("Please fill in all fields and upload a video.");
      return;
    }

    // Form submission logic (e.g., API call to upload video data)
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("day", day);
    formData.append("duration", duration);
    formData.append("video", video);

    // Example API call
    fetch("/api/upload-video", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Video uploaded successfully!");
          router.push("/dashboard");
        } else {
          alert("Failed to upload video.");
        }
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
        alert("An error occurred while uploading the video.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Upload Video</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Course Dropdown */}
          <div>
            <label htmlFor="courseId" className="block text-sm font-medium text-blue-700 mb-2">
              Select Course
            </label>
            <select
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a course</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Day Dropdown */}
          <div>
            <label htmlFor="day" className="block text-sm font-medium text-blue-700 mb-2">
              Select Day
            </label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a day</option>
              {days.map((dayNumber) => (
                <option key={dayNumber} value={dayNumber}>
                  Day {dayNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-blue-700 mb-2">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-blue-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video description"
              rows={4}
              required
            ></textarea>
          </div>

          {/* Duration Input (Automatic) */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-blue-700 mb-2">
              Duration (MM:SS)
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              readOnly
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl text-gray-700 bg-blue-50"
              placeholder="Duration will be calculated automatically"
            />
          </div>

          {/* Video File */}
          <div>
            <label htmlFor="video" className="block text-sm font-medium text-blue-700 mb-2">
              Video File
            </label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="w-full text-sm text-blue-700 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadPage;