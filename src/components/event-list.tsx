"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useEventStore } from "@/app/store/eventStore";
import defaultImage from "../../public/event-unknown.jpg";

// const handleKeyPress = (e: React.KeyboardEvent) => {
//   if (e.key === "Enter") {
//     handleSearch();
//     getEventsByParams(handleSearch);
//   }
// };

const EventList = () => {
  const { getEventsUser, events } = useEventStore();

  useEffect(() => {
    getEventsUser();
  }, []);

  console.log("events:", events);

  return (
    <div className="sm:px-40 lg:px-20" style={{ backgroundColor: "#252A34" }}>
      <h2 className="text-left text-4xl font-bold  text-teal-300 mb-12 pl-5">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.slice(0, 6).map((event) => (
          <article
            key={event.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-32">
              <Image
                src={event.imageUrl || defaultImage}
                alt={event.name}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded text-sm">
                {new Date(event.startDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {event.name}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {event.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default EventList;
