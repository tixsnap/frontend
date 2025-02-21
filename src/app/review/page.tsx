"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IReviews } from "../interfaces/review.interface";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useEventStore } from "../store/eventStore";
import { useEffect, useState } from "react";

const ReviewPage: React.FC<IReviews> = () => {
  const router = useRouter();
  const { getReviews, review } = useEventStore();
  const [reviews, setReview] = useState<IReviews>({ rating: 0, comment: "" });

  useEffect(() => {
    getReviews();
  }, []);

  const formik = useFormik({
    initialValues: {
      rating: "",
      comment: "",
    },
    onSubmit: async (values: any) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          if (values[key] || values[key] === 0) {
            formData.append(key, values[key]);
          }
        }

        const res = await axios.post(`/review`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("data:", res.data);

        setTimeout(() => {
          toast.success("Review Submitted");
          formik.resetForm();
        }, 2000);

        router.push("/profile");
      } catch (error) {
        toast.error("Error creating event");
        console.error(error);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Leave a Review</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rating"
          >
            Rating:
          </label>
          <select
            id="rating"
            name="rating"
            value={review?.rating}
            onChange={(event) =>
              setReview({
                ...reviews,
                rating: parseInt(event.target.value, 10),
              })
            }
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-md border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            value={review?.comment}
            onChange={(event) =>
              setReview({ ...reviews, comment: event.target.value })
            }
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-md border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewPage;
