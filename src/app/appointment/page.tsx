"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AppointmentForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentType: "",
    date: "",
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.appointmentType) newErrors.appointmentType = "Select an appointment type.";
    if (!formData.date) newErrors.date = "Select a date.";
    if (!formData.time) newErrors.time = "Select a time.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Prepare query parameters
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      appointmentType: formData.appointmentType,
      date: formData.date,
      time: formData.time,
      message: formData.message || "No additional message",
    });
  
    // Redirect to confirmation page with parameters
    router.push(`/confirmation?${params.toString()}`);
  };
  

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 p-4">
  <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-2xl">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Book an Appointment</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md text-black ${errors.name ? "border-red-500" : "border-gray-300"}`}
          placeholder="Enter your full name"
          required
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md text-black ${errors.email ? "border-red-500" : "border-gray-300"}`}
          placeholder="Enter your email"
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md text-black ${errors.phone ? "border-red-500" : "border-gray-300"}`}
          placeholder="Enter your phone number"
          required
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Appointment Type */}
      <div>
        <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-600">Appointment Type</label>
        <select
          id="appointmentType"
          name="appointmentType"
          value={formData.appointmentType}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md text-black ${errors.appointmentType ? "border-red-500" : "border-gray-300"}`}
          required
        >
          <option value="">Select</option>
          <option value="consultation">Consultation</option>
          <option value="follow-up">Follow-Up</option>
          <option value="therapy">Therapy</option>
          <option value="other">Other</option>
        </select>
        {errors.appointmentType && <p className="text-red-500 text-sm mt-1">{errors.appointmentType}</p>}
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-600">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md text-black ${errors.date ? "border-red-500" : "border-gray-300"}`}
          required
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
      </div>

      {/* Time */}
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-600">Time</label>
        <input
          id="time"
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md text-black ${errors.time ? "border-red-500" : "border-gray-300"}`}
          required
        />
        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-600">Additional Message (Optional)</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border rounded-md border-gray-300 text-black"
          placeholder="Enter any additional details"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className={`px-6 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AppointmentForm;
