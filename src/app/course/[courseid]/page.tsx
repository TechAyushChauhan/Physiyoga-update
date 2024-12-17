"use client";

import { useParams, useRouter } from 'next/navigation';
import router from 'next/router';
import { useEffect, useState } from 'react';

const CourseDetailPage = () => {

  const { courseid } = useParams();
  const [playlist, setPlaylist] = useState([]);
   
   

  // You can now access query parameters like `query.id`
  console.log(courseid);
  
  const [isExpanded, setIsExpanded] = useState(false);  // State for handling section expansion
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null); // For video file upload
  const [addPosition, setAddPosition] = useState('top'); // State for the position to add the new video

  const handleButtonClick = () => {
    router.push('/courses');
  };

  const handleAddButtonClick = () => {
    setIsExpanded(!isExpanded);  // Toggle the expanded section
  };

  const handleDeleteVideo = (id: string) => {
    setPlaylist(playlist.filter((item) => item.id !== id));  // Delete the video by ID
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoTitle || !videoFile) {
      return;  // Do not add video if title or video file is missing
    }
    

    // Create FormData to send file along with other data
    const formData = new FormData();
      // @ts-expect-error: 'keepExtensions' property is not typed in the formidable package 
    formData.append('courseId', courseid);
    formData.append('title', videoTitle);
    formData.append('video', videoFile);
    formData.append('description', addPosition);

    try {
      // Send the FormData to the backend API
      const res = await fetch('/api/playlist', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        // Add the new video to playlist after uploading
     

        fetchCourses()

        // Reset form state
        setVideoTitle('');
        setVideoFile(null);
        setIsExpanded(false);
      } else {
        console.error('Error uploading video:', data.message);
      }
    } catch (error) {
      console.error('Failed to upload video:', error);
    }
  };
  const deleteVideo = async ( videoUrl: string) => {
   
    const response = await fetch(`/api/playlist?courseId=${courseid}&playlistItemId=${videoUrl}`, {
      method: 'DELETE',
    });
  
    const data = await response.json();
    if (response.ok) {
      console.log('Video and playlist item deleted successfully:', data);
    } else {
      console.error('Error deleting video:', data.message);
    }
  };
  const fetchCourses = async () => {
   
    try {
      const response = await fetch(`/api/playlist?courseId=${courseid}`); // The GET API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const resultdata = await response.json();
      console.log(resultdata.data); 
      setPlaylist((resultdata.data[0].playlist)? resultdata.data[0].playlist: [])// Assuming data is returned as { type: 'S', data: courses }
    } catch (error) {
      console.error('Error uploading video:', error);
    }}
  useEffect(()=>{
    fetchCourses()
  },[])

  return (
    <div className="p-4">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Course Details</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          onClick={handleButtonClick}
        >
          <i className="pi pi-arrow-left"></i>
          <span>Back to Courses</span>
        </button>
      </div>

      {/* Add Button Section */}
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddButtonClick}
        >
          {isExpanded ? 'Hide Add Section' : 'Add New Item'}
        </button>
      </div>

   
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Playlist</h2>
        <ul className="space-y-2">
          {playlist.map((item) => (
            <li
              key={item._id}
              className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-blue-100 flex justify-between items-center"
            >
              <span onClick={() => window.open(item.url, '_blank')}>{item.title}</span>
              <button
                onClick={() => deleteVideo(item._id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Add Section */}
      {isExpanded && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Add New Video</h3>
          <form onSubmit={handleAddVideo}>
            <div className="mb-4">
              <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700">Video Title</label>
              <input
                id="videoTitle"
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter video title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">Video File</label>
              <input
                id="videoFile"
                type="file"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                accept="video/*"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="addPosition" className="block text-sm font-medium text-gray-700">Add Position</label>
              <select
                id="addPosition"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                value={addPosition}
                onChange={(e) => setAddPosition(e.target.value)}
              >
                <option value="top">Top</option>
                <option value="middle">Middle</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Video
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
