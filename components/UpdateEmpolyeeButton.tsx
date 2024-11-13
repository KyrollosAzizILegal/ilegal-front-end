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
import { useUpdateEmployeeMutation } from "@/redux/services/api";

// Define validation schema for the form
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
});

type UpdateEmployeeButtonProps = {
  id: string;
  name: string;
};

const UpdateEmployeeButton: React.FC<UpdateEmployeeButtonProps> = ({ id, name }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateEmployee, { isLoading, error }] = useUpdateEmployeeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
    defaultValues: { name }, // Prefill the input with the current name
  });

  // Reset the form whenever the modal closes
  const handleClose = () => {
    reset({ name }); // Reset to the initial name value
    onOpenChange(); // Close the modal
  };

  const onSubmit = async (data: { name: string }) => {
    try {
      await updateEmployee({ id, ...data }).unwrap();
      reset({ name: data.name }); // Reset with the updated name after submission
      handleClose(); // Close the modal
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
      <Modal isOpen={isOpen} onOpenChange={handleClose} isDismissable={false} placement="top-center">
        <ModalContent>
          {(onClose) => (
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
                  {/* Error message from API if update fails */}
                  {error && (
                    <div className="mt-4">
                      <p className="text-red-500 text-sm">
                        An error occurred. Please try again.
                      </p>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={handleClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" isDisabled={isLoading} isLoading={isLoading}>
                    Update Employee
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

export default UpdateEmployeeButton;
