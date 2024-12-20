"use client";


import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BuyPage: React.FC = () => {
  const router = useRouter();
  const [courseName, setCourseName] = useState<string>("");
  const [courseFees, setCourseFees] = useState<string>("");
  const [timestamp, setTimestamp] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const fees = params.get("fees");

    if (name) setCourseName(name);
    if (fees) setCourseFees(fees);

    // Only set timestamp on client side
    setTimestamp(new Date().toLocaleString());
  }, []);

  const handleConfirm = () => {
    console.log(
      `Course: ${courseName}, Fees: ${courseFees}, Referral Code: ${referralCode}`
    );
    alert("Course purchase confirmed!");
    router.push("/courses");
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
