"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/atom/Input";
import ButtonAuth from "@/components/atom/ButtonAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { userSchemaLogin } from "@/app/interfaces/user.schema";
import { FormField } from "@/components/atom/FormField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Popup from "@/components/Popup";

export default function page() {
  const [isHidden, setIsHidden] = useState<Boolean>(true);

  const handleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      formik.resetForm();
      toast("Login successfully !");
      setTimeout(() => {
        router.push("/organizer");
      }, 3000);
    },
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: userSchemaLogin,
  });

  return (
    <div className="w-full min-h-screen">
      <div className="md:grid md:grid-cols-2 flex items-center justify-center">
        <div className="bg-white h-screen items-center justify-center flex flex-col gap-1">
          <Image
            alt="logo"
            src={"/tixsnap_logo.webp"}
            width={100}
            height={100}
            className="bg-transparent"
            objectFit="contain"
          />
          <h1 className="text-xl">Login to your account</h1>
          <form
            className="flex flex-col gap-3 md:w-1/2 w-full pt-2"
            onSubmit={formik.handleSubmit}
          >
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
            <ButtonAuth
              text="Login"
              classname="bg-blue-400 hover:bg-blue-500 text-white disabled:bg-blue-200 disabled:cursor-not-allowed"
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
            />
          </form>

          <Popup />

          <p className="text-sm font-thin">
            Don't have an account? Register{" "}
            <Link
              href="/auth/register"
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
