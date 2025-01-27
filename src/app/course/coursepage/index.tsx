"use client";


import React, { useEffect, useState, useCallback  } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import Videoplayer from "./../../Components/videoplayer/vid";
import { useAppSelector } from "../../../../lib/hooks";
import { v4 as uuidv4 } from "uuid";




// Dynamic imports for icons
const FaArrowLeft = dynamic(() => import("react-icons/fa").then((mod) => mod.FaArrowLeft), { ssr: false });
const FaPlayCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaPlayCircle), { ssr: false });
const FaBookmark = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBookmark), { ssr: false });

const CoursePages: React.FC = () => {
  // const { courseId } = useParams();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { courseid ,ref} = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const handleVideoSelection = (id: string) => {
    setSelectedVideoId((prevId) => (prevId === id ? null : id)); // Toggle video selection
  };
  const { name,refid,loggedIn} = useAppSelector((state)=>state.user)
console.log(refid)
  // You can now access query parameters like `query.id`
  console.log(courseid,"ref--",ref);
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coursedata, setcoursedata] = useState({});
    const [formData, setFormData] = useState({
      day:0,
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



  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/playlist?courseId=${courseid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const resultdata = await response.json();
      console.log(resultdata.data[0]); 
      setcoursedata(resultdata.data[0])
      setPlaylist((resultdata.data[0].playlist)? resultdata.data[0].playlist: [])
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, [courseid]);
  
  useEffect(() => {
    fetchCourses();
    if (ref) {
      const refString = Array.isArray(ref) ? ref[0] : ref;
      localStorage.setItem('refcode', refString);
    }
  }, [fetchCourses, ref]);
    
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
    setformData.append('day', formData.day.toString()); 
    try {
      // Send the FormData to the backend API
      const res = await fetch('/api/playlist', {
        method: 'POST',
        body: setformData,
      });

      const data = await res.json();

      if (res.ok) {
        // Add the new video to playlist after uploading
     
        setFormData({ title: "", videoFile: null, description: "",day: 0 });
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
   
  // useEffect(()=>{
  //   fetchCourses()
  //   if (ref) {
  //     const refString = Array.isArray(ref) ? ref[0] : ref; // Use the first element if it's an array
  //     localStorage.setItem('refcode', refString);
  //   }
  // },[])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
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
<button
  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
  onClick={() => {
    const shareableLink = `${window.location.origin}/course/${courseid}/${refid}`;
    const shareData = {
      title: `Check out this course: ${coursedata?.title || "Amazing Course"}`,
      text: `I found this great course and thought you might like it! Use my referral link to join:`,
      url: shareableLink,
    };

    if (navigator.share) {
      // Use the Web Share API
      navigator
        .share(shareData)
        .then(() => console.log("Content shared successfully!"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback to copying the link if Web Share API is not available
      navigator.clipboard.writeText(shareableLink)
        .then(() => alert("Referral link copied to clipboard!"))
        .catch(() => alert("Failed to copy the link."));
    }
  }}
>
  Refer Friends
</button>
</div>
        {/* Lessons Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800">Lessons</h3>
          <div className="mt-4 space-y-4">
          {playlist.map((lesson, index) => {
  // Calculate the date for the Google Meet button
  const today = new Date();
  const meetDate = new Date(today);
  meetDate.setDate(today.getDate() + 2 * Math.floor(index / 2)); // 2-day gap for every 2 lessons
  const formattedDate = meetDate.toLocaleString('en-US', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    day: 'numeric',
  });

  return (
    <React.Fragment key={lesson._id}>
      <div className="p-4 bg-gray-50 rounded-md shadow-sm">
        <div
          onClick={() => handleVideoSelection(lesson._id)}
          className="flex justify-between items-center cursor-pointer hover:bg-gray-100"
        >
          <div>
            <h4 className="text-gray-800 font-semibold">{lesson.title}</h4>
            <p className="text-gray-600 text-sm">Duration: {lesson.duration}</p>
          </div>
          <FaPlayCircle className="text-blue-600 text-2xl" />
        </div>
        {selectedVideoId === lesson._id && (
          <div className="mt-4">
            <Videoplayer url={`/api/getpic?file=${lesson.videoUrl.split('/')[2]}`} />
          </div>
        )}
      </div>

      {/* Google Meet Button */}
      {index > 0 && (index + 1) % 2 === 0 && (
        <div className="mt-4 text-center">
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all duration-300"
            // onClick={() => window.open(generateGoogleMeetLink(), "_blank")}
          >
            Join Google Meet for Discussion on {formattedDate}
          </button>
        </div>
      )}
    </React.Fragment>
  );
})}

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
        <div className="mb-4">
          <label className="block text-gray-700">Day</label>
          <input
            type="number"
            name="day"
            value={formData.day}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mt-2"
            required
          /></div>
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

export default CoursePages;

