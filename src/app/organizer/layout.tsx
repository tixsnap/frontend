import React from "react";

import DashboardSidebar from "@/components/event/DashboardSidebar";
import TopBar from "@/components/event/TopBar";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <TopBar />
      <DashboardSidebar />
      {children}
    </div>
  );
}
