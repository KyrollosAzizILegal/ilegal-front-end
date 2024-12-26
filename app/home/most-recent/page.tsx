'use client'
import { setHeader } from "@/redux/services/header";
import React from "react";
import { useDispatch } from "react-redux";

// type Props = {};

const recentData = [
  { name: "Tenant Name", type: "Administration", lastViewed: "Date" },
  { name: "Service Name", type: "Document", lastViewed: "Date" },
  { name: "Document Name", type: "Document", lastViewed: "Date" },
  { name: "Template Name", type: "Administration", lastViewed: "Date" },
  { name: "Service Name", type: "Document", lastViewed: "Date" },
  { name: "Document Name", type: "Document", lastViewed: "Date" },
  { name: "Template Name", type: "Administration", lastViewed: "Date" },
];

const Page = (/**props: Props */) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setHeader("Most Recent"));
  }, [dispatch]);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
      <h3 className="text-lg font-bold mb-4">Most Recent</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Last Viewed</th>
          </tr>
        </thead>
        <tbody>
          {recentData.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.type}</td>
              <td className="py-2 px-4">{item.lastViewed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
