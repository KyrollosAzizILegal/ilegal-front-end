// components/AddEmployeeModal.tsx
"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateUserMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

// Validation schema
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

type FormData = yup.InferType<typeof schema>;

const AddEmployeeModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createEmployee, { isLoading, error }] =
    useCreateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createEmployee(data).unwrap();
      toast.success("Employee added successfully.");
      reset();
      onOpenChange();
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  if (error && isFetchBaseQueryError(error)) {
    const errorMessage =
      error.data && typeof error.data === "object" && "message" in error.data
        ? (error.data as { message: string }).message
        : "An error occurred. Please try again.";
    toast.error(errorMessage);
  }

  return (
    <>
      <Button onPress={onOpen} color="secondary">
        Add Employee
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Employee
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    {...register("name")}
                    label="Name"
                    placeholder="Enter employee name"
                    variant="bordered"
                    color={errors.name ? "danger" : "default"}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                  <Input
                    {...register("email")}
                    label="Email"
                    placeholder="Enter employee email"
                    variant="bordered"
                    color={errors.email ? "danger" : "default"}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                  <Input
                    {...register("password")}
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    variant="bordered"
                    color={errors.password ? "danger" : "default"}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                  {/* API Error Message */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                  >
                    Add Employee
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
