"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FaPlus } from "react-icons/fa";

// Dynamic imports for icons
const FaArrowLeft = dynamic(() => import("react-icons/fa").then((mod) => mod.FaArrowLeft), { ssr: false });
const FaPlayCircle = dynamic(() => import("react-icons/fa").then((mod) => mod.FaPlayCircle), { ssr: false });
const FaBookmark = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBookmark), { ssr: false });

const CoursePage: React.FC = () => {
  // const { courseId } = useParams();
  const router = useRouter();

  const handleAddVideo = () => {
    // Redirect to /addcourse when the button is clicked
    router.push("/addvideo");
  };
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
    imageUrl: "/images/yoga-beginners.jpg", // Add an image file to your public/images folder
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white p-6 flex items-center space-x-4">
        <FaArrowLeft className="cursor-pointer" onClick={() => router.push("/dashboard")} />
        <h1 className="text-xl font-bold">{courseDetails.name}</h1>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <img
          src={courseDetails.imageUrl}
          alt={courseDetails.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{courseDetails.name}</h2>
            <p className="mt-2">{courseDetails.description}</p>
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
  onClick={handleAddVideo}
>
  <FaPlus className="mr-2" />
  Add New video
</button>
</div>
        {/* Lessons Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800">Lessons</h3>
          <div className="mt-4 space-y-4">
            {courseDetails.lessons.map((lesson) => (
              <div
                key={lesson.id}
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
      </main>
    </div>
  );
};

export default CoursePage;
