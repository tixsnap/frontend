"use client";

import { useEventStore } from "@/app/store/eventStore";
import axiosInstance from "@/app/utils/axios.helper";
import Popup from "@/components/Popup";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function page() {
  const {transactions, getTransactions} = useEventStore()

  const handleSetStatus = async (txId: string, status: string) => {
    try {
      const res = await axiosInstance.patch(`/tx/${txId}`, {
        status,
        id: txId,
      });
      toast.success("Payment Status Updated");
      getTransactions()
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    getTransactions()
  }, []);

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50 fixed">
      <div className="w-full h-[calc(100vh-120px)]">
        <Popup />
        <div className="overflow-x-auto overflow-y-auto bg-white rounded-lg shadow h-full">
          <table className="w-full min-w-[1200px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total Ticket
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total Payment
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Payment Proof
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.length > 0 &&
                transactions.map((_, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {_.event.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {_.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        value={_.status}
                        onChange={(e) => handleSetStatus(_.id, e.target.value)}
                        className="border border-gray-300 p-2 rounded-md"
                      >
                        <option value="DONE">DONE</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="WAITING_FOR_CONFIRMATION">
                          WAITING_FOR_CONFIRMATION
                        </option>
                        <option value="WAITING_PAYMENT">WAITING_PAYMENT</option>
                        <option value="EXPIRED">EXPIRED</option>
                        <option value="CANCELED">CANCELED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(_.createdAt)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .split("/")
                        .join("-")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(_.validUntilPaymentProof)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .split("/")
                        .join("-")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {_.event.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {_.totalTicket}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {_.totalPayment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {_.paymentProof.paymentPicture &&
                      _.paymentProof.paymentPicture?.length > 10 ? (
                        <Link
                          href={_.paymentProof.paymentPicture}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-500 italic"
                        >
                          View Proof
                        </Link>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}