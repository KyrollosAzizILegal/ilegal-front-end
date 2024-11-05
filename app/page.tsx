'use client'
'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button } from '@nextui-org/react';
import Link from 'next/link'; // Import the Link component from Next.js

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

// Create a type from the Yup schema
type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <Input
              {...register('email')}
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              color={errors.email ? 'danger' : 'default'}
              fullWidth
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <Input
              {...register('password')}
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              color={errors.password ? 'danger' : 'default'}
              fullWidth
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" color="primary" fullWidth>
            Login
          </Button>
        </form>

        {/* Link to Create Account */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/create-account" className="text-blue-500 hover:underline">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
