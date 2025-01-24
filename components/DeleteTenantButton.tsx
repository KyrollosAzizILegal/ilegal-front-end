import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useDeleteTenantMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

type DeleteTenantButtonProps = {
  tenantId: string;
  tenantName: string;
};

const DeleteTenantButton: React.FC<DeleteTenantButtonProps> = ({
  tenantId,
  tenantName,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteTenant, { isLoading, error, isSuccess }] =
    useDeleteTenantMutation();

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
      toast.success("Tenant deleted successfully");
      onOpenChange(); // Close the modal after success
    }
  }, [isSuccess, onOpenChange]);

  const handleDelete = async () => {
    try {
      await deleteTenant(tenantId).unwrap();
    } catch (err) {
      console.error("Failed to delete tenant:", err); // Already handled in toast
    }
  };

  return (
    <>
      {/* Delete Button */}
      <Button color="danger" size="sm" onPress={onOpen}>
        Delete
      </Button>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Deletion
              </ModalHeader>
              <ModalBody>
                Are you sure you want to delete tenant <b>{tenantName}</b>? This
                action cannot be undone.
              </ModalBody>

              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                  isDisabled={isLoading}
                  isLoading={isLoading}
                >
                  Confirm Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteTenantButton;
