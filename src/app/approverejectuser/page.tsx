'use client'
import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Search, Filter, MoreVertical } from 'lucide-react';
import LoginNavbar from "../Components/loginnavbar/page";
import LoginFooter from "../Components/loginfooter/page";

const AdminPaymentDashboard = () => {
  // Mock payment requests data

  const [paymentRequests, setPaymentRequests] = useState([
   
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
    const fetchCourses = async () => {
      try {
        // console.log(userid.id,"id")
        // let data= `courseId=${courseid}`
        // if (ids!=null) {
        //   console.log(ids,"id")
        //   data=data+`&watchedBy=${ids}`
        // }
        
        const response = await fetch(`/api/approve`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const resultdata = await response.json();
  
        // Check if the response has the playlist structure as expected
        const playlistData = resultdata?.data ||  [];
        setPaymentRequests(playlistData)
       console.log(playlistData,"data")
        // setcoursedet(resultdata?.data[0] || {})
  
        // setPlaylist(playlistData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  

  const handleStatusChange = (requestId, newStatus) => {
    setPaymentRequests(requests =>
      requests.map(request =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );
    setSelectedRequest(null);
  };

  const filteredRequests = paymentRequests.filter(request => {
    const matchesSearch = 
      request.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      //  ||      request.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  useEffect(()=>{
    fetchCourses()
  },[])
  

  return (
    <div className="min-h-screen bg-gray-100">
              <LoginNavbar />

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Course Payment Requests</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters and Search */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg shadow">
          <div className="flex gap-4 items-center flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, email, course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="text-gray-500 text-sm">
            Showing {filteredRequests.length} requests
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                        <div className="text-sm text-gray-500">{request.additionalNotes}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.transactionId}</div>
                    {/* <div className="text-xs text-gray-500">ID: {request.courseId}</div> */}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${request.amount.toFixed(2)}</div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.transactionId}</div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap"> */}
                    {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${request.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {request.status === 'pending' ? (
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleStatusChange(request.id, 'approved')}
                          className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 p-2 rounded-full"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(request.id, 'rejected')}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-full"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="text-gray-400 hover:text-gray-500 bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        {request.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Payment Request Details</h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">User Information</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.userName}</p>
                      <p className="text-sm text-gray-500">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Course Information</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.courseName}</p>
                      <p className="text-sm text-gray-500">ID: {selectedRequest.courseId}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Payment Amount</h3>
                      <p className="mt-1 text-sm text-gray-900">${selectedRequest.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.transactionId}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Screenshot</h3>
                    <div className="mt-1">
                      <img
                        src={selectedRequest.screenshot}
                        alt="Payment Screenshot"
                        className="h-48 w-auto object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedRequest.notes || 'No notes provided'}</p>
                  </div>
                </div>

                {selectedRequest.status === 'pending' && (
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() => handleStatusChange(selectedRequest.id, 'approved')}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Approve Payment
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Reject Payment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminPaymentDashboard;