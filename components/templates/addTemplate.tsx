import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddTemplateMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";

// Define the schema for form validation
const schema = yup.object({
  name: yup.string().required("Template name is required"),
  language: yup
    .string()
    .oneOf(["ENGLISH", "ARABIC"], "Invalid language selection")
    .required("Language is required"),
});

type TemplateFormValues = yup.InferType<typeof schema>;

export const AddTemplate = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [addTemplate, { isLoading, error }] = useAddTemplateMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TemplateFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      language: "ENGLISH",
    },
  });

  const onSubmit = async (data: TemplateFormValues) => {
    try {
      await addTemplate({
        ...data,
        attachmentFileUrl: "<h1>make your template</h1>",
      }).unwrap(); // Call the mutation
      console.log("Template successfully created!");
      onClose();
      reset(); // Reset the form
    } catch (err) {
      console.error("Failed to create template:", err);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add New Template
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        isDismissable={false}
      >
        <ModalContent>
          <>
            <ModalHeader>Add Pre-Configured Template</ModalHeader>
            <ModalBody>
              <form
                id="addTemplateForm"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Template Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Template Name
                  </label>
                  <Input
                    type="text"
                    {...register("name")}
                    placeholder="Enter template name"
                    className={`mt-1 block w-full ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <Select
                    label="Select Original Language"
                    placeholder="Choose the original language"
                    defaultSelectedKeys={["ENGLISH"]}
                    onSelectionChange={(value) =>
                      setValue("language", value.currentKey as "ARABIC" | "ENGLISH")
                    }
                  >
                    <SelectItem key="ENGLISH" value="ENGLISH">
                      English
                    </SelectItem>
                    <SelectItem key="ARABIC" value="ARABIC">
                      Arabic
                    </SelectItem>
                  </Select>
                  {errors.language && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.language.message}
                    </p>
                  )}
                </div>
              </form>
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
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                form="addTemplateForm"
                type="submit"
                isLoading={isLoading}
                autoFocus
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
