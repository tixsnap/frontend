"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useEventStore } from "@/app/store/eventStore";
import defaultImage from "../../public/event-unknown.jpg";
import { useState } from "react";
import Link from "next/link";

const EventList = () => {
  const { getEventsByParams, getEventsUser, events } = useEventStore();
  // const queryParams = params?.toString();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const categories = [
    "All Categories",
    "MUSIC",
    "SPORTS",
    "TECH",
    "BUSINESS",
    "ART",
  ];

  const locations = [
    "All Locations",
    "Prambanan",
    "Bali",
    "Jakarta",
    "Yogyakarta",
    "Online",
  ];
  const HandleSearch = () => {
    const param = `name=${searchQuery}&category=${selectedCategory}&location=${selectedLocation}`;
    getEventsByParams(param);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      HandleSearch();
    }
  };

  useEffect(() => {
    getEventsUser();
  }, []);

  // if (queryParams) {
  // const params = new URLSearchParams(queryParams);
  // const searchParams = Object.fromEntries(params);

  console.log("rendering events:", events);

  return (
    <div className="sm:px-40 lg:px-20" style={{ backgroundColor: "#252A34" }}>
      <div style={{ backgroundColor: "#252A34" }} className="px-40 pt-12 pb-32">
        <div
          className="px-6 py-6 flex justify-between gap-8 border-2 border-white rounded-3xl"
          style={{ backgroundColor: "#252A34" }}
        >
          <div className="flex-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="     Search events..."
              className="w-full py-1.5 bg-white font-semibold rounded-xl transition-transform duration-200 hover:scale-110"
            />
          </div>

          <div className="flex-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 bg-white rounded-xl font-medium text-center transition-transform duration-200 hover:scale-110"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-auto">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-2 border-white rounded-xl font-medium text-center transition-transform duration-200 hover:scale-110"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={HandleSearch}
            className="px-2 bg-teal-300 rounded-xl w-28 font-bold transition-transform duration-200 hover:scale-110"
          >
            Search
          </button>
        </div>
      </div>
      <h2 className="pt-9 text-left text-4xl font-bold  text-teal-300 mb-12 pl-5">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events &&
          events.slice(0, 6).map((event) => (
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
                  <Link href={`/events/${event.slug}`}>{event.name}</Link>
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
  // } else {
  // If there are no query parameters, redirect to a different page or render a different component
  // return <div>{`nothing found ${queryParams}`}</div>;
  // }
};

export default EventList;
