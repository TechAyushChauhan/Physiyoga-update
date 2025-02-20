"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { setloader } from "../../../../store/slices/loaderSlice";
import { useAppDispatch } from "../../../../lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { BookOpen, User, Image, Menu, Globe, ShoppingBag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";

interface Course {
  _id: string;
  title: string;
  description: string;
  photo: string;
  pay?: number;
}

interface CurrencyConfig {
  symbol: string;
  rate: number;
  code: string;
  flag: string;
}

const currencies: Record<string, CurrencyConfig> = {
  'India': { symbol: '₹', rate: 1, code: 'INR', flag: '🇮🇳' },
  'USA': { symbol: '$', rate: 0.012, code: 'USD', flag: '🇺🇸' },
  'Canada': { symbol: 'CA$', rate: 0.016, code: 'CAD', flag: '🇨🇦' },
  'Europe': { symbol: '€', rate: 0.011, code: 'EUR', flag: '🇪🇺' },
  'UK': { symbol: '£', rate: 0.0095, code: 'GBP', flag: '🇬🇧' },
};

const CoursesComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('India');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const getCourses = useCallback(async (): Promise<void> => {
    dispatch(setloader(true));
    setIsLoading(true);
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching courses:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    } finally {
      dispatch(setloader(false));
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const convertPrice = (priceInINR: number | undefined) => {
    if (!priceInINR) return null;
    const currency = currencies[selectedCountry];
    const convertedPrice = priceInINR * currency.rate;
    return {
      symbol: currency.symbol,
      value: convertedPrice.toFixed(2)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5 text-indigo-700" />
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Yoga Journey
            </h1>
          </div>
          <div className="flex items-center gap-3">
          <Select
  value={selectedCountry}
  onValueChange={setSelectedCountry}
>
  <SelectTrigger className="w-[140px] border-indigo-200 focus:ring-indigo-300 text-gray-200">
    <SelectValue placeholder="Currency" />
  </SelectTrigger>
  <SelectContent className="bg-white">
    {Object.keys(currencies).map((country) => (
      <SelectItem key={country} value={country} className="text-gray-800 hover:bg-indigo-50 cursor-pointer">
        <div className="flex items-center gap-2">
          <span>{currencies[country].flag}</span>
          <span>{country}</span>
          <span className="ml-1 text-gray-500">
            ({currencies[country].symbol})
          </span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>
            <div className="hidden md:flex">
              <Button 
                variant="ghost"
                className="text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50"
                onClick={() => router.push('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button 
                variant="ghost"
                className="text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50"
                onClick={() => router.push('/dashboard')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white/95 backdrop-blur-md shadow-xl transform transition-all duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6 mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Yoga Journey</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(false)} 
              className="hover:bg-indigo-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-700">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </Button>
          </div>
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start rounded-md py-3 px-4 hover:bg-indigo-50 transition-colors"
              onClick={() => router.push('/dashboard')}
            >
              <BookOpen className="mr-3 h-5 w-5 text-indigo-600" />
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start rounded-md py-3 px-4 hover:bg-indigo-50 transition-colors"
              onClick={() => router.push('/profile')}
            >
              <User className="mr-3 h-5 w-5 text-indigo-600" />
              Profile
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start rounded-md py-3 px-4 hover:bg-indigo-50 transition-colors"
              onClick={() => router.push('/settings')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-indigo-600">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Settings
            </Button>
          </div>
          <div className="pt-6 mt-6 border-t border-indigo-100">
            <Button 
              variant="default" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-200 rounded-md py-2"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              View My Courses
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-24 pb-16 px-4 md:px-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Discover Your Path to Wellness
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Our comprehensive yoga courses are designed to help you find balance,
              improve flexibility, and achieve inner peace through mindful practice.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all">
                <BookOpen className="mr-2 h-4 w-4" />
                New Courses
              </Button>
            
            </div>
          </div>

          {/* Courses Grid with Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userCourses.map((course) => (
                <Card key={course._id} className="group overflow-hidden rounded-xl border border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                  <CardHeader className="relative overflow-hidden h-52 p-0 bg-indigo-50">
                    {course.photo ? (
                      <img 
                        src={course.photo} 
                        alt={course.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <img 
                          src={'https://www.everydayyoga.com/cdn/shop/articles/yoga_1024x1024.jpg?v=1703853908'} 
                          className="w-full h-full object-cover" 
                          alt="Default yoga image" 
                        />
                      </div>
                    )}
                    {course.pay && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-white font-medium text-xs">
                        PREMIUM
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
                      {course.title}
                    </CardTitle>
                    <p className="text-gray-600 line-clamp-2 min-h-[48px]">{course.description}</p>
                    
                    {course.pay && (
                      <div className="flex items-center text-indigo-700 font-semibold text-xl">
                        <span className="mr-1">{convertPrice(course.pay)?.symbol}</span>
                        <span>{convertPrice(course.pay)?.value}</span>
                        <Badge variant="outline" className="ml-3 text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
                          {currencies[selectedCountry].code}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                        onClick={() => router.push(`/course/${course._id}`)}
                      >
                        View Course
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-medium transition-colors"
                        onClick={() => router.push(`/buy?courseID=${course._id}`)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Video Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-xl border-indigo-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">Add New Video</DialogTitle>
          </DialogHeader>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Video Title</label>
              <Input 
                name="title" 
                required 
                className="w-full border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Video File</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-indigo-200 border-dashed rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-all duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image className="w-8 h-8 mb-3 text-indigo-500" />
                    <p className="mb-2 text-sm text-indigo-700 font-medium">
                      <span>Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">MP4, WebM, Ogg (MAX. 500MB)</p>
                  </div>
                  <Input 
                    type="file" 
                    name="videoFile" 
                    required 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea 
                name="description" 
                required 
                className="w-full min-h-[100px] border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300" 
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="px-6 border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-200"
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesComponent;
