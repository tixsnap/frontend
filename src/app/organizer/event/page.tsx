"use client";

import React, { useEffect } from "react";
import Table from "@/components/event/Table";
import Popup from "@/components/Popup";
import Image from "next/image";
import { useEventStore } from "@/app/store/eventStore";

export default function page() {
  const { events, getEvents } = useEventStore();
  
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50">
      <Popup />
      {events.length > 0 ? (
        <Table events={events} />
      ) : (
        <div className="flex items-center justify-center w-full h-screen -mt-36">
          <Image
            alt="not-found"
            src={"/eventnotfound.webp"}
            width={500}
            priority
            height={500}
            className="w-auto h-auto"
          />
        </div>
      )}
    </div>
  );
}
