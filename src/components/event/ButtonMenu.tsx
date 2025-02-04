import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface IButtonMenu {
  Icon?: IconType;
  text: string;
  href: string;
  className?: string;
  onClick?: () => void;
}

export default function ButtonMenu({
  text,
  href,
  Icon,
  className,
  onClick,
}: IButtonMenu) {
  return (
    <Link
      href={href}
      className={`py-3 px-6 flex gap-2 items-center hover:bg-green-600 rounded-xl hover:text-white mx-2 ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon size={16} />}
      <p>{text}</p>
    </Link>
  );
}
