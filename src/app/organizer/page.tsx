"use client";

import { EventChartYearly, MostEventAttended, MostEventSold } from "@/components/event/Chart";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { useEventStore } from "../store/eventStore";
import { useRouter } from "next/navigation";
import { StatCard } from "@/components/event/Stats";

export default function Page() {
  const { user, getUserSession } = useUserStore();
  const {
    events,
    getEvents,
    totalTransaction,
    getTransactions,
    totalAttendee,
    totalTicketSold,
    calculateTotals,
    transactions
  } = useEventStore(); 

  const [filterType, setFilterType] = useState("yearly");
  const router = useRouter();

  const fetchEvents = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    if (filterType === "yearly") {
      await getEvents(undefined, year);
      await getTransactions(undefined, year);
    } else if (filterType === "monthly") {
      await getEvents(undefined, year, month);
      await getTransactions(undefined, year, month);
    } else if (filterType === "day") {
      await getEvents(undefined, year, month, day);
      await getTransactions(undefined, year, month, day);
    }

    calculateTotals()
  };

  const fetchData = async () => {
    await getUserSession();
    await fetchEvents();
    // await getTransactions();
    calculateTotals();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [filterType]);

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50">
      <div className="p-5 w-full min-h-screen flex flex-col gap-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Welcome Back, {user?.name}</h1>
          <select
            className="border bg-gray-100 p-2 rounded-lg hover:cursor-pointer"
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="day">Daily</option>
          </select>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-3 gap-5 min-h-[150px]">
          <StatCard 
            title="Total Revenue" 
            value={`${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transactions.reduce((sum, tx) => sum + tx.totalPayment, 0)).replace(",00", "")}`} 
            className="flex items-center justify-center text-3xl pt-5"
          />
          <StatCard title="Events" value={events.length} className="text-5xl pt-3"/>
          {/* <StatCard title="Ticket Sold" value={totalTicketSold} className="text-5xl pt-3"/> */}
          <StatCard title="Transactions" value={totalTransaction} className="text-5xl pt-3"/>
          {/* <StatCard title="Attendees" value={totalAttendee} className="text-7xl"/> */}
        </div>

        {/* Charts Section */}
        <div className="bg-gray-50 rounded-lg border min-h-screen p-5 shadow-md">
          <div className="py-5 flex flex-col gap-5">
            {/* <EventChartYearly /> */}
            <div className="grid grid-cols-2 gap-5">
              {events.length > 0 && (
                <MostEventSold
                  key="most-event-sold-all-time"
                  labels={events.map((el) => el.name)}
                  dataset={events.map((el) => Number(el.ticketSold))}
                />
              )}
              {events.length > 0 && (
                <MostEventAttended
                  key="most-event-attended-all-time"
                  labels={events.map((el) => el.name)}
                  dataset={events.map((el) => Number(el.totalAttendee))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
