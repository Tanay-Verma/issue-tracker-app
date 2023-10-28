"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineIssuesClose } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, Container, DropdownMenu, Text } from "@radix-ui/themes";
const Navbar = () => {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues/list" },
  ];
  const pathName = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav className="border-b h-14 mb-5 px-5">
      <div className="mx-auto flex space-x-6 items-center justify-between h-[100%] max-w-[1136px]">
        <div className="flex space-x-6 items-center h-full">
          <Link href="/">
            <AiOutlineIssuesClose className="text-3xl" />
          </Link>
          <ul className="flex space-x-6 h-full ">
            {links.map((link) => (
              <li
                key={link.href}
                className={classNames({
                  "bg-zinc-900": pathName === link.href,
                  "bg-none": pathName !== link.href,
                  "h-full flex items-center rounded-sm p-1": true,
                })}
              >
                <Link
                  className={classNames({
                    "text-zinc-500 hover:text-zinc-800": pathName !== link.href,
                    "text-zinc-400 hover:text-white": pathName === link.href,
                    "transition-colors": true,
                  })}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={classNames({
            "bg-zinc-900": pathName === "/api/auth/signout",
            "bg-none": pathName !== "/api/auth/signout",
            "h-full flex items-center rounded-sm p-1": true,
          })}
        >
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  fallback="?"
                  src={session.user!.image!}
                  radius="full"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{session.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link
                    href="/api/auth/signout"
                    className={classNames({
                      "text-zinc-500 hover:text-zinc-800":
                        pathName !== "/api/auth/signout",
                      "text-zinc-400 hover:text-white":
                        pathName === "/api/auth/signout",
                      "transition-colors": true,
                    })}
                  >
                    Log Out
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link
              href="/api/auth/signin"
              className={classNames({
                "text-zinc-500 hover:text-zinc-800":
                  pathName !== "/api/auth/signin",
                "text-zinc-400 hover:text-white":
                  pathName === "/api/auth/signin",
                "transition-colors": true,
              })}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
