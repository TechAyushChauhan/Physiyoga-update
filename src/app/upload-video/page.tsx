"use client"; 
import { useState } from 'react';

const UploadVideoPage = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setMessage('');
    } else {
      setMessage('Please select a valid video file.');
    }
  };
  const addVideo = async (title, videoLink) => {
    try {
      // Sending POST request to the API
      const response = await fetch('/api/appurl', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Specify that you're sending JSON data
        },
        body: JSON.stringify({ title, videoLink }), // Data to send to the server
      });
  
      const result = await response.json(); // Parse the response as JSON
  
      if (response.ok) {
        // If the response was successful, log or alert the result
        setMessage(`Video uploaded successfully! `);
        console.log('Video added successfully:', result);
      } else {
        // If there was an error, show the error message
        console.error('Error adding video:', result.msg);
      }
    } catch (error) {
      console.error('Network or other error:', error);
    }
  };
  
  // Example usage

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ( !title || !url) {
      setMessage('Please fill in all fields and select a video file.');
      return;
    }
    addVideo(title, url);
 

    setUploading(true);
    setMessage('');

 
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Upload Video</h1>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            required
          />
        </div>

        {/* URL Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Video URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            required
          />
        </div>

        {/* Video File Input */}
        {/* <div className="mb-4">
          <label className="block text-gray-700">Select Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
        </div> */}

        {/* Displaying Selected File */}
        {videoFile && (
          <div className="mb-4">
            <p className="text-gray-700">Selected file: {videoFile.name}</p>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className={`mb-4 p-2 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadVideoPage;
