"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const VideoUploadPage: React.FC = () => {
  const router = useRouter();

  // State for form inputs
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState<File | null>(null);

  // Mock course IDs (replace with actual API data if available)
  const mockCourses = [
    { id: 1, name: "Joint Shield: Knee Edition", progress: 80, key: "yogaforbeginners" },
    { id: 2, name: "Joint Shield: Lower Back Edition", progress: 50, key: "advancedyogaposes" },
    { id: 3, name: "NeckCare Nexus", progress: 90, key: "neckCare" },
    { id: 4, name: "Scaitcare", progress: 90, key: "scaitcare" },
    { id: 5, name: "ReVive Parkinson’s: Mobility & Strength Rehab", progress: 90, key: "reviveparkinson" }
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseId || !title || !description || !duration || !video) {
      alert("Please fill in all fields and upload a video.");
      return;
    }

    // Form submission logic (e.g., API call to upload video data)
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", title);
    formData.append("description", description);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Video</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Dropdown */}
          <div>
            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a course</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 text-gray-700 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter video title"
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter video description"
              rows={4}
            ></textarea>
          </div>

          {/* Duration Input */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duration (in minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter duration"
            />
          </div>

           {/* Video File */}
           <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700">
              Video File
            </label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files ? e.target.files[0] : null)}
              className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadPage;