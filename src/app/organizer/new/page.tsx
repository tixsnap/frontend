"use client";
import { useEventStore } from "@/app/store/eventStore";
import axiosInstance from "@/app/utils/axios.helper";
import axios from "axios";
import Popup from "@/components/Popup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { Router } from "express";

const EventCreationPage = () => {
  const { getEvents, events } = useEventStore();
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      start_date: "",
      end_date: "",
      description: "",
      ticket_open: "",
      ticket_type: "",
      category: "",
      location: "",
    },
    onSubmit: async (values: any) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          if (values[key] || values[key] === 0) {
            formData.append(key, values[key]);
          }
        }

        if (file) {
          formData.append("image", file);
        }

        const res = await axiosInstance.post(`/organizer/events`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("data:", res.data);

        setTimeout(() => {
          toast.success("Event Created");
          formik.resetForm();
        }, 2000);

        router.push("/organizer/events");
      } catch (error) {
        toast.error("Error creating event");
        console.error(error);
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
      <div
        className="min-h-screen py-8 px-4"
        style={{ backgroundColor: "#252A34" }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Create New Event
          </h2>

          {/* event details section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Event Details
            </h3>
            <div className="space-y-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formik.values.category}
                  onChange={(e) => {
                    const uppercased = e.target.value.toUpperCase();
                    formik.setFieldValue("category", uppercased);
                  }}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded-md h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    name="start_date"
                    value={formik.values.start_date}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    name="end_date"
                    value={formik.values.end_date}
                    onChange={formik.handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Available Seats
                </label>
                <input
                  type="text"
                  name="ticket_open"
                  value={formik.values.ticket_open}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded-md"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Ticket Type
            </h3>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ticket_type"
                  value="PAID"
                  checked={formik.values.ticket_type === "PAID"}
                  onChange={formik.handleChange}
                  className="mr-2"
                />
                Paid Ticket
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ticket_type"
                  value="FREE"
                  checked={formik.values.ticket_type === "FREE"}
                  onChange={formik.handleChange}
                  className="mr-2"
                />
                Free Ticket
              </label>
            </div>

            {formik.values.ticket_type === "PAID" && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  required
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors"
            onClick={() => router.push("/organizer/new")}
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreationPage;
