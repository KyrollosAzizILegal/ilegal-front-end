"use client";
import React, { useState, useEffect } from "react";
import { Editor } from "../ckeditor/Editor";
import { useParams } from "next/navigation";
import {
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} from "@/redux/services/api";
import { DecoupledEditor } from "ckeditor5";
import { Button, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";

export const Template = () => {
  const { id } = useParams() as { id: string };
  const {
    data: template,
    error,
    isLoading,
    isSuccess,
  } = useGetTemplateByIdQuery(id);
  const [
    updateTemplate,
    {
      isLoading: isUpdateLoading,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateTemplateMutation();
  const [editor, setEditor] = useState<DecoupledEditor | null>(null);

  // Handle toasts for update success
  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Template updated successfully.");
    }
  }, [isUpdateSuccess]);

  // Handle toasts for update error
  useEffect(() => {
    if (updateError && isFetchBaseQueryError(updateError)) {
      const errorMessage =
        updateError.data &&
        typeof updateError.data === "object" &&
        "message" in updateError.data
          ? (updateError.data as { message: string }).message
          : "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  }, [updateError]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: Failed to load template.</div>;
  }

  return (
    <div className="text-gray-700 text-base leading-relaxed space-y-4">
      {isSuccess && (
        <Editor
          data={template?.attachmentFileUrl as string}
          setEditor={setEditor}
        />
      )}
      <Button
        isLoading={isUpdateLoading}
        color="primary"
        onPress={() => {
          if (editor) {
            updateTemplate({
              id,
              attachmentFileUrl: editor.getData(),
            }).unwrap();
          }
        }}
      >
        Save
      </Button>
    </div>
  );
};
