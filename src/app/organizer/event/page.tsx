"use client";

import { IEvents } from "@/app/interfaces/event.interface";
import axiosInstance from "@/app/utils/axios.helper";
import React, { useEffect, useState } from "react";

import Table from "@/components/event/Table";
import Popup from "@/components/Popup";
import Image from "next/image";

export default function page() {
  const [events, setEvents] = useState<IEvents[]>([]);

  const fetchEvents = async () => {
    try {
      const res = await axiosInstance.get("/organizer/events");
      setEvents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50 fixed">
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
