"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, Clock, Mail, MessageSquare, Phone, User } from "lucide-react";

interface AppointmentDetails {
  name: string;
  email: string;
  phone: string;
  appointmentType: string;
  date: string;
  time: string;
  message: string;
}

const Confirmation: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);

  // Using useEffect to handle the side-effect of getting the URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const details: AppointmentDetails = {
        name: searchParams.get("name") || "",
        email: searchParams.get("email") || "",
        phone: searchParams.get("phone") || "",
        appointmentType: searchParams.get("appointmentType") || "",
        date: searchParams.get("date") || "",
        time: searchParams.get("time") || "",
        message: searchParams.get("message") || "No additional message.",
      };
      setAppointmentDetails(details);
    }
  }, [searchParams]); // Dependency array to run only when searchParams changes

  const handleBackToHome = () => {
    router.push("/dashboard");
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // If appointment details are still loading, show a loading state
  if (!appointmentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="text-center p-6 space-y-4">
          <span className="inline-flex bg-green-500 text-white text-sm px-3 py-1 rounded-full">
            Confirmed
          </span>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Confirmation</h1>
          <p className="text-lg text-gray-600">
            Thank you for scheduling your appointment. A confirmation email has been sent to your inbox.
          </p>
        </div>

        <div className="w-full border-t border-gray-200" />

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Name and Email Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-2 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-base font-semibold text-gray-900">{appointmentDetails.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-2 rounded-full bg-purple-100 flex items-center justify-center">
                <Mail className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base text-gray-900">{appointmentDetails.email}</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-2 rounded-full bg-green-100 flex items-center justify-center">
              <Phone className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-base text-gray-900">{appointmentDetails.phone}</p>
            </div>
          </div>

          <div className="w-full border-t border-gray-200" />

          {/* Date and Time Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-2 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-base font-semibold text-gray-900">{appointmentDetails.date}</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-2 rounded-full bg-indigo-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p className="text-base font-semibold text-gray-900">{appointmentDetails.time}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          {appointmentDetails.message && (
            <div className="flex items-start space-x-3">
              <div className="h-8 w-2 rounded-full bg-rose-100 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-rose-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-500">Additional Message</p>
                <p className="text-base text-gray-900">{appointmentDetails.message}</p>
              </div>
            </div>
          )}
        </div>

        <div className="w-full border-t border-gray-200 my-6" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Print Details
          </button>
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
