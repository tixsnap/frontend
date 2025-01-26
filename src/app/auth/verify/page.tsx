import React from "react";
import * as motion from "motion/react-client";
import { FaCheck } from "react-icons/fa";

export default function page() {
  return (
    <div className="h-screen w-full items-center justify-center flex">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        className="text-5xl font-bold text-green-600"
      >
        <div className="flex gap-5 items-center underline">
          You are verified successfully !{" "}
          <FaCheck
            size={36}
            color="white"
            className="rounded-full bg-green-600 p-1"
          />
        </div>
      </motion.div>
    </div>
  );
}
