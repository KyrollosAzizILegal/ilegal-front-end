import React, { useState } from "react";
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

type DeleteTenantButtonProps = {
  tenantId: string;
  tenantName: string;
};

const DeleteTenantButton: React.FC<DeleteTenantButtonProps> = ({ tenantId, tenantName }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteTenant, { isLoading }] = useDeleteTenantMutation();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteTenant(tenantId).unwrap();
      onOpenChange(); // Close modal after successful deletion
    } catch (err) {
      setError("Failed to delete tenant. Please try again.");
      console.log(err);
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
                Are you sure you want to delete tenant <b>{tenantName}</b>? This action cannot be undone.
                {error && <p className="text-red-500 mt-4">{error}</p>}
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
