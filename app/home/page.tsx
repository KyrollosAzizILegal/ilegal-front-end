"use client";
import React from "react";

import { TenantTable } from "@/components/AllTenants";
import { EmployeesTable } from "@/components/AllEmployees";

const page = () => {
  return (
    <>
      <TenantTable />
      <EmployeesTable/>
    </>
  );
};

export default page;
