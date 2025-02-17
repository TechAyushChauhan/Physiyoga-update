'use client'
import React, { useEffect, useState } from 'react';
import { Search, Filter, MoreVertical, Download, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import LoginNavbar from "../Components/loginnavbar/page";

const AdminPaymentDashboard = () => {
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchPayments = async () => {
    try {
      const response = await fetch(`/api/approve`);
      if (!response.ok) {
        throw new Error("Failed to fetch payment data");
      }
      const resultData = await response.json();
      setPaymentRequests(resultData?.data || []);
      console.log(resultData.data, "fetched data");
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      // Determine the endpoint based on the status
      const endpoint = newStatus === 'approved' 
        ? `/api/approve` 
        : `/api/reject`;
  
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          _id: requestId,
          status: newStatus
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${newStatus} payment`);
      }
  
      // Update local state
      setPaymentRequests(requests =>
        requests.map(request =>
          request._id === requestId
            ? { ...request, status: newStatus }
            : request
        )
      );
      setSelectedRequest(null);
      
      // Show success message
      alert(`Payment ${newStatus} successfully`);
      
      // Refresh the data
      fetchPayments();
    } catch (error) {
      console.error(`Error ${newStatus} payment:`, error);
      alert(`Failed to ${newStatus} payment. Please try again.`);
    }
  };

  const handleDownload = (photoUrl) => {
    if (photoUrl.includes('s3.eu-north-1.amazonaws.com')) {
      window.open(photoUrl, '_blank');
    } else {
      window.open(`http://localhost:3000${photoUrl}`, '_blank');
    }
  };

  const filteredRequests = paymentRequests.filter(request => {
    const matchesSearch = 
      (request.username?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (request.transactionId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (request._id?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <LoginNavbar />

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Payment Requests Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg shadow">
          <div className="flex gap-4 items-center flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, ID, transaction..."
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

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction_ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User_ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Proof</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled_Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request._id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.transactionId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDownload(request.photo)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.additionalNotes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.courseName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.pay}</div>
                  </td>
                 
<td className="px-6 py-4 whitespace-nowrap">
  <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${
    request.status === 'approved'
      ? 'text-green-800 bg-green-100'
      : request.status === 'rejected'
      ? 'text-red-800 bg-red-100'
      : 'text-blue-800 bg-blue-100'
  }`}>
    {request.status || 'pending..'}
  </span>
</td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleStatusChange(request._id, 'approved')}
                        className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 p-2 rounded-full"
                        title="Approve"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(request._id, 'rejected')}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-full"
                        title="Reject"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-gray-400 hover:text-gray-500 bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
                        title="More details"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.username}</p>
                      <p className="text-sm text-gray-500">{selectedRequest.userEmail}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Course Information</h3>
                      <p className="mt-1 text-sm text-gray-900">{selectedRequest.courseName}</p>
                      <p className="text-sm text-gray-500">ID: {selectedRequest._id}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Transaction Details</h3>
                    <p className="mt-1 text-sm text-gray-900">Transaction ID: {selectedRequest.transactionId}</p>
                    <p className="text-sm text-gray-900">Fee Amount: {selectedRequest.pay}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Proof</h3>
                    <div className="mt-1">
                      <img
                        src={selectedRequest.photo.includes('s3.eu-north-1.amazonaws.com') 
                          ? selectedRequest.photo 
                          : `http://localhost:3000${selectedRequest.photo}`}
                        alt="Payment Proof"
                        className="max-h-48 w-auto object-contain rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Additional Notes</h3>
                    <p className="mt-1 text-sm text-gray-900">{selectedRequest.additionalNotes || 'No additional notes provided'}</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => handleStatusChange(selectedRequest._id, 'approved')}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Approve Payment
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest._id, 'rejected')}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Reject Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPaymentDashboard;