"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios.helper";
import Popup from "@/components/Popup";
import { CiImageOn } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEventStore } from "@/app/store/eventStore";

export default function page() {
  const [file, setFile] = useState<File | null>(null);
  const {getEventBySlug, event} = useEventStore()

  const pathname = usePathname();
  const router = useRouter();
  const eventSlug = pathname.split("/")[3];

  useEffect(() => {
    getEventBySlug(eventSlug)
  }, []);

  const formik = useFormik({
    initialValues: {
      name: event?.name || "",
      price: event?.price || 0,
      location: event?.location || "",
      availableSeat: event?.availableSeat || 0,
      description: event?.description || "",
      category: event?.category || "",
      startDate: event?.startDate
        ? new Date(event.startDate).toISOString().split("T")[0]
        : "",
      endDate: event?.endDate
        ? new Date(event.endDate).toISOString().split("T")[0]
        : "",
      ticketOpen: event?.ticketOpen || 0,
      ticketType: event?.ticketType || "",
      ticketSold: event?.ticketSold || 0,
    },
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      try {
        const formData = new FormData();
        values.price = parseFloat(values.price);
        values.available_seat = parseInt(values.available_seat);
        values.ticket_open = parseInt(values.ticket_open);

        for (const key in values) {
          if (values[key] || values[key] === 0) {
            formData.append(key, values[key]);
          }
        }

        if (file) {
          formData.append("image", file);
        }

        const res = await axiosInstance.patch(
          `/organizer/events/${eventSlug}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setTimeout(() => {
          toast.success("Event updated");
        }, 2000);

        router.push("/organizer/event");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="ml-[210px] p-6 w-[calc(100%-210px)] min-h-screen bg-gray-50">
      <Popup />
      <div className="p-5">
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="hover:cursor-pointer h-[40px] px-4 rounded-xl border flex items-center gap-2 text-sm hover:bg-blue-500 hover:text-white">
              <CiImageOn />
              {file ? file.name : "Choose Image"}
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Available Seat</label>
                <input
                  type="number"
                  name="availableSeat"
                  value={formik.values.availableSeat}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Description</label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  rows={3}
                  className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm">Ticket Open</label>
                <input
                  type="number"
                  name="ticketOpen"
                  value={formik.values.ticketOpen}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Ticket Type</label>
                <input
                  type="text"
                  name="ticketType"
                  value={formik.values.ticketType}
                  onChange={formik.handleChange}
                  className="border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Ticket Sold</label>
                <input
                  type="text"
                  disabled
                  name="ticketSold"
                  value={formik.values.ticketSold}
                  onChange={formik.handleChange}
                  className="cursor-not-allowed border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="h-[40px] w-full px-8 rounded-xl border items-center gap-2 text-sm bg-blue-300 text-white hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
