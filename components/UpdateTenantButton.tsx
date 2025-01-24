import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateTenantMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

// Validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
});

type UpdateTenantButtonProps = {
  tenantId: string;
  tenantName: string;
};

const UpdateTenantButton: React.FC<UpdateTenantButtonProps> = ({
  tenantId,
  tenantName,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateTenant, { isLoading, error, isSuccess }] =
    useUpdateTenantMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
    defaultValues: { name: tenantName }, // Prefill with current tenant name
  });

  // Handle toast for errors
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

  // Handle toast for success
  useEffect(() => {
    if (isSuccess) {
      toast.success("Tenant updated successfully");
      onOpenChange(); // Close the modal after success
    }
  }, [isSuccess, onOpenChange]);

  // Handle form submission
  const onSubmit = async (data: { name: string }) => {
    try {
      await updateTenant({ id: tenantId, name: data.name }).unwrap();
      reset({ name: data.name }); // Reset form with the updated name
    } catch (err) {
      console.error("Failed to update tenant:", err);
    }
  };

  // Handle modal close and reset the form to initial values
  const handleClose = () => {
    reset({ name: tenantName }); // Reset to original name if no submission
    onOpenChange(); // Close the modal
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button color="primary" size="sm" onPress={onOpen}>
        Update
      </Button>

      {/* Update Tenant Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={handleClose}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Tenant Name
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    {...register("name")}
                    label="Name"
                    placeholder="Enter tenant name"
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
                    Update Tenant
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

export default UpdateTenantButton;
