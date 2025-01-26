import React, { DOMAttributes, HtmlHTMLAttributes, HTMLInputTypeAttribute } from "react";

export interface IFormAuth {
  type?: HTMLInputTypeAttribute;
  name?: string;
  value?: string;
  classname?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
  classname,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur
}: IFormAuth) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={`border rounded-lg p-2 placeholder:text-xs focus-within:outline-none text-sm w-full ${classname}`}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
