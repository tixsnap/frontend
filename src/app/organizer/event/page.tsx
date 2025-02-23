"use client";

import React, { useEffect, useState } from "react";
import Table from "@/components/event/Table";
import Popup from "@/components/Popup";
// import Image from "next/image";
import { useEventStore } from "@/app/store/eventStore";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Skeleton from "@/components/event/Skeleton";
import ListNotFound from "@/components/event/ListNotFound";

export default function page() {
  const { events, getEvents, loading } = useEventStore();
  const [isSearch, setIsSearch] = useState<string>("")
  
  useEffect(() => {
      const delayDebounce = setTimeout(() => {
        getEvents(isSearch);
      }, 1000);
    
      return () => clearTimeout(delayDebounce);
  }, [isSearch]);

  useEffect(()=> {
    getEvents()
  }, [])

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50">
      <Popup />
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center border mb-5 bg-white rounded-lg w-[500] pl-5 text-sm">
          <CiSearch/>
          <input className="p-2 w-full focus-within:outline-none" placeholder="Search event name" onChange={e => setIsSearch(e.target.value)}/>
        </div>
        <div className="flex gap-2">
          <Link href={"new"} className="text-xs p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">New Event</Link>
          <Link href={"vouchers"} className="text-xs p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Create Voucher</Link>
        </div>
      </div>
      {
        loading? <Skeleton/> : events.length > 0 ? <Table events={events} /> : <ListNotFound image="/eventnotfound.webp"/>
      }

    </div>
  );
}
