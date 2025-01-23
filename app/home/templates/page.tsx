"use client";

import { AddTemplate } from "@/components/templates/addTemplate";
import { TemplateList } from "@/components/templates/templateList";
import { setHeader } from "@/redux/services/header";
import React from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setHeader("Templates"));
  }, [dispatch]);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto flex-grow h-fit">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Preconfigured Templates
        </h2>
        <div className="flex gap-4">
          <AddTemplate/>
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>

      {/* Template List */}
      <TemplateList />
    </div>
  );
};

export default Page;
