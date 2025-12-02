"use client"; // WAJIB

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Ubah path import
import {
  type RegisterFormValues,
  registerSchema,
} from "@/features/auth/schema/authSchema";
import { useAuth } from "@/features/auth/hooks/useAuth";
// Import ShadCN dari path yang benar (sudah benar)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useEffect } from "react";

type Props = { onSwitch: () => void };

const RegisterForm: React.FC<Props> = ({ onSwitch }) => {
  const { registerMutation, isLoading, isError, errorMessage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values);
  };

  useEffect(() => {
    if (isError) toast.error(errorMessage);
  }, [errorMessage]);

  return (
    <>
      <h1 className="text-xl-bold md:display-xs-bold mb-4 flex-center">
        Register
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          id="name"
          type="text"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          label="Username"
          id="username"
          type="text"
          {...register("username")}
          error={errors.username?.message}
        />

        <Input
          label="Email"
          id="email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Phone Number"
          id="phone"
          type="number"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          className="w-full mb-4 rounded-full"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>

      <p className="text-sm-semibold md:text-md-semibold text-center">
        Already have an account?
        <span className="cursor-pointer text-primary-300" onClick={onSwitch}>
          {" "}
          Log in
        </span>
      </p>
    </>
  );
};

export default RegisterForm;
