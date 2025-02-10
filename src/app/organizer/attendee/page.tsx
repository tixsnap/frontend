"use client";

import { useEventStore } from "@/app/store/eventStore";
import Link from "next/link";
import React, { useEffect } from "react";

export default function page() {
  const { events, getEvents } = useEventStore();
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50 fixed">
      <div className="flex flex-col gap-2">
        {events.length > 0 &&
          events.map((el, _) => (
            <Link
              href={`attendee/` + el.slug}
              key={_}
              className="p-5 bg-gray-100 rounded-lg hover:cursor-pointer hover:scale-105 transition-all"
            >
              {el.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
