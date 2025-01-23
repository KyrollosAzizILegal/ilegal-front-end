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
import { useDeleteTemplateMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";

type DeleteTemplateButtonProps = {
  templateId: string;
  templateName: string;
};

const DeleteTemplateButton: React.FC<DeleteTemplateButtonProps> = ({
  templateId,
  templateName,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteTemplate, { isLoading, error }] = useDeleteTemplateMutation();

  const handleDelete = async () => {
    try {
      await deleteTemplate(templateId).unwrap();
      onOpenChange(); // Close modal after successful deletion
    } catch (err) {
      console.error(err);
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
                Are you sure you want to delete template <b>{templateName}</b>?
                This action cannot be undone.
              </ModalBody>
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
