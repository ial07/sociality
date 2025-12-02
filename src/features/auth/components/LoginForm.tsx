"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { LoginFormValues, loginSchema } from "../schema/authSchema";
import { Input } from "@/components/ui/input";

type Props = { onSwitch: () => void };

const LoginForm: React.FC<Props> = ({ onSwitch }) => {
  const { loginMutation, isLoading, isError, errorMessage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  useEffect(() => {
    if (isError) toast.error(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <h1 className="text-xl-bold md:display-xs-bold mb-4 flex-center">
        Welcome Back!
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          id="email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          className="w-full rounded-full mb-4"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>

      <p className="text-sm-semibold md:text-md-semibold text-center">
        Don't have an account?
        <span className="cursor-pointer text-primary-300" onClick={onSwitch}>
          {" "}
          Register
        </span>
      </p>
    </>
  );
};

export default LoginForm;
