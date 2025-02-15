"use client";

import { useEventStore } from "@/app/store/eventStore";
import Popup from "@/components/Popup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function page() {
  const {transactionsHistory, getTransactionsHistory} = useEventStore()
  const [isSearch, setIsSearch] = useState<string>("")

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getTransactionsHistory(isSearch);
    }, 500);
  
    return () => clearTimeout(delayDebounce);
  }, [isSearch]);
  
  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50 fixed">
      <div className="flex items-center justify-between">

      <div className="flex gap-2 items-center border mb-5 bg-white rounded-lg w-[500] pl-5 text-sm  ">
        <CiSearch/>
        <input className="p-2 w-full focus-within:outline-none" placeholder="Search transactions name" onChange={e => setIsSearch(e.target.value)}/>
      </div>
      </div>
      <div className="w-full h-[580]">
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
              {transactionsHistory && transactionsHistory.length > 0 &&
                transactionsHistory.map((_, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-200 ${_.status == "DONE"? "bg-green-100" : "bg-red-100"}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {_.event.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {_.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className={`px-6 text-sm text-gray-900 ${_.status === "REJECTED" ? "text-red-600" : "text-green-600"}`}>
                        {_.status === "REJECTED" ? <p className="text-xl font-bold">REJECTED</p> : <p className="text-xl font-bold">ACCEPTED</p>}
                        </div>                        
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}