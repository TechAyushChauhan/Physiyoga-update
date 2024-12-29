"use client";


import React, { useEffect, useState } from "react";

import CoursePages from "../../coursepage";

const CoursePage: React.FC = () => {


  return (
    < CoursePages/>
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-blue-900 text-white p-6 flex items-center space-x-4">
//         <FaArrowLeft className="cursor-pointer" onClick={() => router.push("/dashboard")} />
//         <h1 className="text-xl font-bold">{coursedata?.title || ''}</h1>
//       </header>

//       {/* Hero Section */}
//       <div className="relative">
//       <Image
//     src={coursedata.photo? `/api/getpic?file=${coursedata.photo.split('/')[2]}` :'/uploads/1734531615843-939392202.jpg'}
//     alt={coursedata?.title || ''}
//     width={1200}
//     height={800}
//     className="w-full h-64 object-cover"
//   />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold">{coursedata?.title || ''}</h2>
//             <p className="mt-2">{coursedata.description || ''}</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="p-6 space-y-8">
//         {/* Progress Section */}
//         <section className="bg-white shadow-md rounded-lg p-6">
//           <h3 className="text-lg font-bold text-gray-800">Your Progress</h3>
//           <progress className="w-full mt-4" max="100" value={courseDetails.progress}></progress>
//           <p className="mt-2 text-gray-600">Progress: {courseDetails.progress}%</p>
//         </section>
//         <div className="mb-6">
// <button
//   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center"
//   onClick={()=> setIsModalOpen(true)}
// >
//   <FaPlus className="mr-2" />
//   Add New video
// </button>
// </div>
//         {/* Lessons Section */}
//         <section className="bg-white shadow-md rounded-lg p-6">
//           <h3 className="text-lg font-bold text-gray-800">Lessons</h3>
//           <div className="mt-4 space-y-4">
//             {playlist.map((lesson) => (
//               <div
//                 key={lesson._id}
//                 onClick={()=>{handleVideoLession(lesson.videoUrl)}}
//                 className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-md shadow-sm"
//               >
//                 <div>
//                   <h4 className="text-gray-800 font-semibold">{lesson.title}</h4>
//                   <p className="text-gray-600 text-sm">Duration: {lesson.duration}</p>
//                 </div>
//                 <FaPlayCircle className="text-blue-600 text-2xl cursor-pointer" />
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Actions Section */}
//         <section className="flex justify-between space-x-4">
//           <button
//             className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             onClick={() => alert("Course bookmarked!")}
//           >
//             <FaBookmark className="inline-block mr-2" />
//             Bookmark Course
//           </button>
//           <button
//             className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
//             onClick={() => alert("Resume course!")}
//           >
//             <FaPlayCircle className="inline-block mr-2" />
//             Resume Course
//           </button>
//         </section>
//         {isPreviewOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-1000">
//     <div className="bg-white rounded-lg shadow-lg p-4 w-4/5 h-4/5 relative">
//       <button
//         className="absolute top-4 right-4 text-red-500 font-bold border"
//         onClick={() =>{setIsPreviewOpen(false);}}
//       >
//         Close
//       </button>
//       <h3 className="text-lg font-bold mb-4">Preview Video</h3>
//       <Videoplayer url={videoUrl || ""} />
//     </div>
//   </div>
// )}

// {!isPreviewOpen && isModalOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg shadow-lg p-6 overflow">
//       <h2 className="text-lg font-bold mb-4">Add New Video</h2>
//       <form onSubmit={handleAddVideo}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Video Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded mt-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Video File</label>
//           <input
//             type="file"
//             name="videoFile"
//             onChange={handleFileChange}
//             className="w-full p-2 border rounded mt-2"
           
//           />
//         </div>
//           {formData.videoFile ? (
//     <p className="text-green-600 mt-2">File Selected: {formData.videoFile.name}</p>
//   ) : (
//     <p className="text-red-600 mt-2">No file selected</p>
//   )}
//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded mt-2"
//             required
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             onClick={() => setIsModalOpen(false)}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() =>{setIsPreviewOpen(true)}}
//           >
//             Test Video
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}

      
//       </main>
//     </div>
  );
};

export default CoursePage;

