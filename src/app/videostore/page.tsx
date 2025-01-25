
"use client"

import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  Edit, 
  Video, 
  Clock, 
  FileText, 
  Save, 
  X 
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const VideoManagementPage = () => {
  const [videos, setVideos] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    duration: '',
    videoFile: null
  });

  // Load videos from localStorage on initial render
  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem('medical-videos') || '[]');
    setVideos(savedVideos);
  }, []);

  // Save videos to localStorage whenever videos change
  useEffect(() => {
    localStorage.setItem('medical-videos', JSON.stringify(videos));
  }, [videos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the file
      const videoUrl = URL.createObjectURL(file);
      
      setNewVideo(prev => ({
        ...prev,
        videoFile: file,
        videoUrl: videoUrl
      }));

      // Attempt to get video duration
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;
      videoElement.onloadedmetadata = () => {
        const minutes = Math.floor(videoElement.duration / 60);
        const seconds = Math.floor(videoElement.duration % 60);
        setNewVideo(prev => ({
          ...prev,
          duration: `${minutes}:${seconds.toString().padStart(2, '0')}`
        }));
      };
    }
  };

  const addVideo = () => {
    if (!newVideo.title || !newVideo.videoFile) {
      alert('Title and Video File are required');
      return;
    }

    const videoToAdd = {
      ...newVideo,
      id: Date.now().toString(),
      uploadDate: new Date().toLocaleDateString()
    };

    setVideos(prev => [videoToAdd, ...prev]);
    
    // Reset form
    setNewVideo({
      title: '',
      description: '',
      duration: '',
      videoFile: null,
      videoUrl: ''
    });
    setIsAddModalOpen(false);
  };

  const deleteVideo = (id) => {
    setVideos(prev => prev.filter(video => video.id !== id));
  };

  const startEditVideo = (video) => {
    setEditingVideo(video);
    setNewVideo({
      title: video.title,
      description: video.description,
      duration: video.duration,
      videoFile: null,
      videoUrl: video.videoUrl
    });
    setIsAddModalOpen(true);
  };

  const updateVideo = () => {
    if (!newVideo.title) {
      alert('Title is required');
      return;
    }

    setVideos(prev => prev.map(video => 
      video.id === editingVideo.id 
        ? { 
            ...video, 
            title: newVideo.title, 
            description: newVideo.description,
            duration: newVideo.duration,
            ...(newVideo.videoFile ? { 
              videoFile: newVideo.videoFile,
              videoUrl: newVideo.videoUrl 
            } : {})
          } 
        : video
    ));

    // Reset form and editing state
    setNewVideo({
      title: '',
      description: '',
      duration: '',
      videoFile: null,
      videoUrl: ''
    });
    setEditingVideo(null);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
            Video Library
          </h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl flex items-center hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <PlusCircle className="mr-2" /> Add New Video
          </button>
        </div>

        {/* Add/Edit Video Modal */}
        <AnimatePresence>
          {isAddModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                  </h2>
                  <button 
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingVideo(null);
                      setNewVideo({
                        title: '',
                        description: '',
                        duration: '',
                        videoFile: null,
                        videoUrl: ''
                      });
                    }}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    value={newVideo.title}
                    onChange={handleInputChange}
                    placeholder="Video Title"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  />
                  <textarea
                    name="description"
                    value={newVideo.description}
                    onChange={handleInputChange}
                    placeholder="Video Description"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  />
                  {/* File Input */}
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="videoFileInput"
                    />
                    <label 
                      htmlFor="videoFileInput"
                      className="cursor-pointer flex items-center justify-center text-gray-600 hover:text-teal-600 transition"
                    >
                      <Video className="mr-2" />
                      {newVideo.videoFile 
                        ? `Selected: ${newVideo.videoFile.name}` 
                        : 'Select Video File'}
                    </label>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setEditingVideo(null);
                      }}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={editingVideo ? updateVideo : addVideo}
                      className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-lg flex items-center hover:from-teal-600 hover:to-blue-600 transition-all"
                    >
                      <Save className="mr-2" /> 
                      {editingVideo ? 'Update Video' : 'Add Video'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Listing */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <video 
                    src={video.videoUrl} 
                    className="w-full h-48 object-cover"
                    controls
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button 
                      onClick={() => startEditVideo(video)}
                      className="bg-white/80 p-2 rounded-full hover:bg-white transition shadow-md"
                    >
                      <Edit size={20} className="text-teal-600" />
                    </button>
                    <button 
                      onClick={() => deleteVideo(video.id)}
                      className="bg-white/80 p-2 rounded-full hover:bg-white transition shadow-md"
                    >
                      <Trash2 size={20} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{video.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2 italic">{video.description}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Clock className="mr-2" size={16} />
                      {video.duration}
                    </span>
                    <span className="flex items-center">
                      <FileText className="mr-2" size={16} />
                      {video.uploadDate}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <Video className="mx-auto mb-4 text-gray-300" size={64} />
            <p className="text-xl text-gray-600 font-light">
              No videos added yet. Click "Add New Video" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoManagementPage;
