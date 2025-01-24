import { Template } from "@/components/templates/template";
import React from "react";

const Page = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg mx-auto p-6 flex-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Preview</h2>
      </div>
      <div className="h-1 bg-gradient-to-r from-deepBlue to-lightBlue rounded-lg mb-6"></div>

      {/* Content */}
      <Template/>
    </div>
  );
};

export default Page;
