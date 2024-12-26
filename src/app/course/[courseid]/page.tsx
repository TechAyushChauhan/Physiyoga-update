"use client";

// import { useParams, useRouter } from 'next/navigation';
// import router from 'next/router';
// import { useEffect, useState } from 'react';

// const CourseDetailPage = () => {

//   const { courseid } = useParams();
//   const [playlist, setPlaylist] = useState([]);
   
   

//   // You can now access query parameters like `query.id`
//   console.log(courseid);
  
//   const [isExpanded, setIsExpanded] = useState(false);  // State for handling section expansion
//   const [videoTitle, setVideoTitle] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [videoFile, setVideoFile] = useState<File | null>(null); // For video file upload
//   const [addPosition, setAddPosition] = useState('top'); // State for the position to add the new video

//   const handleButtonClick = () => {
//     router.push('/courses');
//   };

//   const handleAddButtonClick = () => {
//     setIsExpanded(!isExpanded);  // Toggle the expanded section
//   };

//   const handleDeleteVideo = (id: string) => {
//     setPlaylist(playlist.filter((item) => item.id !== id));  // Delete the video by ID
//   };

//   const handleAddVideo = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!videoTitle || !videoFile) {
//       return;  // Do not add video if title or video file is missing
//     }
    

//     // Create FormData to send file along with other data
//     const formData = new FormData();
//       // @ts-expect-error: 'keepExtensions' property is not typed in the formidable package 
//     formData.append('courseId', courseid);
//     formData.append('title', videoTitle);
//     formData.append('video', videoFile);
//     formData.append('description', addPosition);

//     try {
//       // Send the FormData to the backend API
//       const res = await fetch('/api/playlist', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Add the new video to playlist after uploading
     

//         fetchCourses()

//         // Reset form state
//         setVideoTitle('');
//         setVideoFile(null);
//         setIsExpanded(false);
//       } else {
//         console.error('Error uploading video:', data.message);
//       }
//     } catch (error) {
//       console.error('Failed to upload video:', error);
//     }
//   };
//   const deleteVideo = async ( videoUrl: string) => {
   
//     const response = await fetch(`/api/playlist?courseId=${courseid}&playlistItemId=${videoUrl}`, {
//       method: 'DELETE',
//     });
  
//     const data = await response.json();
//     if (response.ok) {
//       console.log('Video and playlist item deleted successfully:', data);
//     } else {
//       console.error('Error deleting video:', data.message);
//     }
//   };
//   const fetchCourses = async () => {
   
//     try {
//       const response = await fetch(`/api/playlist?courseId=${courseid}`); // The GET API endpoint
//       if (!response.ok) {
//         throw new Error("Failed to fetch courses");
//       }
//       const resultdata = await response.json();
//       console.log(resultdata.data); 
//       setPlaylist((resultdata.data[0].playlist)? resultdata.data[0].playlist: [])// Assuming data is returned as { type: 'S', data: courses }
//     } catch (error) {
//       console.error('Error uploading video:', error);
//     }}
//   useEffect(()=>{
//     fetchCourses()
//   },[])

//   return (
//     <div className="p-4">
//       {/* Top Section */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Course Details</h1>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
//           onClick={handleButtonClick}
//         >
//           <i className="pi pi-arrow-left"></i>
//           <span>Back to Courses</span>
//         </button>
//       </div>

