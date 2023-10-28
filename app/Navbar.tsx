"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineIssuesClose } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues/list" },
  ];
  const pathName = usePathname();
  return (
    <nav className="flex space-x-6 items-center border-b h-14 mb-5 px-5">
      <Link href="/" >
        <AiOutlineIssuesClose className="text-3xl"/>
      </Link>
      <ul className="flex space-x-6 h-full ">
        {links.map((link) => (
          <li
            key={link.href}
            className={classNames({
              "bg-zinc-900": pathName === link.href,
              "bg-none": pathName !== link.href,
              "h-full flex items-center rounded-sm p-1":true
            })}
          >
            <Link
              className={classNames({
                "text-zinc-500 hover:text-zinc-800": pathName!==link.href,
                "text-zinc-400 hover:text-white": pathName===link.href,
                "transition-colors":true
              })}
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
