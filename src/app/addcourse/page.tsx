"use client";

import React, { useState } from "react";

const AddCourse: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields including price
    if (!title || !description || !photo || !price) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Validate price format
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      setErrorMessage("Please enter a valid price.");
      return;
    }

    setErrorMessage("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("photo", photo);

    try {
      const response = await fetch('/api/addcourse', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Something went wrong!');
      } else {
        const result = await response.json();
        console.log('Course added successfully:', result);
        // Optional: Reset form or show success message
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while uploading the data.');
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setPhoto(null);
    // Reset file input
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Add New Course</h2>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-blue-700 mb-2">
              Course Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full text-gray-700 px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-blue-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-3 text-gray-700 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course description"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-blue-700 mb-2">
              Course Price (₹)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">₹</span>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full text-gray-700 px-4 py-3 pl-8 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-blue-700 mb-2">
              Course Photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full text-blue-700 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;