import React, { ButtonHTMLAttributes } from "react";

interface IButtonAuth {
  text: string;
  classname?: string;
  onClick?: () => {};
  onSubmit?: () => {};
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

export default function ButtonAuth({
  text,
  classname,
  onClick,
  onSubmit,
  disabled = false,
  type,
}: IButtonAuth) {
  return (
    <button
      className={`mt-5 p-2 rounded-lg text-sm font-bold ${classname}`}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
