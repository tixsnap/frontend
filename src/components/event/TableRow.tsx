import React from "react";

export default function TableRow({
  text,
  className,
}: {
  text: string | number;
  className?: string;
}) {
  return (
    <td
      className={`${className}px-5 text-start pl-5 py-6 whitespace-nowrap text-sm border-b text-gray-900`}
    >
      {text}
    </td>
  );
}
