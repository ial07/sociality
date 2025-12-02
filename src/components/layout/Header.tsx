import Image from "next/image";
import React from "react";
import SearchInput from "../SearchInput";
import { Button } from "../ui/button";

const Header: React.FC = () => {
  return (
    <header className="custom-container py-5.5 flex-between">
      <Image src="/icons/Logo.svg" alt="logo" width={137} height={36} />
      <SearchInput />
      <div className="flex gap-3">
        <Button className="rounded-full w-32.5" variant={"outline"}>
          Login
        </Button>
        <Button className="rounded-full w-32.5">Register</Button>
      </div>
    </header>
  );
};

export default Header;
