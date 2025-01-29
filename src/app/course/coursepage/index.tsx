import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaPlayCircle, FaBookmark, FaPlus } from "react-icons/fa";
import Image from "next/image";
import Videoplayer from "./../../Components/videoplayer/vid";
import { useAppSelector } from "../../../../lib/hooks";

const CoursePages: React.FC = () => {
  const { courseid, ref } = useParams();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState({}); // Initialize as an object
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null); // Track expanded day
  const { name, refid, loggedIn } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [videoList ,setvideoList]= useState([]);
  const [formData, setFormData] = useState({
    day:0,
    title: "",
    videoFile: null,
    description: "",
  });
  const [coursedet, setcoursedet] = useState({}); 
  const router = useRouter();

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/playlist?courseId=${courseid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const resultdata = await response.json();

      // Check if the response has the playlist structure as expected
      const playlistData = resultdata?.data[0]?.playlist || {};
      setcoursedet(resultdata?.data[0] || {})
    
      setPlaylist(playlistData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, [courseid]);
  const handleVideoSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVideoUrl = e.target.value;
    setFormData((prev) => ({
      ...prev,
      videoFile: selectedVideoUrl,
    }));
  };
  console.log(coursedet)
  async function fetchAllVideos() {
    try {
      const response = await fetch('/api/video');  // Call the API endpoint
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error fetching videos: ${response.statusText}`);
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Log the retrieved videos
      if (data.type === 'S' && data.data) {
        console.log('Videos retrieved:', data.data);
        setvideoList( data.data)
        // Here, you can use the data (e.g., display video file URLs, filenames, etc.)
        data.data.forEach(video => {
          console.log(`Filename: ${video.filename}, URL: ${video.fileUrl}`);
        });
      } else {
        console.log('No videos found or failed to retrieve');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  useEffect(() => {
    fetchCourses();
    fetchAllVideos()
  }, [fetchCourses]);

  const handleVideoSelection = (id: string) => {
    setSelectedVideoId((prevId) => (prevId === id ? null : id));
  };

  const handleDayToggle = (day: number) => {
    // Toggle the expanded day
    setExpandedDay((prevDay) => (prevDay === day ? null : day));
  };

  // Convert the playlist object into an array and group by day
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
  const groupedLessons = Object.keys(playlist).map((dayStr) => {
    const day = parseInt(dayStr, 10);
    return {
      day,
      lessons: playlist[dayStr],
    };
  });
  const handleVideoLession=(url)=>{
    setVideoUrl(`/api/getpic?file=${url.split('/')[2]}`)
    setIsPreviewOpen(true)
  }
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
      <header className="bg-blue-900 text-white p-6 flex items-center space-x-4">
        <FaArrowLeft className="cursor-pointer" onClick={() => router.push("/dashboard")} />
        <h1 className="text-xl font-bold">{coursedet?.title || "Course Title"}</h1>
      </header>

      <div className="relative">
      <Image
  src={coursedet?.photo ? `/api/getpic?file=${coursedet.photo.split('/')[2]}` : "/uploads/sample-image.jpg"}
  alt="Course Image"
  width={1200}
  height={800}
  className="w-full h-64 object-cover"
/>
      </div>
      <div className="mb-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center"
            onClick={() => setIsModalOpen(true)} // Close all days when clicked
          >
            <FaPlus className="mr-2" />
            Add New Video
          </button>
          <button
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            onClick={() => {
              const shareableLink = `${window.location.origin}/course/${courseid}/${refid}`;
              const shareData = {
                title: `Check out this course: ${playlist[1]?.course?.title || "Amazing Course"}`,
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

      <main className="p-6 space-y-8">
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800">Lessons</h3>

          {/* Loop through and display lessons grouped by day */}
          <div className="mt-4 space-y-4">
            {groupedLessons.map(({ day, lessons }) => (
              <div key={day}>
                <div
                  className="cursor-pointer text-lg font-semibold text-blue-600"
                  onClick={() => handleDayToggle(day)}
                >
                  Day {day}
                </div>
                {/* Render lessons of the day */}
                {expandedDay === day && (
                  <div className="ml-4">
                    {lessons.map((lesson) => (
                      <div key={lesson._id} className="p-4 bg-gray-50 rounded-md shadow-sm">
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
                    ))}
                  </div>
                )}
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
       <Videoplayer url={`/api/getpic?file=${formData.videoFile.split('/')[2]}`} />
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
          <select
  name="selectedVideo"
  value={formData.videoFile || ""} // Use an empty string if value is null or undefined
  onChange={handleVideoSelectChange}
  className="w-full p-2 border rounded mt-2"
  required
>
  <option value="">Select a Video</option>
  {videoList.map((video) => (
    <option key={video.fileUrl} value={video.fileUrl}>
      {video.filename}
    </option>
  ))}
</select>
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
