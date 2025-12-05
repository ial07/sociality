"use client";

import Image from "next/image";
import React from "react";
import SearchInput from "../SearchInput";
import { Button } from "../ui/button";
import { logout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const Header: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const userAvatar = user?.avatarUrl || "/images/author.png";
  const userName = user?.name || "Guest";

  function handleLogout() {
    dispatch(logout());
    window.location.href = "/auth?type=login";
  }
  return (
    <header className="py-3 md:py-5.5 border border-neutral-900">
      <nav className="custom-container flex-between">
        <Link href="/">
          <Image src="/icons/Logo.svg" alt="logo" width={137} height={36} />
        </Link>
        <SearchInput />
        <div className="flex gap-3">
          {!token ? (
            <>
              <Button
                className="rounded-full w-32.5"
                variant={"outline"}
                asChild
              >
                <Link href="/auth?type=login">Login</Link>
              </Button>
              <Button className="rounded-full w-32.5">
                <Link href="/auth?type=register">Register</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    unoptimized
                    src={userAvatar}
                    alt={userName}
                    width={40} // Sesuaikan width/height agar match dengan className w-10 (40px)
                    height={40}
                    className="w-10 h-10 rounded-full object-cover" // object-cover agar gambar tidak gepeng
                  />
                  <span className="md:text-md-semibold text-sm-semibold hidden md:block">
                    {userName}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="text-danger cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