//       {/* Add Button Section */}
//       <div className="mt-4">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-md"
//           onClick={handleAddButtonClick}
//         >
//           {isExpanded ? 'Hide Add Section' : 'Add New Item'}
//         </button>
//       </div>

   
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold">Playlist</h2>
//         <ul className="space-y-2">
//           {playlist.map((item) => (
//             <li
//               key={item._id}
//               className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-blue-100 flex justify-between items-center"
//             >
//               <span onClick={() => window.open(item.url, '_blank')}>{item.title}</span>
//               <button
//                 onClick={() => deleteVideo(item._id)}
//                 className="text-red-500 hover:text-red-700 ml-4"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Expandable Add Section */}
//       {isExpanded && (
//         <div className="mt-4 p-4 border border-gray-300 rounded-md">
//           <h3 className="text-lg font-semibold mb-2">Add New Video</h3>
//           <form onSubmit={handleAddVideo}>
//             <div className="mb-4">
//               <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700">Video Title</label>
//               <input
//                 id="videoTitle"
//                 type="text"
//                 className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                 value={videoTitle}
//                 onChange={(e) => setVideoTitle(e.target.value)}
//                 placeholder="Enter video title"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">Video File</label>
//               <input
//                 id="videoFile"
//                 type="file"
//                 className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                 onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
//                 accept="video/*"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="addPosition" className="block text-sm font-medium text-gray-700">Add Position</label>
//               <select
//                 id="addPosition"
//                 className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                 value={addPosition}
//                 onChange={(e) => setAddPosition(e.target.value)}
//               >
//                 <option value="top">Top</option>
//                 <option value="middle">Middle</option>
//                 <option value="bottom">Bottom</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md"
//             >
//               Add Video
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseDetailPage;


import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import Videoplayer from "./../../Components/videoplayer/vid";





// Dynamic imports for icons
const FaArrowLeft = dynamic(() => import("react-icons/fa").then((mod) => mod.FaArrowLeft), { ssr: false });
const FaPlayCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaPlayCircle), { ssr: false });
const FaBookmark = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBookmark), { ssr: false });

