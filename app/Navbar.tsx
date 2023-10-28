"use client";
import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineIssuesClose } from "react-icons/ai";
import Skeleton from "@/components/Skeleton"

const Navbar = () => {
  return (
    <nav className="border-b h-14 mb-5 px-5">
      <div className="mx-auto flex space-x-6 items-center justify-between h-[100%] max-w-[1136px]">
        <div className="flex space-x-6 items-center h-full">
          <Link href="/">
            <AiOutlineIssuesClose className="text-3xl" />
          </Link>
          <NavLinks />
        </div>
        <AuthStatus />
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues/list" },
  ];
  const pathName = usePathname();
  return (
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
              "nav-link-not-selected": pathName !== link.href,
              "nav-link-selected": pathName === link.href,
            })}
            href={link.href}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const pathName = usePathname();
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem"/>;

  if (status === "unauthenticated")
    return (
      <Link
        href="/api/auth/signin"
        className={classNames({
          "nav-link-not-selected": pathName !== "/api/auth/signin",
          "nav-link-selected": pathName === "/api/auth/signin",
          "transition-colors": true,
        })}
      >
        Login
      </Link>
    );

  return (
    <div className="h-full flex items-center rounded-sm p-1">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            fallback="?"
            src={session!.user!.image!}
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item className="hover:bg-red-300">
            <Link href="/api/auth/signout">Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Navbar;
