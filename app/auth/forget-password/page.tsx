"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Link from "next/link";
import { useRequestPasswordResetMutation } from "@/redux/services/api"; // Import your reset password mutation hook
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

// Create a type from the Yup schema
type ResetFormData = yup.InferType<typeof schema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const [requestPasswordReset, { isLoading, error, isSuccess }] =
    useRequestPasswordResetMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ResetFormData> = async (data) => {
    try {
      const response = await requestPasswordReset(data).unwrap(); // Unwrap to handle the result directly
      console.log(response);
      router.push("/auth/otp");
    } catch (err) {
      console.error("Password reset request failed:", err); // Log errors if any
    }
  };

  error &&
    isFetchBaseQueryError(error) &&
    (error.data && typeof error.data === "object" && "message" in error.data
      ? toast.error((error.data as { message: string }).message)
      : toast.error("An error occurred. Please try again."));

  isSuccess && toast.success("Password reset link sent successfully.");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            fullWidth
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>
        </form>

        {/* API Error Message */}

        {/* Link to Login */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Remembered your password?{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
