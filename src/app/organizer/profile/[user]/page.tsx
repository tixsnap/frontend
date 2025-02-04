"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/app/utils/axios.helper";
import { toast } from "react-toastify";
import { CiImageOn } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";

import Input from "@/components/atom/Input";
import Popup from "@/components/Popup";
import { getSession } from "next-auth/react";
import { User } from "next-auth";
import { useFormik } from "formik";
import NoAvatar from "../../../../../public/unknown_profile.jpg"

export default function page() {
  const [email, setEmail] = useState<string>("hanamonik4@gmail.com");
  const [user, setUser] = useState<User>()
  const [isReset, setIsReset] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      first_name: "",
      last_name: "",
      profile_picture: ""
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })
  

  const getUserSession = async() => {
    try {
      const user = await getSession()
      setUser(user?.user)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleForgotPassword = async () => {
    try {
      const res = await axiosInstance.post(`/auth/forgot-password`, {
        email: email,
      });
      toast.success("Link reset-password has been sent to your email");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    getUserSession()
  }, [])

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50">
      <Popup />
      <div className="p-5 flex gap-5 items-center">
        <div className="relative w-[150px] h-[150px]">
          <Image
            src={user?.image || NoAvatar}
            alt="photo-profile"
            priority
            // width={500}
            // height={500}
            fill
            sizes="150px"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3">
          <button className="h-[40px] px-4 rounded-xl border flex items-center gap-2 text-sm hover:bg-blue-500 hover:text-white">
            <CiImageOn />
            Change
          </button>
          <button className="h-[40px] px-4 rounded-xl border flex items-center gap-2 text-sm bg-red-200 text-white hover:bg-red-600">
            <CiImageOn />
            Remove
          </button>
        </div>
      </div>
      <div className="p-5 flex w-full">
        <form className="flex flex-col w-2/3 gap-5">
          <div>
            <label className="text-sm">First Name</label>
            <Input 
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input 
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            />
          </div>
          <div>
            <label className="text-sm">Username</label>
            <Input 
            name="name"
            value={user?.name || ''}
            classname="text-gray-400"
            disabled={true}
            onChange={formik.handleChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              classname="text-gray-400"
              value={user?.email || ''}
              placeholder="example@mail.com"
              disabled={true}
            />
          </div>
          <div>
            <label className="text-sm">Referral Code</label>

            <div className="flex items-center gap-3">
              <Input
                disabled={true}
                placeholder={user?.referral || ''}
                classname="referral"
              />
              <IoCopyOutline className="hover:cursor-pointer" />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <button className="h-[40px] px-8 rounded-xl border flex items-center gap-2 text-sm hover:bg-blue-300 hover:text-white">
                Cancel
              </button>
              <button className="h-[40px] px-8 rounded-xl border items-center gap-2 text-sm bg-blue-300 text-white hover:bg-blue-600">
                Update
              </button>
            </div>
            <button
              onClick={handleForgotPassword}
              type="button"
              className="h-[40px] px-8 rounded-xl border items-center gap-2 text-sm bg-gray-300 text-white hover:bg-gray-600"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
