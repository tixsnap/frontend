import React from "react";

export default function TableHead({ text }: { text: string }) {
  return (
    <th className="pl-5 pr-10 py-5 text-start text-sm font-medium text-gray-500 uppercase tracking-wider">
      {text}
    </th>
  );
}