"use client";
import React, { useEffect } from "react";
import { TiptapEditor } from "../ckeditor/Editor";
import { useParams } from "next/navigation";
import {
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} from "@/redux/services/api";
import { Button, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";
import { useTipTapEditor } from "../ckeditor/config";

export const Template = () => {
  
  const { id } = useParams() as { id: string };
  const {
    data: template,
    error,
    isLoading,
    isSuccess,
  } = useGetTemplateByIdQuery(id);
  const editor = useTipTapEditor(template?.attachmentFileUrl);

  useEffect(() => {
    if (template) {
      editor?.commands.setContent(template.attachmentFileUrl);
    }
  }, [template, editor]);
  const [
    updateTemplate,
    {
      isLoading: isUpdateLoading,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateTemplateMutation();

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
        <TiptapEditor
          editor={editor}
        />
      )}
      <Button
        isLoading={isUpdateLoading}
        color="primary"
        onPress={() => {
          if (editor) {
            updateTemplate({
              id,
              attachmentFileUrl: editor.getHTML(),
            }).unwrap();
          }
        }}
      >
        Save
      </Button>
    </div>
  );
};
