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
import { useDeleteEmployeeMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

export const DeleteEmployeeButton = ({
  employeeId,
}: {
  employeeId: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteEmployee, { isLoading, error, isSuccess }] =
    useDeleteEmployeeMutation();

  // Handle success toast and modal closure
  useEffect(() => {
    if (isSuccess) {
      toast.success("Employee deleted successfully");
      onOpenChange(); // Close the modal after success
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

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeId).unwrap();
    } catch (err) {
      console.error("Failed to delete employee:", err); // Error handled in toast
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
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this employee? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleDelete}
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
