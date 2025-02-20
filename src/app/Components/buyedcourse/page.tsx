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

const Buyedcourses: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-50">
     

      {/* Main Content */}
      <main className={`transition-all duration-500 ${isSidebarOpen ? 'md:ml-72' : 'ml-0'}`}>
        <div className="container mx-auto max-w-6xl px-6 md:px-8 pt-20">
          {/* Header Section with Currency Selector */}
          <div className="flex flex-col items-center mb-16 text-center">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent animate-gradient">
                Your Wellness Journey
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl leading-relaxed mx-auto">
                Discover transformative yoga courses designed to nurture your mind, body, and spirit.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full bg-white text-gray-900 shadow-md border-gray-200 hover:border-violet-300 focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all duration-300 rounded-lg">
                  <SelectValue 
                    placeholder="Select Currency"
                    className="text-center text-gray-600 placeholder:text-gray-400" 
                  />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-xl rounded-lg">
                  {Object.entries(currencies).map(([country, config]) => (
                    <SelectItem 
                      key={country} 
                      value={country} 
                      className="cursor-pointer hover:bg-violet-50 text-gray-900 focus:bg-violet-100 focus:text-violet-900"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-base">{config.flag}</span>
                        <span className="font-medium">{config.code}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Courses Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse rounded-2xl overflow-hidden">
                  <div className="h-56 bg-gray-200"></div>
                  <CardContent className="p-8 text-center">
                    <div className="h-8 bg-gray-200 rounded mb-4 mx-auto w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded mt-6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userCourses.map((course) => (
                <Card key={course._id} className="group overflow-hidden rounded-2xl border-0 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="relative overflow-hidden h-56 p-0">
                    <div className="absolute inset-0 bg-violet-100">
                      {course.photo ? (
                        <img 
                          src={course.photo} 
                          alt={course.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <img 
                          src={'https://www.everydayyoga.com/cdn/shop/articles/yoga_1024x1024.jpg?v=1703853908'} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                          alt="Default yoga image" 
                        />
                      )}
                    </div>
                    {course.pay && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1.5 text-white font-medium rounded-full shadow-lg">
                        PREMIUM
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-8 space-y-4 text-center">
                    <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-violet-700 transition-colors duration-300">
                      {course.title}
                    </CardTitle>
                    <p className="text-gray-600 line-clamp-2 min-h-[48px] leading-relaxed mx-auto max-w-sm">
                      {course.description}
                    </p>
                    
                    {course.pay && (
                      <div className="flex items-center justify-center text-violet-700 font-bold text-2xl mt-4">
                        <span className="mr-1">{convertPrice(course.pay)?.symbol}</span>
                        <span>{convertPrice(course.pay)?.value}</span>
                        <Badge variant="outline" className="ml-3 text-xs bg-violet-50 text-violet-700 border-violet-200 px-3 rounded-full">
                          {currencies[selectedCountry].code}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex gap-4 pt-6">
                      <Button
                        className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => router.push(`/course/${course._id}`)}
                      >
                        View Course
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-violet-200 text-violet-700 hover:bg-violet-50 font-medium py-6 rounded-xl transition-all duration-300"
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
    </div>
  );
};

export default Buyedcourses;