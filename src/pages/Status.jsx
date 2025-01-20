import React, { useState } from "react";

const Status = ({ users,fetchusers }) => {
  console.log(users);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/Admin/users/approve/${id}`, {
        method: 'PATCH', // Use PATCH to update the user status
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to approve user');
      }
  
      const data = await response.json();
      console.log(data.message); // Log the success message
      await fetchusers();; // Call the function to refresh users after approval
    } catch (error) {
      console.error(`Error approving item with ID: ${id}`, error);
    }
  };

  const handleDisapprove = (id) => {
    console.log(`Disapproved item with ID: ${id}`);
  };

  const handleSettle = (id) => {
    console.log(`Settled item with ID: ${id}`);
  };

  const handleBan = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/Admin/users/ban/${id}`, {
        method: 'PATCH', // Assuming the API uses PATCH for updating the user status
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to ban user');
      }
  
      const data = await response.json();
      console.log(data.message); // Log the success message
      await fetchusers();
    } catch (error) {
      console.error(`Error banning item with ID: ${id}`, error);
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Approve</th>
              <th className="py-3 px-6 text-center">Ban</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{index + 1}</td>
                <td className="py-3 px-6 text-left">{item.username}</td>
                <td className="py-3 px-6 text-left">{item.email}</td>

                <td className="py-3 px-6 text-left">{item.role}</td>
                <td className="py-3 px-6 text-center">
                  {item.active && !item.pendingApproval ? (
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                      disabled
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Approve
                    </button>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {!item.active && !item.pendingApproval ? (
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded mr-2"
                      disabled
                    >
                      Banned
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBan(item._id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Ban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Status;
