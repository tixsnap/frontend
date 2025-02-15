"use client";

import { EventChartYearly, MostEventAttended, MostEventSold } from "@/components/event/Chart";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { useEventStore } from "../store/eventStore";

export default function Page() {
  const {user, getUserSession} = useUserStore()
  const {events, getEvents, calculateTotals, totalTransaction, getTransactions, totalAttendee, totalTicketSold} = useEventStore()
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  }

  useEffect(() => {
    getUserSession()
    getEvents();
    const fetchTransactions = async () => {
      await getTransactions(); 
      calculateTotals(); 
  };
  fetchTransactions();
  }, []);

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50">
      <div className="p-5 w-full min-h-screen flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Welcome Back, {user?.name}</h1>
        <div className="grid grid-cols-4 gap-5 h-[150px]">
          <div className="border bg-gray-50 rounded-lg p-5 shadow-md">
            <p className="text-start">Events</p>
            <p className="text-7xl text-black font-bold text-center font-serif">
              {events.length > 0 ? events.length : 0}
            </p>
          </div>
          <div className="border bg-gray-50 rounded-lg p-5 shadow-md">
            <p className="text-start">Ticket Sold</p>
            <p className="text-7xl text-black font-bold text-center font-serif">
              {
                totalTicketSold
              }
            </p>
          </div>
          <div className="border bg-gray-50 rounded-lg p-5 shadow-md">
            <p className="text-start">Transactions</p>
            <p className="text-7xl text-black font-bold text-center font-serif">
              {
                totalTransaction
              }
            </p>
          </div>
          <div className="border bg-gray-50 rounded-lg p-5 shadow-md">
            <p className="text-start">Attendees</p>
            <p className="text-7xl text-black font-bold text-center font-serif">
              {
                totalAttendee
              }
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg border min-h-screen p-5 shadow-md">
          <div className="flex gap-5 justify-end p-2">
            <div className="flex gap-1 text-sm">
              <select className="border bg-gray-100 p-2 rounded-lg hover:cursor-pointer">
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
          <div className="py-5 flex flex-col gap-5">
          <EventChartYearly/>

          <div className="grid grid-cols-2 gap-5">
            {
              events.length > 0 &&
              <MostEventSold
                key="most-event-sold-all-time"
                labels={events.map((el) => el.name)}
                dataset={events.map((el) => Number(el.ticketSold))} 
              />
            }
          
          {
              events.length > 0 &&
              <MostEventAttended
                key="most-event-attended-all-time"
                labels={events.map((el) => el.name)}
                dataset={events.map((el) => Number(el.totalAttendee))} 
              />
            }
          </div>
          {/* <EventChartMonthly/> */}
          </div>


          {/* chart */}
        </div>
      </div>
    </div>
  );
}
