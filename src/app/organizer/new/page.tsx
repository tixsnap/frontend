"use client";
import { useEventStore } from "@/app/store/eventStore";
import axiosInstance from "@/app/utils/axios.helper";
import Popup from "@/components/Popup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { toast } from "react-toastify";

const EventCreationPage = () => {
  //   const [eventDetails, setEventDetails] = useState({
  //     name: "",
  //     description: "",
  //     startDate: "",
  //     endDate: "",
  //     seats: "",
  //     ticketType: "paid",
  //     price: "",
  //   });

  //   const [voucher, setVoucher] = useState({
  //     discount: "",
  //     voucherStart: "",
  //     voucherEnd: "",
  //   });

  //   const [showVoucherForm, setShowVoucherForm] = useState(false);

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setEventDetails((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setVoucher((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleGenerateVoucher = () => {
  //     setShowVoucherForm(true);
  //   };

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     // handle form submission
  //     // TODO: continue to API
  //     console.log({ ...eventDetails, voucher });
  //   };

  //   const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     const { name, value } = e.target;
  //     setEventDetails((prev) => ({ ...prev, [name]: value }));
  //   };

  // GATOT

  const { getEvents, events } = useEventStore();
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter()

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

        const formData = new FormData()
        for (const key in values) {
            if (values[key] || values[key] === 0) {
              formData.append(key, values[key]);
            }
          }
  
          if (file) {
            formData.append("image", file);
          }
  
          const res = await axiosInstance.post(
            `/organizer/events`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          setTimeout(() => {
            toast.success("Event Created");
            formik.resetForm()
          }, 2000);

          router.push("/organizer/events")
  
        
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

          {/* voucher section */}
          {/* <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Voucher</h3>
              <button
                type="button"
                onClick={handleGenerateVoucher}
                className="px-4 py-2 text-white rounded-md transition-transform: duration-200 hover:scale-110"
                style={{ backgroundColor: "#FF2E63" }}
              >
                Generate Voucher
              </button>
            </div>

            {showVoucherForm && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Discount Percentage
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={voucher.discount}
                      onChange={handleVoucherChange}
                      className="w-full p-2 border rounded-md"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Voucher Start Date
                    </label>
                    <input
                      type="datetime-local"
                      name="voucherStart"
                      value={voucher.voucherStart}
                      onChange={handleVoucherChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Voucher End Date
                    </label>
                    <input
                      type="datetime-local"
                      name="voucherEnd"
                      value={voucher.voucherEnd}
                      onChange={handleVoucherChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}
          </div> */}

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreationPage;
