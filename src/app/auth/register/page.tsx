"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/atom/Input";
import ButtonAuth from "@/components/atom/ButtonAuth";
import Popup from "@/components/Popup";
import Link from "next/link";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { userSchemaRegister } from "@/app/interfaces/user.schema";
import { FormField } from "@/components/atom/FormField";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios.helper";

export default function page() {
  const [isHidden, setIsHidden] = useState<Boolean>(true);

  const handleIsHidden = () => {
    setIsHidden(!isHidden);
  };
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      referral: "",
      role: "CUSTOMER",
    },
    onSubmit: async (values) => {
      try {
        const requestData = {
          ...values,
          referral: values.referral || undefined,
        };
        const res = await axiosInstance.post(
          "/auth/register",
          requestData
        );

        formik.resetForm();
        toast("Registration successful! Please check your email for verification link.");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } catch (error: any) {
        const errorMessage = error.response.data.message;
      
        if (errorMessage === "Referral code is not found !!!") {
          formik.setFieldError('referral', 'Referral code not found');
        } 
        else if (errorMessage === "Email has been registered !") {
          formik.setFieldError('email', 'Email has already been registered');
        }
        else {
          toast.error(errorMessage || "Registration failed");
        }
      }
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: userSchemaRegister,
  });

  return (
    <div className="w-full min-h-screen">
      <div className="md:grid md:grid-cols-2 flex items-center justify-center">
        <div className="bg-white h-screen items-center justify-center flex flex-col gap-1">
          <Image
            alt="logo"
            src="/tixsnap_logo.webp"
            width={200}
            height={50}
            priority={true}
            className="bg-transparent object-contain w-[200px] h-[50px]"
            style={{
              width: "200px",
              height: "50px",
              objectFit: "contain",
            }}
          />
          <h1 className="text-xl">Welcome to Tixsnap</h1>
          <p className="text-xs font-bold mt-5 flex gap-2 items-center">
            Register as Organizer?
            <input
              type="checkbox"
              checked={formik.values.role === "ORGANIZER"}
              value="ORGANIZER"
              name="role"
              onChange={(e) => {
                const currRole = e.target.checked ? "ORGANIZER" : "CUSTOMER";
                formik.resetForm();
                formik.setFieldValue("role", currRole);
              }}
            />
          </p>

          {/* Form  */}
          <form
            className="flex flex-col gap-3 md:w-1/2 w-full pt-2"
            onSubmit={formik.handleSubmit}
          >
            <FormField
              placeholder="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
            />

            <FormField
              placeholder="example@mail.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
            />

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
              <span className="text-red-500 text-xs">
                {formik.errors.password}
              </span>
            )}
            <div className="flex items-center relative">
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
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </span>
              )}

            {formik.values.role == "CUSTOMER" && (
              <FormField
                placeholder="referral (optional)"
                name="referral"
                value={formik.values.referral}
                onChange={formik.handleChange}
                classname="mt-5"
                onBlur={formik.handleBlur}
                error={formik.errors.referral}
                touched={formik.touched.referral}
              />
            )}
            <ButtonAuth
              text="Sign Up"
              classname="bg-blue-400 hover:bg-blue-500 text-white disabled:bg-blue-200 disabled:cursor-not-allowed"
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
            />
          </form>
          <Popup />

          <p className="text-sm font-thin">
            Already have an account? Login{" "}
            <Link
              href="/auth/login"
              className="text-blue-500 underline hover:text-blue-600"
            >
              Here
            </Link>
          </p>
        </div>
        <div className="border bg-[url(/layer_bg_main.webp)] bg-no-repeat min-h-screen bg-cover md:flex hidden">
          <Image
            alt="auth-bg"
            src={"/background_main.webp"}
            width={500}
            height={100}
            className="w-full h-screen object-cover opacity-30"
          />
        </div>
      </div>
    </div>
  );
}
