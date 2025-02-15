import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaPlayCircle, FaBookmark, FaPlus, FaShare, FaClock, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import Videoplayer from "./../../Components/videoplayer/vid";
import { useAppSelector } from "../../../../lib/hooks";
import { setUser } from '../../../../store/slices/userSlice';
const CoursePages: React.FC = () => {

  const data = useAppSelector((state) => state.user);
  
  const { courseid, ref } = useParams();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState({}); // Initialize as an object
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null); // Track expanded day
  const { name, refid, loggedIn,id } = useAppSelector((state) => state.user);
  const userid= useAppSelector((state) => state.user);
  console.log(userid.id,"id outside")
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading } = useAppSelector((state) => state.loader);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [videoList, setvideoList] = useState([]);
  // const [userid, setuserid] = useState([]);
  const [formData, setFormData] = useState({
    day: 0,
    title: "",
    videoFile: null,
    description: "",
  });
  const [coursedet, setcoursedet] = useState({});
  const router = useRouter();

  const fetchCourses = useCallback(async (ids) => {
    try {
      console.log(userid.id,"id")
      let data= `courseId=${courseid}`
      if (ids!=null) {
        console.log(ids,"id")
        data=data+`&watchedBy=${ids}`
      }
      
      const response = await fetch(`/api/playlist?${data}`);
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
  useEffect(() => {
   
    if (userid.id!=null) {
   
      // Make the API call or proceed with logic'
      setTimeout(() => {
        fetchCourses(userid.id);
      }, 3000);
     
    } else {
      // Handle the case where `id` is null (e.g., show a loading spinner or redirect)
    }
  }, [userid.id]);
  
  const markAsWatched = async (playlistItemId:string,userId:number) => {
    try {
     console.log(playlistItemId,'watchedid')
      const response = await fetch('/api/watched', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId:courseid,
          playlistItemId:playlistItemId,
          userId:userId,
        }),
      });

      if (response.ok) {
        console.log(await response.json())
        const updatedPlaylist = { ...playlist };

        fetchCourses(userId)
        console.log(updatedPlaylist)
        console.log(playlist)
        // setWatched(true);
      } else {
        const data = await response.json();
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error marking as watched:', error);
    }
  };
  async function fetchAllVideos() {
    try {
      const response = await fetch('/api/appurl');  // Call the API endpocoint

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error fetching videos: ${response.statusText}`);
      }

      // Parse the response as JSON
      const data = await response.json();
console.log(data)
      // Log the retrieved videos
      if (data.type === 'S' && data.videos) {
        console.log('Videos retrieved:', data.videos);
        setvideoList(data.videos)
        // Here, you can use the data (e.g., display video file URLs, filenames, etc.)
        data.videos.forEach(video => {
          console.log(`Filename: ${video.title}, URL: ${video.videoLink}`);
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
 
  const handleLongVideo = (duration: any) => {
    console.log(duration)
    console.log(data.id)
     markAsWatched(duration._id,data.id)
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
    setformData.append('video', formData.videoFile);
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

        setFormData({ title: "", videoFile: null, description: "", day: 0 });
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
  const handleVideoLession = (url) => {
    setVideoUrl(`/api/getpic?file=${url.split('/')[2]}`)
    setIsPreviewOpen(true)
  }
  console.log(groupedLessons)
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
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with Progress */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 flex items-center space-x-6">
            <button 
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{coursedet?.title || "Course Title"}</h1>
              <p className="text-blue-200 mt-1">Your progress: 60% complete</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-blue-900/30">
            <div className="h-full bg-blue-400 w-3/5 transition-all duration-500"></div>
          </div>
        </div>
      </header>

      {/* Hero Section with Course Details */}
      <div className="relative">
        <div className="relative h-80">
          <Image
            src={coursedet?.photo ? `/api/getpic?file=${coursedet.photo.split('/')[2]}` : "/uploads/sample-image.jpg"}
            alt="Course Image"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        {/* Course Quick Stats */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm opacity-75">Total Lessons</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Total Duration</p>
                  <p className="text-2xl font-bold">6h 30m</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Completed</p>
                  <p className="text-2xl font-bold">14</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">Certificate</p>
                  <p className="text-2xl font-bold">Yes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            className="flex items-center justify-center px-6 py-4 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm border border-gray-200 group"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="text-emerald-500 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Add New Video</span>
          </button>
          <button
            className="flex items-center justify-center px-6 py-4 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm border border-gray-200 group"
            onClick={() => alert("Course bookmarked!")}
          >
            <FaBookmark className="text-blue-500 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Save Course</span>
          </button>
          <button
            className="flex items-center justify-center px-6 py-4 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm border border-gray-200 group"
            onClick={() => {
              const shareableLink = `${window.location.origin}/course/${courseid}/${refid}`;
              // ... existing share logic ...
            }}
          >
            <FaShare className="text-purple-500 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Share & Earn</span>
          </button>
        </div>

        {/* Course Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
            <p className="text-gray-500 mt-1">Master your skills with these carefully curated lessons</p>
          </div>

          <div className="divide-y divide-gray-200">
            {groupedLessons.map(({ day, lessons }) => (
              <div key={day} className="bg-white">
                <button
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                  onClick={() => handleDayToggle(day)}
                >
                  <div className="flex items-center space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                      {day}
                    </span>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900">Day {day}</h3>
                      <p className="text-sm text-gray-500">{lessons.length} lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{lessons.length * 30} mins</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedDay === day ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {expandedDay === day && (
                  <div className="pb-6 px-6 space-y-4">
                    {lessons.map((lesson, index) => (
                      <div 
                        key={lesson._id}
                        className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div
                          onClick={() => handleVideoSelection(lesson._id)}
                          className="p-4 cursor-pointer"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="flex items-center text-sm text-gray-500">
                                  <FaClock className="w-4 h-4 mr-1" />
                                  {lesson.duration}
                                </span>
                            {  ( (userid.id!=null)&&lesson && lesson.watchedBy && lesson.watchedBy.length>0)  && <span className="flex items-center text-sm text-emerald-600">
                                  <FaCheckCircle className="w-4 h-4 mr-1" />
                                  Completed
                                </span>}
                              </div>
                            </div>
                            <button className="flex-shrink-0 p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                              <FaPlayCircle className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                        {selectedVideoId === lesson._id && (
                          <div className="mt-4">
                            <Videoplayer url={`/api/getpic?file=${lesson.videoUrl}`}  onLongVideo={()=>(handleLongVideo(lesson))} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Video Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-11/12 h-5/6 max-w-5xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Video Preview</h3>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <Videoplayer url={`/api/getpic?file=${formData.videoFile}`} />
              </div>
            </div>
          </div>
        )}

        {/* Add New Video Modal */}
        {!isPreviewOpen && isModalOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add New Video</h2>
                <p className="text-gray-500 mt-1">Upload a new video lesson to your course</p>
              </div>
              
              <form onSubmit={handleAddVideo} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    placeholder="Enter video title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Video</label>
                  <select
                    name="selectedVideo"
                    value={formData.videoFile || ""}
                    onChange={handleVideoSelectChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    required
                  >
                    <option value="">Choose a video file</option>
                    {videoList.map((video) => (
                      <option key={video.videoLink +video.title} value={video.videoLink}>
                        {video.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day Number</label>
                  <input
                    type="number"
                    name="day"
                    value={formData.day}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    placeholder="Enter day number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow h-32 resize-none"
                    placeholder="Enter video description"
                    required
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                    onClick={() => setIsPreviewOpen(true)}
                  >
                    Preview Video
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-colors"
                  >
                    Save Video
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




























































// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { FaArrowLeft, FaPlayCircle, FaBookmark, FaPlus } from "react-icons/fa";
// import Image from "next/image";
// import Videoplayer from "./../../Components/videoplayer/vid";
// import { useAppSelector } from "../../../../lib/hooks";

// const CoursePages: React.FC = () => {
//   const { courseid, ref } = useParams();
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [playlist, setPlaylist] = useState({}); // Initialize as an object
//   const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
//   const [expandedDay, setExpandedDay] = useState<number | null>(null); // Track expanded day
//   const { name, refid, loggedIn } = useAppSelector((state) => state.user);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [videoList ,setvideoList]= useState([]);
//   const [formData, setFormData] = useState({
//     day:0,
//     title: "",
//     videoFile: null,
//     description: "",
//   });
//   const [coursedet, setcoursedet] = useState({}); 
//   const router = useRouter();

//   const fetchCourses = useCallback(async () => {
//     try {
//       const response = await fetch(`/api/playlist?courseId=${courseid}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch courses");
//       }
//       const resultdata = await response.json();

//       // Check if the response has the playlist structure as expected
//       const playlistData = resultdata?.data[0]?.playlist || {};
//       setcoursedet(resultdata?.data[0] || {})
    
//       setPlaylist(playlistData);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   }, [courseid]);
//   const handleVideoSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedVideoUrl = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       videoFile: selectedVideoUrl,
//     }));
//   };
//   console.log(coursedet)
//   async function fetchAllVideos() {
//     try {
//       const response = await fetch('/api/video');  // Call the API endpoint
  
//       // Check if the response is successful
//       if (!response.ok) {
//         throw new Error(`Error fetching videos: ${response.statusText}`);
//       }
  
//       // Parse the response as JSON
//       const data = await response.json();
  
//       // Log the retrieved videos
//       if (data.type === 'S' && data.data) {
//         console.log('Videos retrieved:', data.data);
//         setvideoList( data.data)
//         // Here, you can use the data (e.g., display video file URLs, filenames, etc.)
//         data.data.forEach(video => {
//           console.log(`Filename: ${video.filename}, URL: ${video.fileUrl}`);
//         });
//       } else {
//         console.log('No videos found or failed to retrieve');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }
//   useEffect(() => {
//     fetchCourses();
//     fetchAllVideos()
//   }, [fetchCourses]);

//   const handleVideoSelection = (id: string) => {
//     setSelectedVideoId((prevId) => (prevId === id ? null : id));
//   };

//   const handleDayToggle = (day: number) => {
//     // Toggle the expanded day
//     setExpandedDay((prevDay) => (prevDay === day ? null : day));
//   };

//   // Convert the playlist object into an array and group by day
//   const handleAddVideo = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.title || !formData.videoFile) {
//       return;  // Do not add video if title or video file is missing
//     }
    

//     // Create FormData to send file along with other data
//     const setformData = new FormData();
//       // @ts-expect-error: 'keepExtensions' property is not typed in the formidable package 
//       setformData.append('courseId', courseid);
//       setformData.append('title', formData.title);
//     setformData.append('video',formData.videoFile);
//     setformData.append('description', formData.description);
//     setformData.append('day', formData.day.toString()); 
//     try {
//       // Send the FormData to the backend API
//       const res = await fetch('/api/playlist', {
//         method: 'POST',
//         body: setformData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Add the new video to playlist after uploading
     
//         setFormData({ title: "", videoFile: null, description: "",day: 0 });
//         fetchCourses()

//         // Reset form state
      
//       } else {
//         console.error('Error uploading video:', data.message);
//       }
//     } catch (error) {
//       console.error('Failed to upload video:', error);
//     }
//   };
//   const groupedLessons = Object.keys(playlist).map((dayStr) => {
//     const day = parseInt(dayStr, 10);
//     return {
//       day,
//       lessons: playlist[dayStr],
//     };
//   });
//   const handleVideoLession=(url)=>{
//     setVideoUrl(`/api/getpic?file=${url.split('/')[2]}`)
//     setIsPreviewOpen(true)
//   }
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     console.log(name, value)
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }; 
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       setFormData((prev) => ({
//         ...prev,
//         videoFile: e.target.files[0],
//       }));
//       const blobUrl = URL.createObjectURL(e.target.files[0]); // Create a Blob URL for the file
//       setVideoUrl(blobUrl);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-blue-900 text-white p-6 flex items-center space-x-4">
//         <FaArrowLeft className="cursor-pointer" onClick={() => router.push("/dashboard")} />
//         <h1 className="text-xl font-bold">{coursedet?.title || "Course Title"}</h1>
//       </header>

//       <div className="relative">
//       <Image
//   src={coursedet?.photo ? `/api/getpic?file=${coursedet.photo.split('/')[2]}` : "/uploads/sample-image.jpg"}
//   alt="Course Image"
//   width={1200}
//   height={800}
//   className="w-full h-64 object-cover"
// />
//       </div>
//       <div className="mb-6">
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 flex items-center"
//             onClick={() => setIsModalOpen(true)} // Close all days when clicked
//           >
//             <FaPlus className="mr-2" />
//             Add New Video
//           </button>
//           <button
//             className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
//             onClick={() => {
//               const shareableLink = `${window.location.origin}/course/${courseid}/${refid}`;
//               const shareData = {
//                 title: `Check out this course: ${playlist[1]?.course?.title || "Amazing Course"}`,
//                 text: `I found this great course and thought you might like it! Use my referral link to join:`,
//                 url: shareableLink,
//               };

//               if (navigator.share) {
//                 // Use the Web Share API
//                 navigator
//                   .share(shareData)
//                   .then(() => console.log("Content shared successfully!"))
//                   .catch((err) => console.error("Error sharing:", err));
//               } else {
//                 // Fallback to copying the link if Web Share API is not available
//                 navigator.clipboard.writeText(shareableLink)
//                   .then(() => alert("Referral link copied to clipboard!"))
//                   .catch(() => alert("Failed to copy the link."));
//               }
//             }}
//           >
//             Refer Friends
//           </button>
//         </div>

//       <main className="p-6 space-y-8">
//         <section className="bg-white shadow-md rounded-lg p-6">
//           <h3 className="text-lg font-bold text-gray-800">Lessons</h3>

//           {/* Loop through and display lessons grouped by day */}
//           <div className="mt-4 space-y-4">
//             {groupedLessons.map(({ day, lessons }) => (
//               <div key={day}>
//                 <div
//                   className="cursor-pointer text-lg font-semibold text-blue-600"
//                   onClick={() => handleDayToggle(day)}
//                 >
//                   Day {day}
//                 </div>
//                 {/* Render lessons of the day */}
//                 {expandedDay === day && (
//                   <div className="ml-4">
//                     {lessons.map((lesson) => (
//                       <div key={lesson._id} className="p-4 bg-gray-50 rounded-md shadow-sm">
//                         <div
//                           onClick={() => handleVideoSelection(lesson._id)}
//                           className="flex justify-between items-center cursor-pointer hover:bg-gray-100"
//                         >
//                           <div>
//                             <h4 className="text-gray-800 font-semibold">{lesson.title}</h4>
//                             <p className="text-gray-600 text-sm">Duration: {lesson.duration}</p>
//                           </div>
//                           <FaPlayCircle className="text-blue-600 text-2xl" />
//                         </div>
//                         {selectedVideoId === lesson._id && (
//                           <div className="mt-4">
//                             <Videoplayer url={`/api/getpic?file=${lesson.videoUrl.split('/')[2]}`} />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
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
//        <Videoplayer url={`/api/getpic?file=${formData.videoFile.split('/')[2]}`} />
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
//           <select
//   name="selectedVideo"
//   value={formData.videoFile || ""} // Use an empty string if value is null or undefined
//   onChange={handleVideoSelectChange}
//   className="w-full p-2 border rounded mt-2"
//   required
// >
//   <option value="">Select a Video</option>
//   {videoList.map((video) => (
//     <option key={video.fileUrl} value={video.fileUrl}>
//       {video.filename}
//     </option>
//   ))}
// </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Day</label>
//           <input
//             type="number"
//             name="day"
//             value={formData.day}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded mt-2"
//             required
//           /></div>
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
//   );
// };

// export default CoursePages;
