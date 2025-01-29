"use client";
import { useState } from "react";

const EventCreationPage = () => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    seats: "",
    ticketType: "paid",
    price: "",
  });

  const [voucher, setVoucher] = useState({
    discount: "",
    voucherStart: "",
    voucherEnd: "",
  });

  const [showVoucherForm, setShowVoucherForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVoucher((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateVoucher = () => {
    setShowVoucherForm(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission
    console.log({ ...eventDetails, voucher });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "#252A34" }}
    >
      <form
        onSubmit={handleSubmit}
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
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={eventDetails.name}
                onChange={handleInputChange}
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
                value={eventDetails.description}
                onChange={handleTextAreaChange}
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
                  name="startDate"
                  value={eventDetails.startDate}
                  onChange={handleInputChange}
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
                  name="endDate"
                  value={eventDetails.endDate}
                  onChange={handleInputChange}
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
                type="number"
                name="seats"
                value={eventDetails.seats}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        {/* ticket type section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Ticket Type
          </h3>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="ticketType"
                value="paid"
                checked={eventDetails.ticketType === "paid"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Paid Ticket
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="ticketType"
                value="free"
                checked={eventDetails.ticketType === "free"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Free Ticket
            </label>
          </div>

          {eventDetails.ticketType === "paid" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={eventDetails.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                min="0"
                required
              />
            </div>
          )}
        </div>

        {/* voucher section */}
        <div className="mb-8">
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
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreationPage;
