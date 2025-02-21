"use client";

import React, { useEffect } from "react";
import { User, CheckCircle, XCircle, Clock } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "../store/userStore";
import { useEventStore } from "../store/eventStore";
import Input from "@/components/atom/Input";
import { IoCopyOutline } from "react-icons/io5";
import { useFormik } from "formik";
import axiosInstance from "../utils/axios.helper";
import { toast } from "react-toastify";
import { CiImageOn } from "react-icons/ci";
import Popup from "@/components/Popup";

const UserProfile = () => {
  // GATOT
  // Handle profile
  const {
    getUserProfile,
    profile,
    user: userLogged,
    getUserSession,
  } = useUserStore();

  const { getTransactionsUser, transactions } = useEventStore();

  useEffect(() => {
    const fetchUserData = async () => {
      await getUserProfile();
      await getUserSession();
      await getTransactionsUser();
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (profile) {
      formik.setValues({
        name: formik.values.name || "",
        first_name: profile.firstName || "",
        last_name: profile.lastName || "",
        profile_picture: profile.profilePicture || "",
      });
    }
  }, [profile]);

  const formik = useFormik({
    initialValues: {
      name: "",
      first_name: "",
      last_name: "",
      profile_picture: "",
    },
    onSubmit: async (values) => {
      await axiosInstance.post("/profile", {
        first_name: values.first_name,
        last_name: values.last_name,
      });

      toast.success("Profile Updated");
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const image: File = e.target.files[0];
      formik.setFieldValue("image", image);
      const form = new FormData();
      form.append("image", image);

      try {
        await axiosInstance.post("/profile/avatar", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Profile Updated");
        setTimeout(() => {
          window.location.reload();
        }, 1000); //
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      const res = await axiosInstance.post(`/auth/forgot-password`, {
        email: userLogged?.email,
      });
      console.log(res.data);

      toast.success("Link reset-password has been sent to your email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <Popup />
          <div className="flex flex-col items-center">
            {profile?.profilePicture ? (
              <Image
                src={profile.profilePicture}
                alt="Profile"
                width={500}
                height={500}
                className="rounded-full object-cover mb-4 w-[200] h-[200]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}

            <label className="hover:cursor-pointer h-[30px] px-3 rounded-xl border flex items-center gap-2 text-sm bg-blue-400 text-white hover:bg-blue-500 hover:text-white">
              <CiImageOn />
              Change
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <h1 className="text-2xl font-bold text-gray-900">
              {profile?.firstName} {profile?.lastName}
            </h1>
            <div className="mt-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {profile?.user?.point?.totalPoint
                  ? profile.user.point.totalPoint.toLocaleString()
                  : 0}{" "}
                Points
              </span>
            </div>

            <div className="p-5 flex w-full">
              <form
                className="flex flex-col w-full gap-5"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label className="text-sm">First Name</label>
                  <Input
                    name="first_name"
                    value={formik.values.first_name || ""}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm">Last Name</label>
                  <Input
                    name="last_name"
                    value={formik.values.last_name || ""}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label className="text-sm">Username</label>
                  <Input
                    name="name"
                    value={userLogged?.name || ""}
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
                    value={userLogged?.email || ""}
                    placeholder="example@mail.com"
                    disabled={true}
                  />
                </div>
                <div>
                  <label className="text-sm">Referral Code</label>

                  <div className="flex items-center gap-3">
                    <Input
                      disabled={true}
                      placeholder={userLogged?.referral || ""}
                      classname="referral"
                    />
                    <IoCopyOutline
                      className="hover:cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          userLogged?.referral || ""
                        );
                        toast.success("Referral code copied!");
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-2">
                    {/* <button className="h-[40px] px-8 rounded-xl border flex items-center gap-2 text-sm hover:bg-blue-300 hover:text-white">
                        Cancel
                      </button> */}
                    <button
                      type="submit"
                      className="h-[40px] px-8 rounded-xl border items-center gap-2 text-sm bg-blue-300 text-white hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </div>
                  <button
                    onClick={handleForgotPassword}
                    type="button"
                    className="h-[40px] px-8 rounded-xl border items-center gap-2 text-sm bg-gray-300 text-white hover:bg-gray-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#252A34] rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-white">
              Transaction History
            </h2>
          </div>
          <div className="overflow-x-auto overflow-y-auto border-gray-500 border-2">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valid Until
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction?.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction?.eventId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${transaction?.totalPayment.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          transaction?.status === "DONE"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction?.status === "DONE" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                        {transaction?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        {transaction?.validUntilPaymentProof}
                        {transaction?.validUntilPaymentProof ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction?.totalTicket}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        type="submit"
                        className="h-[40px] px-8 rounded-xl  border items-center gap-2 text-sm bg-yellow-300 text-black hover:bg-yellow-600"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
