"use client";

import Popup from "@/components/Popup";
import React from "react";
import Image from "next/image";
import Input from "@/components/atom/Input";
import ButtonAuth from "@/components/atom/ButtonAuth";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function page() {
    const handleForgotPassword = async (values: string) => {
        try {
          const res = await axios.post(`http://localhost:8080/auth/forgot-password`, {
            email: values
          });

          toast.success("Link reset-password has been sent to your email");
        } catch (error) {
          console.log(error);
        }
      };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      await handleForgotPassword(values.email)
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <div className="bg-[url(/background_main.webp)] bg-no-repeat bg-cover flex items-center justify-center min-h-screen w-full">
      <Popup />
      <form
        className="flex flex-col bg-white p-5 rounded-xl w-[40%] gap-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-10">
          <Image
            alt="logo"
            src="/tixsnap_logo.webp"
            width={200}
            height={50}
            priority={true}
            className="bg-transparent object-contain w-[200px] h-[50px] mx-auto"
            style={{
              width: "200px",
              height: "50px",
              objectFit: "contain",
            }}
          />
          <h1 className="text-center font-bold">TIXSNAP OFFICIAL</h1>
        </div>
        <label>Email</label>
        <div className="flex items-center relative">
          <Input
            placeholder="example@gmail.com"
            type={"text"}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            classname="w-full"
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <span className="text-red-500 text-xs">{formik.errors.email}</span>
        )}

        <ButtonAuth
          text="Send Email"
          classname="bg-blue-400 hover:bg-blue-500 text-white disabled:bg-blue-200 disabled:cursor-not-allowed py-3"
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
        />
      </form>
    </div>
  );
}
