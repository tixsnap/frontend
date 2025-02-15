"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import UnknownEvent from "../../../../../public/event-unknown.jpg";
import { usePathname } from "next/navigation";
import { useEventStore } from "@/app/store/eventStore";

export default function page() {
  const {attendees, getAttendeeListByParams, event, getEventBySlug} = useEventStore()
  const pathname = usePathname();
  const query = pathname.split("/")[3];

  useEffect(() => {
    getAttendeeListByParams(query)
    getEventBySlug(query)
  }, []);

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-[url(/layer_bg_main.webp)] fixed">
      <div className="p-6 shadow-xl bg-gray-100 rounded-lg min-h-[500]">
        <div className="grid grid-cols-2">
          <div className="flex flex-col min-h-[580] gap-2">
            <h1 className="text-2xl mb-5">
              {query.replace("-", " ").toUpperCase()}
            </h1>

            <Image
              src={
                attendees.length > 0 && attendees[0].event.imageUrl
                  ? attendees[0].event.imageUrl
                  : UnknownEvent
              }
              alt="event-photo"
              className="rounded-lg h-[500] object-cover w-[600]"
              width={500}
              height={500}
            />
          </div>

          <div className="pt-5">
            <p className="flex justify-end mx-8 text-sm"> Total Seat Remains : <strong>{event?.availableSeat}</strong></p>
            <div className="w-[500px] h-[500px] mt-5 bg-gray-100 shadow-lg rounded-md flex mx-auto p-5 flex-col overflow-y-scroll transition-all">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-2">Attendee</th>
                    <th className="text-left p-2">Ticket</th>
                    <th className="text-left p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.length > 0 &&
                    attendees.map((el, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-2">
                          {el.user.email.length > 25
                            ? el.user.email.slice(0, 25) + "..."
                            : el.user.email}
                        </td>
                        <td className="p-2">{el.totalTicket}</td>
                        <td className="p-2">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                            .format(el.totalPayment)
                            .replace(",00", "")}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
