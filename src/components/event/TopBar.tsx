"use client";

import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/app/constant/sidebar";
import { useUserStore } from "@/app/store/userStore";

export default function TopBar() {
  const {user, getUserSession} = useUserStore()

  const [headerText, setHeaderText] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    getUserSession();
    if (pathname.includes("profile")) {
      setHeaderText("My Profile");
    } else if(pathname.includes("event")) {
      setHeaderText("Event");
    } else {
      const matchedItem = Sidebar.find((el) => pathname === el.href);
      setHeaderText(matchedItem ? matchedItem.text : "Dashboard");
    }
  }, [pathname]);

  return (
    <div className="ml-[210px] h-[80px] flex justify-end items-center border-b-2 px-10 shadow-2xl rounded-xl">
      <div className="flex items-center w-full gap-5 justify-between">
        <div>
          <p className="font-bold text-xl">{headerText}</p>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-3 items-center">
            <IoIosNotificationsOutline size={28} color="black" />
          </div>
          <div
            className="flex items-center gap-1"
          >
            {/* <Image
              alt="user-image"
              src={"/ijsamika.jpg"}
              width={34}
              height={50}
              className="w-auto h-auto rounded-full object-fill mr-5"
            /> */}
            <div className="flex items-center flex-col">
              <p className="text-sm font-bold">{user?.name}</p>
              <p className="text-xs italic underline">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