const CoursePage: React.FC = () => {
  // const { courseId } = useParams();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { courseid } = useParams();
  const [playlist, setPlaylist] = useState([]);
   
   

  // You can now access query parameters like `query.id`
  console.log(courseid);
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coursedata, setcoursedata] = useState({});
    const [formData, setFormData] = useState({
      title: "",
      videoFile: null,
      description: "",
    });
 
  const router = useRouter();


 
  // Mock course details for "Yoga for Beginners"
  const courseDetails = {
    name: "Yoga for Beginners",
    description:
      "A beginner-friendly yoga course that introduces you to foundational yoga poses, breathing techniques, and mindfulness practices. Perfect for anyone starting their yoga journey.",
    lessons: [
      { id: 1, title: "Introduction to Yoga", duration: "10 mins" },
      { id: 2, title: "Basic Yoga Poses", duration: "15 mins" },
      { id: 3, title: "Yoga for Relaxation", duration: "20 mins" },
    ],
    progress: 80,
    imageUrl: "https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp", // Add an image file to your public/images folder
  };



    const fetchCourses = async () => {
   
    try {
      const response = await fetch(`/api/playlist?courseId=${courseid}`); // The GET API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const resultdata = await response.json();
      console.log(resultdata.data[0]); 
      setcoursedata(resultdata.data[0])
      setPlaylist((resultdata.data[0].playlist)? resultdata.data[0].playlist: [])// Assuming data is returned as { type: 'S', data: courses }
    } catch (error) {
      console.error('Error uploading video:', error);
    }}
    
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.videoFile) {
      return;  // Do not add video if title or video file is missing
    }
    

    // Create FormData to send file along with other data
    const setformData = new FormData();
      // @ts-expect-error: 'keepExtensions' property is not typed in the formidable package 
      setformData.append('courseId', courseid);
      setformData.append('title', formData.title);
    setformData.append('video',formData.videoFile);
    setformData.append('description', formData.description);

    try {
      // Send the FormData to the backend API
      const res = await fetch('/api/playlist', {
        method: 'POST',
        body: setformData,
      });

      const data = await res.json();

      if (res.ok) {
        // Add the new video to playlist after uploading
     
        setFormData({ title: "", videoFile: null, description: "" });
        fetchCourses()

        // Reset form state
      
      } else {
        console.error('Error uploading video:', data.message);
      }
    } catch (error) {
      console.error('Failed to upload video:', error);
    }
  };
    const handleVideoLession=(url)=>{
      setVideoUrl(`/api/getpic?file=${url.split('/')[2]}`)
      setIsPreviewOpen(true)
    }
  
  useEffect(()=>{
    fetchCourses()
  },[])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFormData((prev) => ({
        ...prev,
        videoFile: e.target.files[0],
      }));
      const blobUrl = URL.createObjectURL(e.target.files[0]); // Create a Blob URL for the file
      setVideoUrl(blobUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white p-6 flex items-center space-x-4">
        <FaArrowLeft className="cursor-pointer" onClick={() => router.push("/dashboard")} />
        <h1 className="text-xl font-bold">{coursedata?.title || ''}</h1>
      </header>

      {/* Hero Section */}
      <div className="relative">
      <Image
    src={coursedata.photo? `/api/getpic?file=${coursedata.photo.split('/')[2]}` :'/uploads/1734531615843-939392202.jpg'}
    alt={coursedata?.title || ''}
    width={1200}
    height={800}
    className="w-full h-64 object-cover"
  />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{coursedata?.title || ''}</h2>
            <p className="mt-2">{coursedata.description || ''}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Progress Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800">Your Progress</h3>
          <progress className="w-full mt-4" max="100" value={courseDetails.progress}></progress>
          <p className="mt-2 text-gray-600">Progress: {courseDetails.progress}%</p>
        </section>
        <div className="mb-6">
<button
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center"
  onClick={()=> setIsModalOpen(true)}
>
  <FaPlus className="mr-2" />
  Add New video
</button>
</div>
        {/* Lessons Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800">Lessons</h3>
          <div className="mt-4 space-y-4">
            {playlist.map((lesson) => (
              <div
                key={lesson._id}
                onClick={()=>{handleVideoLession(lesson.videoUrl)}}
                className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-md shadow-sm"
              >
                <div>
                  <h4 className="text-gray-800 font-semibold">{lesson.title}</h4>
                  <p className="text-gray-600 text-sm">Duration: {lesson.duration}</p>
                </div>
                <FaPlayCircle className="text-blue-600 text-2xl cursor-pointer" />
              </div>
            ))}
          </div>
        </section>

        {/* Actions Section */}
        <section className="flex justify-between space-x-4">
          <button
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            onClick={() => alert("Course bookmarked!")}
          >
            <FaBookmark className="inline-block mr-2" />
            Bookmark Course
          </button>
          <button
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            onClick={() => alert("Resume course!")}
          >
            <FaPlayCircle className="inline-block mr-2" />
            Resume Course
          </button>
        </section>
        {isPreviewOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-1000">
    <div className="bg-white rounded-lg shadow-lg p-4 w-4/5 h-4/5 relative">
      <button
        className="absolute top-4 right-4 text-red-500 font-bold border"
        onClick={() =>{setIsPreviewOpen(false);}}
      >
        Close
      </button>
      <h3 className="text-lg font-bold mb-4">Preview Video</h3>
      <Videoplayer url={videoUrl || ""} />
    </div>
  </div>
)}

{!isPreviewOpen && isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 overflow">
      <h2 className="text-lg font-bold mb-4">Add New Video</h2>
      <form onSubmit={handleAddVideo}>
        <div className="mb-4">
          <label className="block text-gray-700">Video Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Video File</label>
          <input
            type="file"
            name="videoFile"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mt-2"
           
          />
        </div>
          {formData.videoFile ? (
    <p className="text-green-600 mt-2">File Selected: {formData.videoFile.name}</p>
  ) : (
    <p className="text-red-600 mt-2">No file selected</p>
  )}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mt-2"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() =>{setIsPreviewOpen(true)}}
          >
            Test Video
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      
      </main>
    </div>
  );
};

export default CoursePage;

