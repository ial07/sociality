"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const NavigationBar: React.FC = () => {
  return (
    <div className="w-full md:w-90 rounded-full gap-11 flex-between bg-neutral-900 border-neutral-900 px-4 py-3">
      <Link
        href="/"
        className="flex-center flex-col hover:text-primary-300 active:text-primary-300 transition-all duration-75 w-23.5 cursor-pointer"
      >
        <Icon icon="solar:home-2-bold" width="24" height="24" />
        <span>Home</span>
      </Link>
      <Link
        href="/add-post"
        className="flex-center bg-primary-300 hover:bg-primary-200 rounded-full size-12 cursor-pointer"
      >
        <Icon icon="stash:plus-light" width="24" height="24" />
      </Link>
      <Link
        href="/profile"
        className="flex-center flex-col hover:text-primary-300 active:text-primary-300 transition-all duration-75 w-23.5 cursor-pointer"
      >
        <Icon icon="iconamoon:profile-fill" width="24" height="24" />
        <span>Profile</span>
      </Link>
    </div>
  );
};

export default NavigationBar;
