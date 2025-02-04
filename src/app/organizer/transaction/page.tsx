import React from "react";

export default function page() {
  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50 fixed">
      
      <div className="w-full h-[calc(100vh-120px)]">
        <div className="overflow-x-auto overflow-y-auto bg-white rounded-lg shadow h-full">
          <table className="w-full min-w-[1200px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Start</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">End</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Available</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Ticket Sold</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total People</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Ngopag dulu</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp 15,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">11-04-2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15-04-2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 py-1 text-green-800 bg-green-100 rounded-full">20</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jawa Tengah, Prambanan</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 py-1 text-blue-800 bg-blue-100 rounded-full">Music</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 py-1 text-purple-800 bg-purple-100 rounded-full">Paid</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">60</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}