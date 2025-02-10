"use client";

import ButtonAuth from "@/components/atom/ButtonAuth";
import Input from "@/components/atom/Input";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { userSchemaResetPassword } from "@/app/interfaces/user.schema";
import axiosInstance from "@/app/utils/axios.helper";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Popup from "@/components/Popup";

export default function page() {
  const [isHidden, setIsHidden] = useState<Boolean>(true);
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const deleteAuthCookie = () => {
    document.cookie = "authjs.session-token";
  };

  const handleSubmit = async (values: any) => {
    try {
      await axiosInstance.post(`/auth/reset-password/${token}`, {
        password: values.password,
      });
      toast.success("Success, Redirect to login");
      deleteAuthCookie()
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: userSchemaResetPassword,
  });

  return (
    <div className="bg-[url(/background_main.webp)] bg-no-repeat bg-cover opacity-50 flex items-center justify-center min-h-screen w-full">
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
        <label>New Password</label>
        <div className="flex items-center relative">
          <Input
            placeholder="password"
            type={isHidden ? "password" : "text"}
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            classname="w-full"
          />
          {!isHidden ? (
            <FaEye
              className="absolute right-3 hover:cursor-pointer"
              onClick={handleIsHidden}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-3 hover:cursor-pointer"
              onClick={handleIsHidden}
            />
          )}
        </div>
        {formik.errors.password && formik.touched.password && (
          <span className="text-red-500 text-xs">{formik.errors.password}</span>
        )}
        <label>Confirm New Password</label>
        <div className="flex items-center relative mb-2">
          <Input
            placeholder="confirm password"
            type={"password"}
            name="confirmPassword"
            onChange={formik.handleChange}
            classname="w-full"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <span className="text-red-500 text-xs">
            {formik.errors.confirmPassword}
          </span>
        )}

        <ButtonAuth
          text="Change Password"
          classname="bg-blue-400 hover:bg-blue-500 text-white disabled:bg-blue-200 disabled:cursor-not-allowed py-3"
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
        />
      </form>
    </div>
  );
}
