import React, { useEffect } from "react";
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
import { useUpdateEmployeeMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

// Define validation schema for the form
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
});

type UpdateEmployeeButtonProps = {
  id: string;
  name: string;
};

const UpdateEmployeeButton: React.FC<UpdateEmployeeButtonProps> = ({
  id,
  name,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateEmployee, { isLoading, error, isSuccess }] =
    useUpdateEmployeeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
    defaultValues: { name }, // Prefill the input with the current name
  });

  // Handle success toast and modal close
  useEffect(() => {
    if (isSuccess) {
      toast.success("Employee updated successfully");
      onOpenChange(); // Close the modal
    }
  }, [isSuccess, onOpenChange]);

  // Handle error toast
  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      const errorMessage =
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? (error.data as { message: string }).message
          : "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  }, [error]);

  // Reset the form whenever the modal closes
  const handleClose = () => {
    reset({ name }); // Reset to the initial name value
    onOpenChange(); // Close the modal
  };

  // Handle form submission
  const onSubmit = async (data: { name: string }) => {
    try {
      await updateEmployee({ id, ...data }).unwrap();
      reset({ name: data.name }); // Reset with the updated name after submission
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button color="primary" size="sm" onPress={onOpen}>
        Update
      </Button>

      {/* Modal for updating employee name */}
      <Modal
        isOpen={isOpen}
        onOpenChange={handleClose}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Employee
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
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isDisabled={isLoading}
                  isLoading={isLoading}
                >
                  Update Employee
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateEmployeeButton;
