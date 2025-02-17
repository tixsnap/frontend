"use client"

import React, { useEffect, useState } from "react";
import ButtonMenu from "./ButtonMenu";

import { Sidebar } from "@/app/constant/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const [isActive, setIsActive] = useState<string>("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("profile")) {
      setIsActive("My Profile");
    } else if(pathname.includes("attendee")){
      setIsActive("Attedee List")
    } else if(pathname.includes("event") || pathname.includes("vouchers") || pathname.includes("new")) {
      setIsActive("Event")
    } else if(pathname.includes("transaction")) {
      setIsActive("Transaction")
    }else {
      const matchedItem = Sidebar.find((el) => pathname === el.href);
      setIsActive(matchedItem ? matchedItem.text : "Dashboard");
    }
  }, [pathname]);

  return (
    <div className="w-[210px] bg-gray-200 h-screen text-sm fixed top-0 left-0 rounded-xl">
      <div className="flex justify-center flex-col">
        <div className="bg-blue-500 text-white flex justify-center items-center mb-5 py-[26px] font-bold text-base mx-auto w-full">
          <p className="text-center">TIXSNAP</p>
        </div>

        <div className="flex flex-col gap-1">
          {Sidebar.map((el, _) => (
            <ButtonMenu
              key={_}
              text={el.text}
              href={el.href}
              Icon={el.icon}
              className={`${
                isActive == el.text ? "bg-green-600 text-white" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
