"use client";

import React, { useEffect } from "react";
import Popup from "@/components/Popup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEventStore } from "@/app/store/eventStore";
import axiosInstance from "@/app/utils/axios.helper";

export default function Page() {
  const { events, getEvents, getVouchers, vouchers } = useEventStore();

  useEffect(() => {
    getVouchers();
    getEvents();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      totalValue: 0,
      startDate: "",
      validUntil: "",
      events: [],
    },
    onSubmit: async (values) => {
      try {
        await axiosInstance.post("/organizer/vouchers", values);
        toast.success("Voucher created successfully!");
        getVouchers();
        formik.resetForm()
      } catch (error) {
        toast.error("Error creating voucher");
        console.error(error);
      }
    },
  });

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50">
      <Popup />
      <div className="p-5">
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Create Voucher
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Voucher Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Voucher Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 text-sm w-full"
                  placeholder="Enter voucher name"
                />
              </div>

              {/* Total Discount */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Total Discount %
                </label>
                <input
                  type="number"
                  name="totalValue"
                  value={formik.values.totalValue}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 text-sm w-full"
                  placeholder="Enter discount percentage"
                />
              </div>

              {/* Start & End Date */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 text-sm w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="validUntil"
                  value={formik.values.validUntil}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 text-sm w-full"
                />
              </div>

              {/* Event Selection Dropdown */}
              {events.length > 0 && (
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Event
                  </label>
                  <select
                    multiple
                    name="events"
                    value={formik.values.events}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "events",
                        Array.from(e.target.selectedOptions, (opt) => opt.value)
                      )
                    }
                    className="p-2 border rounded-lg text-gray-700 w-full"
                  >
                    {events.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  type="submit"
                >
                  Create Voucher
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Vouchers List */}
        <p className="text-sm mt-5 rounded-lg bg-green-500 p-2 text-white w-[200px]">
          All Vouchers
        </p>
        <div className="grid grid-cols-2 gap-2 pt-2 text-sm py-3">
          {vouchers.length > 0 &&
            vouchers.map((item) => (
              <div
                className="w-full p-2 rounded-lg bg-white px-5 shadow-md mb-2 flex justify-between"
                key={item.id}
              >
                <div>
                  <div className="flex gap-2 mb-2">
                  <p className="text-lg font-semibold">{item.name}</p>
                  {
                    item.isExpired && (
                      <p className="text-[10px] px-1 bg-red-500 text-white w-fit rounded-lg flex items-center">Expired</p>
                    )
                  }
                  </div>
                  <p className="text-lg font-semibold pb-2">
                    {item.totalValue}%
                  </p>
                  <p className="text-gray-600">
                    Start Date:{" "}
                    {new Date(item.startFrom).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-gray-600">
                    Valid Until:{" "}
                    {new Date(item.validUntil).toLocaleDateString("en-GB")}
                  </p>
                </div>
                {item.events && item.events.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold">Events:</p>
                    {item.events.map((event, index) => (
                      <div key={index} className="text-gray-500">
                        <p>{event.event.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
