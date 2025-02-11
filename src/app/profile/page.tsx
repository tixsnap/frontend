import React from "react";
import { User, CheckCircle, XCircle, Clock } from "lucide-react";
import Image from "next/image";

const UserProfile = () => {
  // TODO: ganti data dummy dengan prisma
  const user = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    profilePicture: null,
    totalPoints: 1250,
    transactions: [
      {
        id: 1,
        totalPayment: 150.0,
        status: "completed",
        validUntil: "2025-03-09",
        validUntilConfirmation: true,
        createdAt: "2025-02-01",
        updatedAt: "2025-02-01",
        eventId: "EVT001",
        totalTickets: 2,
      },
      {
        id: 2,
        totalPayment: 75.0,
        status: "pending",
        validUntil: "2025-04-15",
        validUntilConfirmation: false,
        createdAt: "2025-02-08",
        updatedAt: "2025-02-08",
        eventId: "EVT002",
        totalTickets: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col items-center">
            {user.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="Profile"
                width={24}
                height={24}
                className="rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <div className="mt-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {user.totalPoints} Points
              </span>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#252A34] rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-white">
              Transaction History
            </h2>
          </div>
          <div className="overflow-x-auto overflow-y-auto border-gray-500 border-2">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valid Until
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {user.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.eventId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${transaction.totalPayment.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status === "completed" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        {transaction.validUntil}
                        {transaction.validUntilConfirmation ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.totalTickets}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
