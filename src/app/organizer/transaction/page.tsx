"use client";

import { useEventStore } from "@/app/store/eventStore";
import axiosInstance from "@/app/utils/axios.helper";
import ListNotFound from "@/components/event/ListNotFound";
import Skeleton from "@/components/event/Skeleton";
import Popup from "@/components/Popup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";

export default function page() {
  const {transactions, getTransactions, loading} = useEventStore()
  const [isSearch, setIsSearch] = useState<string>("")

  const handleSetStatus = async (txId: string, status: string) => {
    try {
      await axiosInstance.patch(`/tx/${txId}`, {
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
    const delayDebounce = setTimeout(() => {
      getTransactions(isSearch);
    }, 500);
  
    return () => clearTimeout(delayDebounce);
  }, [isSearch]);
  
  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50 fixed">
      <div className="flex items-center justify-between">

      <div className="flex gap-2 items-center border mb-5 bg-white rounded-lg w-[500] pl-5 text-sm  ">
        <CiSearch/>
        <input className="p-2 w-full focus-within:outline-none" placeholder="Search transactions by customer" onChange={e => setIsSearch(e.target.value)}/>
      </div>
      <Link href={"transaction/history"} className="p-2 rounded-lg bg-gray-600 text-white text-xs hover:bg-gray-700">
        View History
      </Link>
      </div>
      <div className="w-full h-[580]">
        <Popup />
        <div className="overflow-x-auto overflow-y-auto bg-white rounded-lg shadow h-full">

          {
            loading? (<Skeleton/>) : (<table className="w-full min-w-[1200px] divide-y divide-gray-200">
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions && transactions.length > 0 &&
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
                          .join("-").replace(/-/g, "/")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(_.validUntilConfirmation)
                          .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .split("/")
                          .join("-").replace(/-/g, "/")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {`Rp ` + (_.event.price).toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {_.totalTicket}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {`Rp ` + (_.totalPayment).toLocaleString('id-ID')}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-2">
                        {(
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSetStatus(_.id, "DONE")}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleSetStatus(_.id, "REJECTED")}
                              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                            >
                              Reject
                            </button>
                          </div>
                          )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>)
          }
          
        </div>
      </div>
    </div>
  );
}