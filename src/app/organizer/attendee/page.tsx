"use client";

import { useEventStore } from "@/app/store/eventStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NoImage from "../../../../public/event-unknown.jpg";
import { CiSearch } from "react-icons/ci";

export default function page() {
  const { events, getEvents } = useEventStore();
  const [isSearch, setIsSearch] = useState<string>("");
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getEvents(isSearch);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [isSearch]);

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50">
      <div className="flex gap-2 items-center border mb-5 bg-white rounded-lg w-[500] pl-5 text-sm  ">
        <CiSearch />
        <input
          className="p-2 w-full focus-within:outline-none"
          placeholder="Search event name"
          onChange={(e) => setIsSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 gap-5">
        {events.length > 0 &&
          events.map((el, _) => (
            <Link
              href={`attendee/` + el.slug}
              key={_}
              className="p-5 shadow-lg rounded-lg hover:cursor-pointer hover:scale-105 transition-all text-center"
            >
              <Image
                src={el.imageUrl || NoImage}
                alt={el.name}
                width={500}
                height={500}
                className="w-[250] h-[200] rounded-xl mb-2 object-cover"
                priority
              />
              {el.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
