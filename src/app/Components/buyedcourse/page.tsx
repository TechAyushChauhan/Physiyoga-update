"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { setloader } from "../../../../store/slices/loaderSlice";
import { useAppDispatch } from "../../../../lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";;
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { BookOpen, User } from "lucide-react";

// Dynamic imports for icons
// const FaUserAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaUserAlt), { ssr: false });
// const FaBook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBook), { ssr: false });
// const FaSignOutAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaSignOutAlt), { ssr: false });
// const FaBars = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBars), { ssr: false });
// const FaTimes = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTimes), { ssr: false });
// const FaBell = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBell), { ssr: false });

const notifications = [
  { id: 1, message: "New course added: Yoga for Seniors" },
  { id: 2, message: "Your subscription is expiring soon!" },
  { id: 3, message: "You achieved 100% progress on NeckCare Nexus!" }
];

const Buyedcourses: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [userCourses, setUserCourses] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const getCourses = async (): Promise<any> => {
    dispatch(setloader(true));
    try {
      const response = await fetch('/api/addcourse', {
        method: 'GET',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch courses');
      }
      const apiResponse = await response.json();
      setUserCourses(apiResponse.data);
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      throw error;
    }
    dispatch(setloader(false));
  };

  useEffect(() => {
    dispatch(setloader(false));
    getCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
  

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6 mt-16">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/dashboard')}>
              <BookOpen className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/profile')}>
              <User className="mr-2 h-5 w-5" />
              Profile
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-24 pb-8 px-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Yoga Courses</h2>
            <p className="text-gray-600">
              Manage your courses, track your progress, and explore new learning opportunities.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCourses.map((course) => (
              <Card key={course._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => router.push(`/course/${course._id}`)}
                    >
                      View Course
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => router.push(`/buy?name=${course.name}&fees=${course.fees}`)}
                    >
                      Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Add Video Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Video</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Video Title</label>
              <Input name="title" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Video File</label>
              <Input type="file" name="videoFile" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea name="description" required />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Buyedcourses;