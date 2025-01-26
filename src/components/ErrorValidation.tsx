import React from "react";
import { FormikProps } from "formik";

// Define the shape of form values
interface FormValues {
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  currentPassword?: string;
  referral?: string;
}

export default function ErrorValidation({
  formik,
}: {
  formik: FormikProps<FormValues>;
}) {
  return (
    <>
      {formik.errors.username && formik.touched.username && (
        <span className="text-red-500 text-xs">{formik.errors.username}</span>
      )}
    </>
  );
}
