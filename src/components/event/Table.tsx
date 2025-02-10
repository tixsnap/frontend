import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { IEvents } from "@/app/interfaces/event.interface";
import axiosInstance from "@/app/utils/axios.helper";
import { toast } from "react-toastify";
import Image from "next/image";
import NoImage from "../../../public/event-unknown.jpg"
import Link from "next/link";

export default function Table({ events }: { events: IEvents[] }) {
  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure to delete this event?")
    if(isConfirmed){
      try {
        await axiosInstance.patch(`/organizer/events/delete/${id}`);
        toast.warning("Event has been deleted");
        setTimeout(()=> {
          window.location.reload()
        }, 1000)
      } catch (error) {
        console.log(error);
      }
    }else{
      toast.info("Event delete cancelled")
    }
  };

  return (
    <div className="overflow-x-auto overflow-y-auto bg-white rounded-lg shadow h-full min-h-[640]">
      <table className="w-full min-w-[1200px] divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Name",
              "Photos",
              "Price",
              "Start",
              "End",
              "Location",
              "Category",
              "Type",
              "Available",
              "Sold",
              "Action",
            ].map((el, _) => (
              <TableHead text={el} key={_} />
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableRow text={event.name} />
              <td
                className={`px-5 text-start pl-5 py-6 whitespace-nowrap text-sm border-b text-gray-900`}
              >
                <Image src={event.imageUrl || NoImage} alt="event-logo" width={500} height={500} className="rounded-full w-[200] h-[80] object-cover"/>
              </td>
              
              <TableRow
                text={new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
                  .format(event.price)
                  .replace(",00", "")}
              />
              <TableRow
                text={
                  new Date(event.startDate)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("-")
                  // .toUTCString()
                  // .replace("00:00:00 GMT", "")
                }
              />
              <TableRow
                text={
                  new Date(event.endDate)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .split("/")
                    .join("-")
                  // .toUTCString()
                  // .replace("00:00:00 GMT", "")
                }
              />
              <TableRow text={event.location} />
              <td className="px-6 text-center pl-2 py-4 whitespace-nowrap text-sm border-b text-gray-900">
                {
                  event.category? 
                  <span className="px-2 py-1 text-blue-800 bg-blue-100 rounded-full">
                  {event.category}
                </span> : ""
                }
              </td>
              <td className="px-6 text-center pl-2 py-4 whitespace-nowrap text-sm border-b text-gray-900">
                <span className="px-2 py-1 text-purple-800 bg-purple-100 rounded-full">
                  {event.ticketType}
                </span>
              </td>
              <td className="px-6 text-center pl-2 py-4 whitespace-nowrap text-sm border-b text-gray-900">
                <span className="px-2 py-1 text-green-800 bg-green-100 rounded-full">
                  {event.availableSeat}
                </span>
              </td>
              <TableRow
                className="text-center"
                text={event.ticketSold == null ? 0 : event.ticketSold}
              />
              <td className="px-6 text-center py-4 whitespace-nowrap text-sm border-b text-gray-900">
                <button
                  onClick={() => handleDelete(event.id)}
                  className="px-2 py-1 text-white mr-1 bg-red-500 rounded-lg"
                >
                  Delete
                </button>
                <Link href={`/organizer/event/${event.slug}`}>
                  <button className="px-2 py-1 text-white bg-blue-500 rounded-lg">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
