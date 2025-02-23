"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface NavLink {
  title: string;
  href: string;
}

interface NavbarProps {
  logo?: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo = "TixSnap" }) => {
  const navLinks: NavLink[] = [
    { title: "Schedule", href: "/schedule" },
    { title: "Organizer", href: "/organizer" },
  ];

  const { data: session } = useSession();

  return (
    <nav className="shadow-sm" style={{ backgroundColor: "#252A34" }}>
      <div className="max-w-7xl mx-purple 5x-4 pr-3 pl-12">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="flex items-center">
                <span className="text-4xl font-bold text-white">{logo}</span>
              </span>
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-10 text-xl pt-2 pr-5 ">
            {session?.user?.id ? (
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-white transition-transform: duration-200 hover:scale-125"
                  >
                    {link.title}
                  </a>
                ))}
                <Link href="/profile">
                  <button
                    className="border-white border-2 text-white px-4 py-1 rounded-3xl hover:bg-teal-400 hover:text-white transition-transform duration-200 hover:scale-110"
                    style={{
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "white",
                    }}
                  >
                    <div>{session.user.name}</div>
                  </button>
                </Link>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-white transition-transform: duration-200 hover:scale-125"
                  >
                    {link.title}
                  </a>
                ))}
                <Link href="/auth/login">
                  <button
                    className="border-white border-2 text-white px-4 py-1 rounded-3xl hover:bg-teal-400 hover:text-white transition-transform duration-200 hover:scale-110"
                    style={{
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "white",
                    }}
                  >
                    Login
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
