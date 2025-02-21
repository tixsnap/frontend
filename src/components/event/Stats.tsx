import React from "react";

export const StatCard = ({
  title,
  value,
  className
}: {
  title: string;
  value: number | string;
  className?: string
}) => (
  <div className="border bg-gray-50 rounded-lg p-5 shadow-md">
    <p className="text-start">{title}</p>
    <p className={`${className} text-black font-bold text-center font-serif`}>
      {value}
    </p>
  </div>
);
