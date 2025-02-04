"use client"

import { IEvents } from "@/app/interfaces/event.interface";
import axiosInstance from "@/app/utils/axios.helper";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default async function DashboardMain() {
  
  const [event, setEvents] = useState<IEvents[]>([])
  const getEvents = async() => {
    try {

      const res = await axiosInstance.get('/organizer/events')
      console.log(res.data)
      setEvents(res.data)
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getEvents()
  }, [])

  return (
    <div className="p-5 w-full min h-screen flex flex-col gap-5">
      <h1 className="text-2xl font-bold">
        Welcome Back, ijsamika
      </h1>
      <div className="grid grid-cols-3 gap-5 h-[150px]">
        <div className="border bg-gray-50 rounded-lg p-5 shadow-md">
          <p className="text-start">Total Events</p>
          <p className="text-7xl text-green-600 font-bold text-center font-serif">
            55
          </p>
        </div>
        <div className="border bg-gray-50 rounded-lg p-5 shadow-md">
          <p className="text-start">Total Ticket Sold</p>
          <p className="text-7xl text-red-600 font-bold text-center font-serif">
            55
          </p>
        </div>
        <div className="border bg-gray-50 rounded-lg p-5 shadow-md">
          <p className="text-start">Total Attendee</p>
          <p className="text-7xl text-blue-600 font-bold text-center font-serif">
            55
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg border h-[420px] p-5 shadow-md">
        <div className="flex gap-5 justify-between p-2">
          Graphical
          <div className="flex gap-1 text-sm">
            <select className="border bg-gray-100 rounded-lg hover:cursor-pointer">
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
            <select className="border bg-gray-100 rounded-lg hover:cursor-pointer">
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
            <select className="border bg-gray-100 rounded-lg hover:cursor-pointer">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
          </div>
        </div>

        <div></div>

        {/* chart */}
      </div>
    </div>
  );
}
