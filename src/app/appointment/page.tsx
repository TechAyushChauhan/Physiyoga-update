"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../Components/ui/button";

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthdate: "",
    mobile: "",
    altMobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    date: "",
    time: "",
    hereabout: [],
    otherHereabout: "",
    referalname: "",
    referalnumber: "",
    medicalInformation: [],
    otherMedicalInformation: "",
    physiciannumber: "",
    medicines: [],
    othermedicines: "",
    allergy: "",

  });


  const router = useRouter(); // Correctly use the useRouter hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.mobile,
      gender: formData.gender,
      date: formData.date, // Corrected to use formData.date instead of formData.name
      time: formData.time, // Corrected to use formData.time instead of formData.name
    }).toString();

    // Redirect to the confirmation page with query parameters
    router.push(`/confirmation?${queryParams}`);
  };


  const handleBack = (e: React.FormEvent) => {
    // Redirect to the confirmation page with query parameters
    router.push(`/`);
  };


  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value] // Add the value if checked
        : prevData[name].filter((item) => item !== value), // Remove the value if unchecked
    }));
  };
  

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.birthdate) newErrors.birthdate = "Birthdate is required.";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }
    if (formData.altMobile && !/^\d{10}$/.test(formData.altMobile)) {
      newErrors.altMobile = "Enter a valid 10-digit alternative number.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email ID is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 p-4">
   
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-2xl">
      <div className="mb-6">
  <Button
    onClick={handleBack}
    className="flex items-center gap-2 px-4 py-2 text-white bg-black hover:bg-gray-200 rounded-lg transition-colors duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
    <span className="font-medium">Back</span>
  </Button>
</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Book An Appointment</h2>
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
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalnumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Birthdate */}
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-600">Birthdate</label>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-black ${errors.birthdate ? "border-red-500" : "border-gray-300"}`}
              required
            />
            {errors.birthdate && <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalnumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your mobile number"
              required
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          {/* Alternative Number */}
          <div>
            <label htmlFor="altMobile" className="block text-sm font-medium text-gray-600">Alternative Number</label>
            <input
              id="altMobile"
              name="altMobile"
              type="tel"
              value={formData.altMobile}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalnumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your alternative number"
            />
            {errors.altMobile && <p className="text-red-500 text-sm mt-1">{errors.altMobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email ID</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalnumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 text-black"
              placeholder="Enter your address"
              rows={3}
              required
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-600">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalnumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your city"
              required
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-600">State</label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalnumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your state"
              required
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-600">Pincode</label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              value={formData.pincode}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalnumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your pincode"
              required
            />
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
          </div>

 {/* Date */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-600">Appointment Date</label>
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
        <label htmlFor="time" className="block text-sm font-medium text-gray-600">Appointment Time</label>
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
      
          <div>
            <label htmlFor="hereabout" className="block text-lg font-medium text-black pb-5">
              How did you hear about us?
            </label>
            <div className="flex flex-col space-y-2">
              {/* Checkbox inputs */}
              {["Google", "Relative Reference (Dr.)", "Old Patient", "Facebook", "Instagram"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="hereabout"
                    value={option}
                    checked={formData.hereabout.includes(option)}
                    onChange={handleCheckboxChange}
                    className="text-blue-500 focus:ring-blue-400"
                  />
                  <span className="text-black">{option}</span>
                </label>
              ))}

              {/* "Others" checkbox with text input */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="hereabout"
                  value="Others"
                  checked={formData.hereabout.includes("Others")}
                  onChange={handleCheckboxChange}
                  className="text-blue-500 focus:ring-blue-400"
                />
                <span className="text-black">Others</span>
              </label>
              {formData.hereabout.includes("Others") && (
                <input
                  type="text"
                  name="otherHereabout"
                  value={formData.otherHereabout}
                  onChange={handleChanges}
                  className="w-full px-4 py-2 border rounded-md text-black border-gray-300 mt-2"
                  placeholder="Please specify"
                />
              )}
            </div>
            {errors.hereabout && <p className="text-red-500 text-sm mt-1">{errors.hereabout}</p>}
          </div>




          <div>
            <div>
              <label htmlFor="referalname" className="block text-lg font-medium text-black">
                Whom may we thank for referring you?
              </label>
            </div>

            {/* Name Input */}
            <label htmlFor="referalname" className="block text-sm font-medium text-gray-600 pt-4">
              Name
            </label>
            <input
              id="referalname"
              name="referalname"
              type="text"
              value={formData.referalname}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalname ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter referral name"
              required
            />

            {/* Contact Number Input */}
            <label htmlFor="referalnumber" className="block text-sm font-medium text-gray-600 pt-4">
              Contact No.
            </label>
            <input
              id="referalnumber"
              name="referalnumber"
              type="text"
              value={formData.referalnumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.referalnumber ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter referral number"
              required
            />
            {errors.referalnumber && <p className="text-red-500 text-sm mt-1">{errors.referalnumber}</p>}
          </div>


          <div>
            <label htmlFor="medicalInformation" className="block text-lg font-medium text-black pb-3">
              Medical Information
            </label>
            <label htmlFor="medicalInformation" className="block text-md font-medium text-gray-800 pb-5">
            Physiotherapy is a holistic approach to improving physical health, encompassing musculoskeletal, neurological, cardiovascular, and overall functional well-being. Your medical history and any ongoing treatments or medications can greatly impact the effectiveness of your therapy. Please indicate any existing conditions to help us tailor the best care for you.
            </label>
            <div className="grid grid-cols-2 gap-4">
  {/* Checkbox inputs */}
  {[
    "Heart Disease",
    "Diabetes",
    "High Blood Pressure",
    "Asthma",
    "Epilepsy",
    "Allergy",
    "Pregnancy",
    "Tuberculosis (TB)",
    "Thyroid disease",
    "Hepatitis",
    "Liver/Kidney Disease",
    "Cancer",
    "None",
  ].map((option) => (
    <label key={option} className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="medicalInformation"
        value={option}
        checked={formData.medicalInformation.includes(option)}
        onChange={handleCheckboxChange}
        className="text-blue-500 focus:ring-blue-400"
      />
      <span className="text-black">{option}</span>
    </label>
  ))}

  {/* "Others" checkbox with text input */}
  <label className="flex items-center space-x-2 col-span-2">
    <input
      type="checkbox"
      name="medicalInformation"
      value="Others"
      checked={formData.medicalInformation.includes("Others")}
      onChange={handleCheckboxChange}
      className="text-blue-500 focus:ring-blue-400"
    />
    <span className="text-black">Others</span>
  </label>
  {formData.medicalInformation.includes("Others") && (
    <input
      type="text"
      name="otherMedicalInformation"
      value={formData.otherMedicalInformation}
      onChange={handleChanges}
      className="w-full px-4 py-2 border rounded-md text-black border-gray-300 mt-2 col-span-2"
      placeholder="Please specify"
    />
  )}
</div>
{/* Contact Number Input */}
<label htmlFor="physiciannumber" className="block text-sm font-medium text-gray-600 pt-5">
              Physician Contact No.
            </label>
            <input
              id="physiciannumber"
              name="physiciannumber"
              type="text"
              value={formData.physiciannumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border-b text-black focus:outline-none focus:border-blue-500 ${errors.physiciannumber ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter referral number"
              required
            />
            {errors.physiciannumber && <p className="text-red-500 text-sm mt-1">{errors.physiciannumber}</p>}
          </div>


          <div>
            <label htmlFor="medicines" className="block text-lg font-semibold text-black pb-3">
              Are you taking Medicines for:
            </label>
            <div className="grid grid-cols-2 gap-4">
  {/* Checkbox inputs */}
  {[
    "Diabetes",
    "High Blood Pressure",
    "Acidity",
    "Blood Thinners",
    "Arthritis",
    "Vitamins & Minerals",
    "None",
  ].map((option) => (
    <label key={option} className="flex items-center space-x-2">
      <input
  type="checkbox"
  name="medicines"
  value={option}
  checked={formData.medicines.includes(option)}
  onChange={handleCheckboxChange}
  className="text-blue-500 focus:ring-blue-400"
/>

      <span className="text-black">{option}</span>
    </label>
  ))}

  {/* "Others" checkbox with text input */}
  <label className="flex items-center space-x-2 col-span-2">
    <input
      type="checkbox"
      name="medicines"
      value="Others"
      checked={formData.medicines.includes("Others")}
      onChange={handleCheckboxChange}
      className="text-blue-500 focus:ring-blue-400"
    />
    <span className="text-black">Others</span>
  </label>
  {formData.medicines.includes("Others") && (
    <input
      type="text"
      name="othermedicines"
      value={formData.othermedicines}
      onChange={handleChanges}
      className="w-full px-4 py-2 border rounded-md text-black border-gray-300 mt-2 col-span-2"
      placeholder="Please specify"
    />
  )}
</div>
            {errors.physiciannumber && <p className="text-red-500 text-sm mt-1">{errors.physiciannumber}</p>}
          </div>


          <div>
            <label className="block text-lg font-medium text-gray-600 pb-3">Are Allergic to any type of Medicines</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  name="allergy"
                  value="No"
                  checked={formData.allergy === "No"}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  name="allergy"
                  value="Yes"
                  checked={formData.allergy === "Yes"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
            </div>
            {errors.allergy && <p className="text-red-500 text-sm mt-1">{errors.allergy}</p>}
          </div>



          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
