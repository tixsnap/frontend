"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero";
import EventSearch from "@/components/event-search";
import EventList from "@/components/event-list";
import EventDetailPage from "./event-detail/page";

export default function Home() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait until the session status is not "loading"
    if (status === "authenticated" && session?.user?.role !== "CUSTOMER") {
      router.push("/organizer");
    }
  }, [status, router, session?.user?.role]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Navbar />
        <HeroSection />
        <EventSearch />
        <EventList />
        <EventDetailPage
          eventName="Annual Music Festival"
          imageUrl="placeholder.svg"
          isPaidEvent={true}
          description="Join us for the biggest music event of the year..."
          startDate="2024-07-15"
          endDate="2024-07-17"
          availableSeats={150}
          price={69.69}
        />
      </div>
    );
  }
}
