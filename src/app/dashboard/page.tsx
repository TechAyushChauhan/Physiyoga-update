"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginFooter from "../Components/loginfooter/page";
import LoginNavbar from "../Components/loginnavbar/page";
import { Book, ClipboardList, TrendingUp, User, Video } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Buyedcourses from "../Components/buyedcourse/page";
import MonthlyGoals from "../Components/monthlygoals/monthlygoals";
import { useAppSelector } from "../../../lib/hooks";

// Modal component to show meetings
const MeetingModal: React.FC<{ meetings: any[], onClose: () => void }> = ({ meetings, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 text-gray-800 relative">
        {/* Close button inside the modal */}
        <button onClick={onClose} className="absolute top-2 right-2 text-red-600 font-bold hover:text-red-800 transition-colors">
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Meetings</h2>
        <ul>
          {meetings.length > 0 ? (
            meetings.map((meeting, index) => (
              <li key={index} className="mb-4">
                <h3 className="font-semibold">{meeting.topic}</h3>
                <p><strong>Start Time:</strong> {new Date(meeting.start_time).toLocaleString()}</p>
                <p><strong>Link:</strong> <a href={meeting.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">{meeting.link}</a></p>
                <p><strong>Duration:</strong> {meeting.duration}</p>
              </li>
            ))
          ) : (
            <p>No meetings available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};



const Dashboard: React.FC = () => {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [date, setDate] = useState<Date | null>(new Date());
  const [meetings, setMeetings] = useState<any[]>([]);  // Ensure meetings is an array
  const [showModal, setShowModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(false); // Corrected this line
 const userid= useAppSelector((state) => state.user);

  useEffect(() => {
    // Fetch meetings data using the userid from the login API
    const fetchMeetings = async () => {
      try {
        const response = await fetch(`/meeting?userid=${userid.id}`);
        const data = await response.json();
        
        // Ensure the data is an array
        if (Array.isArray(data)) {
          setMeetings(data);
        } else {
          setMeetings([]);  // Set as empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [userid]);

  const handleDateChange = (value: Date | null) => {
    setDate(value);
    console.log('Selected date:', value);
  };

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    setIsCollapsed(saved ? JSON.parse(saved) : false);

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-white">
      <div className={`fixed w-full top-0 z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <LoginNavbar />
      </div>

      <div className="flex-grow flex flex-col mt-14 transition-all duration-300 ease-in-out">
        <main className="p-6 space-y-6">
          {/* Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Total Courses</h3>
                <Book className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-blue-600">5</p>
              <p className="text-sm text-gray-500 mt-2">Active Courses</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
                <ClipboardList className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-green-600">3</p>
              <p className="text-sm text-gray-500 mt-2">Courses Finished</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
                <TrendingUp className="w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-gray-500 mt-2">Ongoing Courses</p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md">
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="border-none w-full"
                tileClassName="rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => router.push("/courses")}
                    className="flex items-center justify-center space-x-2 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Book className="w-5 h-5" />
                    <span>View Courses</span>
                  </button>
                  <button
                    onClick={() => router.push("/profile")}
                    className="flex items-center justify-center space-x-2 p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => router.push("/addvideo")}
                    className="flex items-center justify-center space-x-2 p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  >
                    <Video className="w-5 h-5" />
                    <span>View Videos</span>
                  </button>
                </div>
              </div>
              {/* Button to open the meeting popup */}
              <button
  onClick={() => setShowModal(true)}
  className="p-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
>
  View Meetings
</button>
            </div>
          </section>

          <MonthlyGoals />
        </main>
      </div>

      <Buyedcourses />
      <LoginFooter />

      {/* Render the modal */}
      {showModal && <MeetingModal meetings={meetings} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
