"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link"; // Import the Link component from Next.js
import { useCreateUserMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

// Define the validation schema using Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Create a type from the Yup schema
type FormData = yup.InferType<typeof schema>;

// Helper function to check if the error is a FetchBaseQueryError

export default function CreateUserForm() {
  const [createUser, { isLoading, error, isSuccess }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await createUser(formData).unwrap();
      console.log("User created successfully");
      reset(); // Reset the form after successful submission
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

    error &&
      isFetchBaseQueryError(error) &&
      (error.data && typeof error.data === "object" && "message" in error.data
        ? toast.error((error.data as { message: string }).message)
        : toast.error("An error occurred. Please try again."));
    isSuccess && toast.success("Account created successfully.");


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <Input
              {...register("name")}
              id="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
              color={errors.name ? "danger" : "default"}
              fullWidth
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <Input
              {...register("email")}
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              color={errors.email ? "danger" : "default"}
              fullWidth
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <Input
              {...register("password")}
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              color={errors.password ? "danger" : "default"}
              fullWidth
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            fullWidth
            isDisabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        {/* API Error Message */}

        {/* Link to Login Page */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
