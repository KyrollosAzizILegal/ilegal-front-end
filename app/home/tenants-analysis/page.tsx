"use client";
import { setHeader } from "@/redux/services/header";
import React from "react";
import { useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tenantsData = [
  {
    name: "Tenant Name",
    data: [
      { month: "Jan", created: 300, translated: 200, summarized: 150 },
      { month: "Feb", created: 400, translated: 250, summarized: 200 },
      { month: "Mar", created: 350, translated: 300, summarized: 250 },
      { month: "Apr", created: 500, translated: 400, summarized: 300 },
      { month: "May", created: 450, translated: 350, summarized: 300 },
    ],
  },
  {
    name: "Tenant Name",
    data: [
      { month: "Jan", created: 200, translated: 150, summarized: 100 },
      { month: "Feb", created: 300, translated: 200, summarized: 150 },
      { month: "Mar", created: 250, translated: 300, summarized: 200 },
      { month: "Apr", created: 400, translated: 350, summarized: 250 },
      { month: "May", created: 350, translated: 300, summarized: 200 },
    ],
  },
  {
    name: "Tenant Name",
    data: [
      { month: "Jan", created: 400, translated: 250, summarized: 200 },
      { month: "Feb", created: 500, translated: 300, summarized: 250 },
      { month: "Mar", created: 450, translated: 400, summarized: 300 },
      { month: "Apr", created: 600, translated: 500, summarized: 400 },
      { month: "May", created: 550, translated: 450, summarized: 350 },
    ],
  },
];

// type Props = {};

const Page = (/**props: Props */) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setHeader("Tenants Analysis"));
  }, [dispatch]);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-grow h-fit">
      <h3 className="text-lg font-bold mb-4">Tenants</h3>
      {tenantsData.map((tenant, index) => (
        <div key={index} className="mb-6 p-4 rounded-lg shadow-md bg-gradient-to-b from-[#1F88E44A] to-[#114B7E4A]">
          <h4 className="text-blue-900 font-bold mb-4">{tenant.name}</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={tenant.data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="created" fill="#114B7E"
              radius={20}
              barSize={20} />
              <Bar dataKey="translated" fill="#1F88E4" 
              radius={20}
              barSize={20}/>
              <Bar dataKey="summarized" fill="#DD1C55" 
              radius={20}
              barSize={20}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default Page;
