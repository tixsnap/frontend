"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios.helper";
import { useRouter, useSearchParams } from "next/navigation";
import SuccessVerify from "@/components/SuccessVerify";
import FailedVerify from "@/components/FailedVerify";
import { toast } from "react-toastify";
import Popup from "@/components/Popup";

export default function page() {
  const [isVerified, setIsverified] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const verifyAccount = async () => {
    try {
      const res = await axiosInstance.post(`/auth/verify/${token}`);
      if (res.status == 200) setIsverified(!isVerified);
      toast.success("Redirecting to login page");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return (
    <div>
      <Popup />
      {isVerified ? <SuccessVerify /> : <FailedVerify />}
    </div>
  );
}
