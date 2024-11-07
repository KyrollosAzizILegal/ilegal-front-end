import React from "react";
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
export const DeleteEmployeeButton = ({
  employeeId,
}: {
  employeeId: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteEmployee, { isLoading, error }] = useDeleteEmployeeMutation();

  const handleDelete = async () => {
    try {
      await deleteEmployee(employeeId).unwrap();
      onOpenChange();
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <>
      <Button color="danger" size="sm" onPress={onOpen}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this employee? This action cannot be
            undone.
            {error && isFetchBaseQueryError(error) && (
              <div className="mt-4">
                <p className="text-red-500 text-sm">
                  {error.data &&
                  typeof error.data === "object" &&
                  "message" in error.data
                    ? (error.data as { message: string }).message
                    : "An error occurred. Please try again."}
                </p>
              </div>
            )}
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
