"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Wait until the session status is not "loading"
    if (
      status === "unauthenticated" ||
      (status === "authenticated" && session?.user?.role !== "ORGANIZER")
    ) {
      router.push("/auth/login");
    }
  }, [status, router, session?.user?.role]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else {
    return <div>Organizer page</div>;
  }
}
