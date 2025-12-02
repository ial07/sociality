"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm: React.FC = () => {
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type");

  const initialType = typeParam === "register" ? false : true;

  const [isLogin, setIsLogin] = React.useState(initialType);

  return (
    <div className="w-100 mx-auto bg-[#00000033] border border-neutral-900 py-8 md:py-10 px-4 md:px-6 rounded-2xl">
      <div className="flex-center flex-col w-full">
        <img src="/icons/Logo.svg" alt="Logo" className="mb-5" />
      </div>
      {isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthForm;
