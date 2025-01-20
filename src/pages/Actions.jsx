import React, { useState, useEffect } from "react";

const Actions = ({ logs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [activities, setActivities] = useState(logs); // Initialize with logs

  // Fetch activities based on the selected date filter
  const fetchActivities = async (selectedDate) => {
    if (!selectedDate) {
      setActivities(logs); // Reset to original logs if no date is selected
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/Admin/activity?timestamp=${selectedDate}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  // Effect to fetch activities whenever the date filter changes
  useEffect(() => {
    fetchActivities(dateFilter);
  }, [dateFilter]);

  // Filter data based on user, date, and action
  const filteredData = logs.filter((item) => {
    const date = new Date(item.timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const customFormattedDate = `${month}/${day}/${year}`;

    return (
      (userFilter === "" ||
        item.userName.toLowerCase().includes(userFilter.toLowerCase())) &&
      (dateFilter === "" || customFormattedDate === dateFilter) &&
      (actionFilter === "" ||
        item.action.toLowerCase().includes(actionFilter.toLowerCase()))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="overflow-x-auto mt-2">
      {/* Filter Section */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Filter by User"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="border rounded py-2 px-3"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border rounded py-2 px-3"
        />
        <input
          type="text"
          placeholder="Filter by Action"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="border rounded py-2 px-3"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Action</th>
            <th className="py-3 px-6 text-center">Details</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentItems.length > 0
            ? currentItems.map((item, index) => {
                const date = new Date(item.timestamp);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const customFormattedDate = `${month}/${day}/${year}`;

                return (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{item.userName}</td>
                    <td className="py-3 px-6 text-left">
                      {customFormattedDate}
                    </td>
                    <td className="py-3 px-6 text-left">{item.action}</td>
                    <td className="py-3 px-6 text-center">{item.details}</td>
                  </tr>
                );
              })
            : <tr><td colSpan="5" className="text-center py-3">No activities found</td></tr>}
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
  );
};

export default Actions;