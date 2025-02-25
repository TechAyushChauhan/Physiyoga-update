"use client";

import React, { useEffect, useState } from "react";

const AppointmentForm = () => {

const [appointdata,setappointdata]=useState([])

  const getAvailabledata = async () => {
    try {
      const response = await fetch(`/api/adminappoint`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (response.ok && result.type === 'S') {
        setappointdata( result.data); // Return the list of available times
      } else {
        alert(result.message || 'Failed to retrieve available times.');
        setappointdata([]);
      }
    } catch (error) {
      console.error('Error fetching available times:', error);
      alert('An error occurred while retrieving available times.');
      setappointdata([]);
    }
  };
  // Dummy data initialization
  const initialDummyData = [
    {
      appointmentDate: "2024-01-15",
      appointmentTime: "10:30",
      name: "John Smith",
      gender: "male",
      birthdate: "1990-05-20",
      mobile: "9876543210",
      email: "john.smith@email.com",
      hearAboutUs: "Social Media",
      referral: "Dr. Williams",
      medicalInfo: "Regular checkup",
      city: "New York",
      state: "NY",
      pincode: "100001",
      currentMedications: "None",
      allergies: "Penicillin",
    },
    {
      appointmentDate: "2024-01-16",
      appointmentTime: "14:15",
      name: "Sarah Johnson",
      gender: "female",
      birthdate: "1988-08-12",
      mobile: "8765432109",
      email: "sarah.j@email.com",
      hearAboutUs: "Friend",
      referral: "Mary Wilson",
      medicalInfo: "Dental cleaning",
      city: "Los Angeles",
      state: "CA",
      pincode: "900001",
      currentMedications: "Vitamin D",
      allergies: "None",
    },
    // ... rest of your dummy data
  ];

  const [savedData, setSavedData] = useState(initialDummyData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    appointmentDate: "",
    appointmentTime: "",
  });
  useEffect(()=>{
    getAvailabledata()
  },[])

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({
      appointmentDate: savedData[index].appointmentDate,
      appointmentTime: savedData[index].appointmentTime,
    });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (editingIndex !== null) {
      const updatedData = [...appointdata];
      updatedData[editingIndex] = {
        ...updatedData[editingIndex],
        appointmentDate: editData.appointmentDate,
        appointmentTime: editData.appointmentTime,
      };
      setSavedData(updatedData);
      setIsEditing(false);
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Appointment Records
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-100">
                  {[
                    "Appointment Date",
                    "Appointment Time",
                    "Name",
                    "Gender",
                    "Birthdate",
                    "Mobile",
                    "Email",
                    "Hear About Us",
                    "Referral",
                    "Medical Info",
                    "City",
                    "State",
                    "Pincode",
                    "Current Medications",
                    "Allergies"
                  ].map((header) => (
                    <th key={header} className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointdata.map((data, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                  
                    <td className="px-4 py-2">{data.date}</td>
                    <td className="px-4 py-2">{data.time}</td>
                    <td className="px-4 py-2 font-medium">{data.name}</td>
                    <td className="px-4 py-2">{data.gender}</td>
                    <td className="px-4 py-2">{data.birthdate}</td>
                    <td className="px-4 py-2">{data.mobile}</td>
                    <td className="px-4 py-2">{data.email}</td>
                    <td className="px-4 py-2">{data.hereabout}</td>
                    <td className="px-4 py-2">{data.referalname || "-"}</td>
                    <td className="px-4 py-2">{data.medicalInformation}</td>
                    <td className="px-4 py-2">{data.city}</td>
                    <td className="px-4 py-2">{data.state}</td>
                    <td className="px-4 py-2">{data.pincode}</td>
                    <td className="px-4 py-2">{data.medicines}</td>
                    <td className="px-4 py-2">{data.allergy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Set Appointment Date and Time</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={editData.appointmentDate}
                  onChange={(e) => setEditData({ ...editData, appointmentDate: e.target.value })}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="time" className="text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  value={editData.appointmentTime}
                  onChange={(e) => setEditData({ ...editData, appointmentTime: e.target.value })}
                  className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;