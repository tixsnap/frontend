"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useEventStore } from "@/app/store/eventStore";
import axios from "@/app/utils/axios.helper";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { IEvents } from "@/app/interfaces/event.interface";

const CheckoutPage: React.FC<IEvents> = () => {
  const router = useRouter();
  const { getEventBySlugUser, event, getTransactions } = useEventStore();
  const pathname = usePathname();
  const eventSlug = pathname.split("/checkout/")[1];
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // In a real app, you'd fetch event details using eventId
  useEffect(() => {
    setLoading(true);
    getEventBySlugUser(eventSlug);
    getTransactions();
    setLoading(false);
  }, []);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  const totalPrice = event?.price ? event.price * quantity : 0;
  console.log("ini id", event?.id);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      eventId: event?.id,
      totalPayment: totalPrice,
      totalTicket: quantity,
    },
    onSubmit: async (values: any) => {
      if (!event?.id) {
        console.error("Event ID is not available");
        return;
      }
      try {
        console.log("ini values", values);

        const res = await axios.post(`/tx/`, values);
        console.log("ini data res", res.data);

        setTimeout(() => {
          toast.success("Transaction Created");
          formik.resetForm();
        }, 2000);

        router.push("/profile");
      } catch (error) {
        toast.error("Error creating transaction");
        console.error(error);
      }
    },
  });
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 mb-8 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to event
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Tickets
                  </label>
                  <div className="flex items-center mt-1">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 border rounded-l hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(Number(e.target.value))
                      }
                      className="p-2 w-16 text-center border-y"
                      min="1"
                      max="10"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 border rounded-r hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Voucher"
                      onChange={(e) =>
                        handleQuantityChange(Number(e.target.value))
                      }
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Point"
                      onChange={(e) =>
                        handleQuantityChange(Number(e.target.value))
                      }
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!event?.id}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {loading
                    ? "Processing..."
                    : `Pay ${totalPrice.toLocaleString("IDR", {
                        style: "currency",
                        currency: "IDR",
                      })}`}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{event?.name}</h3>
                <p className="text-gray-600">{event?.startDate}</p>
                <p className="text-gray-600">{event?.location}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Tickets ({quantity})</span>
                  <span>
                    {totalPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </div>
                {/* <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>
                    {total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
