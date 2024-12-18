"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const BuyPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [courseName, setCourseName] = useState<string | null>(null);
  const [courseFees, setCourseFees] = useState<string | null>(null);

  useEffect(() => {
    const name = searchParams.get("name");
    const fees = searchParams.get("fees");

    if (name && fees) {
      setCourseName(name);
      setCourseFees(fees);
    }
  }, [searchParams]);

  const handleConfirm = () => {
    console.log(`Course: ${courseName}, Fees: ${courseFees}`);
    alert("Course purchase confirmed!");
    router.push("/courses"); // Redirect back to courses page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Course Purchase</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Course Name:</label>
          <input
            type="text"
            value={courseName || ""}
            disabled
            className="w-full px-4 py-2 rounded border bg-gray-100 text-gray-800"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Course Fees:</label>
          <input
            type="text"
            value={courseFees || ""}
            disabled
            className="w-full px-4 py-2 rounded border bg-gray-100 text-gray-800"
          />
        </div>
        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default BuyPage;
