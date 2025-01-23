"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "@/redux/services/header";
import { FaFileAlt, FaRegFile, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

const sampleData = [
  { name: "Jan", created: 40, translation: 24, summarization: 20 },
  { name: "Feb", created: 30, translation: 13, summarization: 21 },
  { name: "Mar", created: 20, translation: 98, summarization: 29 },
  { name: "Apr", created: 27, translation: 39, summarization: 20 },
  { name: "May", created: 18, translation: 48, summarization: 28 },
  { name: "Jun", created: 23, translation: 38, summarization: 24 },
  { name: "Jul", created: 34, translation: 43, summarization: 34 },
];

const Page = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setHeader("Home"));
  }, [dispatch]);
  return (
    <div className="min-h-screen space-y-8 text-white flex-grow">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white text-black p-4 rounded-lg shadow-md gap-5 flex flex-col items-center relative">
          <h3 className="text-lg font-bold text-deepBlue">Tenants</h3>
          <FaUsers className="absolute top-4 right-4 text-blue-500 text-2xl" />
          <div className="w-full mt-1 h-[2px] bg-gradient-to-r from-blue-500 to-lightBlue" />
          <p className="mt-4 text-2xl font-bold text-deepBlue">10</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white text-black p-4 rounded-lg shadow-md gap-5 flex flex-col items-center relative">
          <h3 className="text-lg font-bold text-deepBlue">Templates</h3>
          <FaFileAlt className="absolute top-4 right-4 text-blue-500 text-2xl" />
          <div className="w-full mt-1 h-[2px] bg-gradient-to-r from-blue-500 to-lightBlue" />
          <p className="mt-4 text-2xl font-bold text-deepBlue">6</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white text-black p-4 rounded-lg shadow-md gap-5 flex flex-col items-center relative">
          <h3 className="text-lg font-bold text-deepBlue">Documents</h3>
          <FaRegFile className="absolute top-4 right-4 text-blue-500 text-2xl" />
          <div className="w-full mt-1 h-[2px] bg-gradient-to-r from-blue-500 to-lightBlue" />
          <p className="mt-4 text-2xl font-bold text-deepBlue">15</p>
        </div>
      </div>

      {/* Bills and Recent Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Bills and Invoices */}
        <div className="bg-white text-black p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Bills and Invoices</h3>
            <Link href="/home/bills-and-invoices" className="text-blue-600 text-sm hover:underline">
              See all
            </Link>
          </div>
          <Divider/>
          <div className="space-y-4">
            {["Client A", "Client B", "Client C", "Client A"].map(
              (client, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">{client}</p>
                    <p className="text-sm text-gray-500 font-bold">
                      {Math.floor((index + 1) * 20 * 10)}/1000 egp
                    </p>
                  </div>
                  <div className="w-full mt-2 h-5 bg-gray-200 rounded-md relative">
                    <div
                      className={`absolute top-0 left-0 h-5 rounded-md ${
                        index % 2 === 0
                          ? "bg-gradient-to-r from-deepBlue to-lightBlue"
                          : "bg-gradient-to-r from-deepRed to-brightRed"
                      } `}
                      style={{ width: `${(index + 1) * 20}%` }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Most Recent */}
        <div className="bg-white text-black p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Most Recent</h3>
            <Link href="/home/most-recent" className="text-blue-600 text-sm hover:underline">
              See all
            </Link>
          </div>
          <Divider/>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2">Name</th>
                <th>Type</th>
                <th>Last Viewed</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Tenant Name",
                "Service Name",
                "Document Name",
                "Template Name",
              ].map((name, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{name}</td>
                  <td>{index % 2 === 0 ? "Administration" : "Document"}</td>
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenants Analysis */}
      <div className="bg-white text-black p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Tenants Analysis</h3>
          <Link href="/home/tenants-analysis" className="text-blue-600 text-sm hover:underline">
            See all
          </Link>
        </div>
        <div className=" rounded-lg p-6 bg-gradient-to-b from-[#1F88E44A] to-[#114B7E4A]">
          <p>name</p>
          <div className="w-full my-4 h-[2px] bg-gradient-to-r from-blue-700 to-lightBlue" />

          <div className="grid grid-cols-3 gap-6">
            {["Created Documents", "Translation", "Summarization"].map(
              (label, index) => (
                <div key={index} className="text-center">
                  <h5 className="text-black font-semibold mb-2">{label}</h5>
                  {/* Recharts Integration */}
                  <ResponsiveContainer width="100%" height={150} >
                    <BarChart data={sampleData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey={label.toLowerCase().replace(" ", "")}
                        fill={
                          index === 0
                            ? "#114B7E"
                            : index === 1
                            ? "#1F88E4"
                            : "#DD1C55"
                        }
                        radius={20}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
