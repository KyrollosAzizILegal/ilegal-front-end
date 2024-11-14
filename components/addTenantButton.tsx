"use client";
import React, { useState } from "react";
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
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCreateTenantMutation } from "@/redux/services/api";
import { FaCamera, FaTrash } from "react-icons/fa";

// Define a custom type for the form data
interface TenantFormData {
  name: string;
  image: File;
  users: {
    userName: string; // Changed to userName
    email: string;
    password: string;
    phone: string;
  }[];
}

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  image: yup.mixed<File>().required("Image is required"),
  users: yup
    .array()
    .of(
      yup.object().shape({
        userName: yup.string().required("User name is required"), // Changed to userName
        email: yup.string().required("User email is required").email("Invalid email format"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
        phone: yup.string().required("Phone is required"),
      })
    )
    .required("At least one user is required"),
});

const AddTenantModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createTenant, { isLoading, error }] = useCreateTenantMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<TenantFormData>({
    resolver: yupResolver(schema),
    defaultValues: { users: [{ userName: "", email: "", password: "", phone: "" }] },
  });

  const onSubmit: SubmitHandler<TenantFormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    formData.append("users", JSON.stringify(data.users));

    try {
      await createTenant(formData).unwrap();
      reset();
      setImagePreview(null); // Clear image preview on success
      onOpenChange();
    } catch (err) {
      console.error("Failed to create tenant:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const clearImage = () => {
    setValue("image", null as unknown as File); // Workaround to reset the form field
    setImagePreview(null);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add Tenant
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Tenant</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <ModalBody>
                  <Input
                    {...register("name")}
                    label="Tenant Name"
                    placeholder="Enter tenant name"
                    variant="bordered"
                    color={errors.name ? "danger" : "default"}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />

                  {/* Custom File Input for Image */}
                  <div className="relative flex flex-col items-center mt-4">
                    <label htmlFor="image-upload" className="relative flex items-center justify-center w-36 h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 overflow-hidden">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Selected" className="w-full h-full object-cover" />
                      ) : (
                        <FaCamera className="text-4xl text-gray-500" />
                      )}
                      {imagePreview && (
                        <Button type="button" className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 hover:bg-gray-100" onClick={clearImage}>
                          <FaTrash />
                        </Button>
                      )}
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>}
                  </div>

                  {/* Users Array */}
                  {watch("users").map((_, index) => (
                    <div key={index} className="mt-4">
                      <Input
                        {...register(`users.${index}.userName` as const)} // Updated to userName
                        label={`User ${index + 1} Username`}
                        placeholder="Enter user name"
                        variant="bordered"
                        color={errors.users?.[index]?.userName ? "danger" : "default"}
                        isInvalid={!!errors.users?.[index]?.userName}
                        errorMessage={errors.users?.[index]?.userName?.message}
                      />
                      <Input
                        {...register(`users.${index}.email` as const)}
                        label={`User ${index + 1} Email`}
                        placeholder="Enter user email"
                        variant="bordered"
                        color={errors.users?.[index]?.email ? "danger" : "default"}
                        isInvalid={!!errors.users?.[index]?.email}
                        errorMessage={errors.users?.[index]?.email?.message}
                      />
                      <Input
                        {...register(`users.${index}.password` as const)}
                        label={`User ${index + 1} Password`}
                        placeholder="Enter password"
                        type="password"
                        variant="bordered"
                        color={errors.users?.[index]?.password ? "danger" : "default"}
                        isInvalid={!!errors.users?.[index]?.password}
                        errorMessage={errors.users?.[index]?.password?.message}
                      />

                      {/* Phone Input with Controller for each user */}
                      <label className="block text-sm font-medium text-gray-700 mt-2">Phone</label>
                      <Controller
                        name={`users.${index}.phone` as const}
                        control={control}
                        render={({ field }) => (
                          <ReactPhoneInput
                            {...field}
                            country={"us"} // Set default country
                            inputClass="w-full border rounded px-2 py-2 mt-1"
                            dropdownClass="phone-dropdown"
                            onChange={(phone) => field.onChange(phone)}
                          />
                        )}
                      />
                      {errors.users?.[index]?.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.users[index]?.phone?.message}</p>
                      )}
                    </div>
                  ))}

                  {/* API Error Message */}
                  {error && (
                    <div className="mt-4">
                      <p className="text-red-500 text-sm">An error occurred. Please try again.</p>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={() => { reset(); setImagePreview(null); onClose(); }}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" isDisabled={isLoading} isLoading={isLoading}>
                    Add Tenant
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

export default AddTenantModal;
