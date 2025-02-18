"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useEventStore } from "@/app/store/eventStore";
import { IEvents } from "@/app/interfaces/event.interface";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const Page: React.FC<IEvents> = ({
  id,
  name,
  ticketType,
  imageUrl,
  description,
  startDate,
  endDate,
  ticketOpen,
  price,
}) => {
  const { getEventBySlugUser, events } = useEventStore();
  const pathname = usePathname();
  const eventSlug = pathname.split("/")[3];

  // const queryParams = params?.toString();

  useEffect(() => {
    getEventBySlugUser(eventSlug);
  }, []);

  // if (queryParams) {
  // const params = new URLSearchParams(queryParams);
  // const searchParams = Object.fromEntries(params);

  console.log("rendering events:", events);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const router = useRouter();

  return (
    <div
      className="max-w-screen mx-auto p-6 min-h-screen"
      style={{ backgroundColor: "#252A34" }}
    >
      {/* Event Header Section */}
      <div className="mb-4 relative">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">{name}</h1>
          <span
            className={`${
              ticketType
                ? "bg-pink-100 text-pink-800"
                : "bg-cyan-100 text-cyan-800"
            } px-4 py-2 rounded-full font-bold text-xl`}
          >
            {ticketType ? "Paid Event" : "Free Event"}
          </span>
        </div>

        {/* Event Image Section */}
        <div className="mb-8">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`${name} banner`}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
            width={1200} // width of the image
            height={600} // height of the image
          />
        </div>
      </div>

      {/* Event Details Section */}
      <div className="space-y-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Event Details
          </h2>
          <p className="text-gray-600 mb-6">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-medium">Start Date:</p>
              <p className="text-gray-600">{formatDate(startDate)}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">End Date:</p>
              <p className="text-gray-600">{formatDate(endDate)}</p>
            </div>
          </div>
        </div>

        {/* Ticket Info Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Ticket Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-medium">Available Seats:</p>
              <p
                className={`text-lg ${
                  ticketOpen < 50 ? "text-red-600" : "text-green-600"
                }`}
              >
                {ticketOpen} seats remaining
              </p>
            </div>
            {ticketType && (
              <div>
                <p className="text-gray-700 font-medium">Price per Ticket:</p>
                <p className="text-lg text-blue-600">${price?.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col md:flex-row gap-9 w-full items-center justify-center">
        <button
          className="px-6 py-3 text-white text-xl font-bold rounded-3xl transition-transform: duration-200 hover:scale-110"
          style={{ backgroundColor: "#FF2E63" }}
          onClick={() =>
            router.push("/checkout", {
              query: {
                eventId: id,
                originalPrice: price,
                availableSeats: ticketOpen,
              },
            })
          }
        >
          Get Event Ticket
        </button>
        {ticketType && (
          <button className="px-6 py-3 text-lg font-bold bg-cyan-500 text-white rounded-3xl transition-transform: duration-200 hover:scale-110 ">
            Submit Payment Proof
          </button>
        )}
      </div>
    </div>
  );
  // } else {
  // If there are no query parameters, redirect to a different page or render a different component
  // return <div>{`nothing found ${queryParams}`}</div>;
  // }
};

export default Page;
