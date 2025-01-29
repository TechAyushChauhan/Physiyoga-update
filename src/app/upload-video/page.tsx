"use client"; 
import { useState } from 'react';

const UploadVideoPage = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setMessage('');
    } else {
      setMessage('Please select a valid video file.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      setMessage('No video file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    setUploading(true);
    setMessage('');

    try {
      const res = await fetch('/api/video-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.type === 'S') {
        setMessage(`Video uploaded successfully! You can view it at: ${data.data.fileUrl}`);
      } else {
        setMessage('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage('Error uploading video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Upload Video</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Select Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
        </div>

        {videoFile && (
          <div className="mb-4">
            <p className="text-gray-700">Selected file: {videoFile.name}</p>
          </div>
        )}

        {message && (
          <div className={`mb-4 p-2 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {message}
          </div>
        )}

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
