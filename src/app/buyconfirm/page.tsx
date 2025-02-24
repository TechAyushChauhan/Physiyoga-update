'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { setloader } from '../../../store/slices/loaderSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

const PaymentDetailsPage = () => {
  const router = useRouter();
   const userid= useAppSelector((state) => state.user);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [transactionId, setTransactionId] = useState('');
    const [courseName, setCourseName] = useState<string>("");
    const [courseFees, setCourseFees] = useState<string>("");
    const [timestamp, setTimestamp] = useState<string>("");
    const [referralCode, setReferralCode] = useState<string>("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  // const [transactionId, setPaymentScreenshot] = useState(null);
  const [notes, setNotes] = useState('');
  const dispatch=useAppDispatch()
  const [loading, setLoading] = useState(false);
  const { courseid } = useParams();
  const notifyAdmin = async () => {
    console.log('Notifying admin about payment:', {
      transactionId,
      paymentScreenshot: paymentScreenshot ? 'Uploaded' : 'Not uploaded',
      notes,
      timestamp: new Date().toISOString()
    });
    return new Promise(resolve => setTimeout(resolve, 1500));
  };
  const createPayment = async ( ) => {
   
    const formData = new FormData();
  
    formData.append('transactionId', transactionId);
    
     formData.append('userId', userid.id);
    formData.append('additionalNotes', notes);
    formData.append('file', paymentScreenshot);
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const courseID = params.get("courseID");
    formData.append('course', courseID);
    const refral = localStorage.getItem('refcode');
    if (refral) {
      formData.append('refral', refral);
    }
 
    try {
      const response = await fetch('/api/approve', {
        method: 'POST',
        body: formData,  // Send form data including file
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem('refcode');

        console.log('Payment created:', data);
      } else {
        console.error('Error creating payment:', data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(()=>{
    // createPayment()
  },[])
  
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
          console.log(data)
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
    useEffect(()=>{
      const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const courseID = params.get("courseID");
      fetchAllCourses(courseID)
    },[])
  console.log(transactionId)
  const handlePaymentSubmit = async () => {
    if (!transactionId || !paymentScreenshot) {
      alert('Please provide both transaction ID and payment screenshot');
      return;
    }
    
    setLoading(true);
    setPaymentStatus('processing');
    
    try {
      await notifyAdmin();
      setPaymentStatus('pending_approval');
    } catch (error) {
      console.error('Error notifying admin:', error);
      alert('There was an error submitting your payment. Please try again.');
      setPaymentStatus('pending');
    } finally {
      setLoading(false);
    }
  };
  
  const simulateAdminResponse = (approved) => {
    setPaymentStatus(approved ? 'approved' : 'rejected');
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    }
  };
  
  const renderStatusMessage = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6 shadow-sm">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-3"></div>
              <h3 className="text-lg font-semibold text-blue-700">Processing Payment</h3>
            </div>
            <p className="text-black mt-2 ml-8">We're processing your request. Please wait...</p>
          </div>
        );
      case 'pending_approval':
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-6 shadow-sm">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-yellow-700">Awaiting Approval</h3>
            </div>
            <p className="text-black ml-8 mb-3">Your payment is awaiting admin approval. We'll notify you once it's reviewed.</p>
            
            {/* <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-300 ml-8">
              <p className="text-sm text-gray-700 mb-3 font-medium">Demo controls (would not exist in production):</p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => simulateAdminResponse(true)}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-all shadow-sm"
                >
                  Simulate Approval
                </button>
                <button 
                  onClick={() => simulateAdminResponse(false)}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-all shadow-sm"
                >
                  Simulate Rejection
                </button>
              </div>
            </div> */}
          </div>
        );
      case 'approved':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 shadow-md">
            <div className="text-center py-6">
              <div className="rounded-full bg-green-100 h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-green-700 mb-3">Payment Approved!</h3>
              <p className="text-black mb-4 max-w-md mx-auto">Your payment has been approved and your course access is now activated. You can start learning right away.</p>
              <button
                onClick={() => router.push('/courses')}
                className="mt-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all shadow-sm font-medium"
              >
                Go to My Courses
              </button>
            </div>
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 shadow-md">
            <div className="text-center py-6">
              <div className="rounded-full bg-red-100 h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-red-700 mb-3">Payment Rejected</h3>
              <p className="text-black mb-4 max-w-md mx-auto">Your payment couldn't be verified. Please check the payment details and try again, or contact support for assistance.</p>
              <button
                onClick={() => setPaymentStatus('pending')}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  if (paymentStatus === 'approved' || paymentStatus === 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white p-4">
        <div className="max-w-3xl w-full">
          {renderStatusMessage()}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h2 className="text-2xl font-bold text-center">
            Complete Your Purchase
          </h2>
        </div>
        
        <div className="p-6">
          {renderStatusMessage()}
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 shadow-sm">
                <h3 className="font-semibold text-blue-800 mb-2 text-lg">Course: {courseName}</h3>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-black text-sm">Price:</p>
                  <p className="text-black font-bold text-lg">₹{courseFees}</p>
                </div>
                <div className="pt-3 border-t border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Payment Instructions:</h4>
                  <ol className="list-decimal list-inside text-sm text-black space-y-2 ml-2">
                    <li>Make a transfer to our bank account</li>
                    <li>Save the transaction confirmation/receipt</li>
                    <li>Upload the screenshot below</li>
                    <li>Enter the transaction ID and submit</li>
                  </ol>
                </div>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200 shadow-sm">
                <h3 className="font-semibold text-yellow-800 mb-3 text-lg">Bank Details</h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm text-black">Account Name:</span>
                    <span className="font-mono text-sm text-black">Web Academy LLC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-sm text-black">Account Number:</span>
                    <span className="font-mono text-sm text-black">0123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-sm text-black">Bank Name:</span>
                    <span className="font-mono text-sm text-black">Global Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-sm text-black">IFSC Code:</span>
                    <span className="font-mono text-sm text-black">GBAC0001234</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
                <label className="block text-sm font-medium text-black mb-2">
                  Upload Payment Screenshot/Receipt <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <div className="absolute right-3 top-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                {paymentScreenshot && 
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-600 text-sm">
                      File selected: {paymentScreenshot.name}
                    </p>
                  </div>
                }
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
                <label className="block text-sm font-medium text-black mb-2">
                  Transaction ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Enter transaction ID"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <div className="absolute right-3 top-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
                <label className="block text-sm font-medium text-black mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information about your payment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                />
              </div>
              <div className="flex flex-col space-y-3 mt-8">
              <button
                onClick={createPayment}
                // disabled={loading || !transactionId || !paymentScreenshot || paymentStatus === 'processing' || paymentStatus === 'pending_approval'}
                className={`w-full px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium shadow-sm ${
                  (loading || !transactionId || !paymentScreenshot || paymentStatus === 'processing' || paymentStatus === 'pending_approval') 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
              Submit Payment Details
              </button>
              {paymentStatus === 'pending' && (
                <button
                  onClick={() => router.back()}
                  className="w-full px-6 py-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 font-medium shadow-sm"
                >
                  Cancel
                </button>
              )}
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;