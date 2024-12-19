"use client";
import React from "react";

import { TenantCards } from "@/components/AllTenants";
import { EmployeesTable } from "@/components/AllEmployees";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <TenantCards />
      <EmployeesTable/>
    </div>
  );
};

export default page;
