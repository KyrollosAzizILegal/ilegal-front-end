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
import { useDeleteTemplateMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

type DeleteTemplateButtonProps = {
  templateId: string;
  templateName: string;
};

const DeleteTemplateButton: React.FC<DeleteTemplateButtonProps> = ({
  templateId,
  templateName,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteTemplate, { isLoading, error, isSuccess }] =
    useDeleteTemplateMutation();

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

  // Handle success toast
  useEffect(() => {
    if (isSuccess) {
      toast.success("Template deleted successfully.");
      onOpenChange(); // Close modal after successful deletion
    }
  }, [isSuccess, onOpenChange]);

  const handleDelete = async () => {
    try {
      await deleteTemplate(templateId).unwrap();
    } catch (err) {
      console.error(err); // Error is already handled in `useEffect`
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
                Are you sure you want to delete template <b>{templateName}</b>? This action cannot be undone.
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

export default DeleteTemplateButton;
