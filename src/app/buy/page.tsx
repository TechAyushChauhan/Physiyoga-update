"use client";


import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../lib/hooks";
import { setloader } from "../../../store/slices/loaderSlice";

const BuyPage: React.FC = () => {
  const router = useRouter();
  const [courseName, setCourseName] = useState<string>("");
  const [courseFees, setCourseFees] = useState<string>("");
  const [timestamp, setTimestamp] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
const dispatch=useAppDispatch()


  const fetchAllCourses = async (courseID) => {
    try {
        dispatch(setloader(true))
      const response = await fetch('/api/addcourse?id='+courseID, {
        method: 'GET',
      });

  
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
     
  
      const data = await response.json();
      if (data.type="S") {
        setCourseName(data.data.title)
        setCourseFees(data.data.pay)
        const refral = localStorage.getItem('refcode');
        if (refral) {
          setReferralCode(refral)
        }
      }

    
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    dispatch(setloader(false))
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const courseID = params.get("courseID");
    fetchAllCourses(courseID)
  
   

    // Only set timestamp on client side
    setTimestamp(new Date().toLocaleString());
  }, []);
  const handlePayment = async () => {
    try {
    

      // Prepare the data to send
   

      // Make a POST request using fetch
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate payment.');
      }

      // Redirect user to the payment page if the request is successful
      if (data && data.data.instrumentResponse.redirectInfo.url) {
        window.location.href = data.data.instrumentResponse.redirectInfo.url;
      }
    } catch (err) {
      console.error('Error initiating payment:', err);
      // setError(err.message || 'An unexpected error occurred.');
    } finally {
      // setLoading(false);
    }
  };

  const handleConfirm = () => {
    handlePayment()
  
  };

  const handleCancel = () => {
    router.push("/courses");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 p-4">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
          Confirm Your Course
        </h2>
        <div className="text-sm text-gray-500 mb-6 text-center">
          <p>Timestamp: {timestamp || "Loading..."}</p> {/* Placeholder */}
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="courseName"
              className="block text-sm font-medium text-gray-600"
            >
              Course Name:
            </label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
              aria-label="Course Name"
            />
          </div>
          <div>
            <label
              htmlFor="courseFees"
              className="block text-sm font-medium text-gray-600"
            >
              Course Fees:
            </label>
            <input
              id="courseFees"
              type="text"
              value={`₹ ${courseFees}`}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
              aria-label="Course Fees"
            />
          </div>
          <div>
            <label
              htmlFor="referralCode"
              className="block text-sm font-medium text-gray-600"
            >
              Referral Code (Optional):
            </label>
            <input
              id="referralCode"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white text-gray-800"
              aria-label="Referral Code"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-600 text-sm border-t pt-3">
            <strong>Course Summary:</strong> You are purchasing{" "}
            <span className="font-semibold">{courseName || "N/A"}</span> for a
            fee of{" "}
            <span className="font-semibold text-green-600">
              {courseFees || "N/A"}
            </span>
            .
            {referralCode && (
              <span>
                {" "}
                Using referral code{" "}
                <span className="font-semibold text-blue-600">
                  {referralCode}
                </span>
                .
              </span>
            )}
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 transition-all"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyPage;
