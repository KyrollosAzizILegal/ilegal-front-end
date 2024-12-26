"use client";
import { EmployeesTable } from "@/components/AllEmployees";
import { setHeader } from "@/redux/services/header";
import { useDispatch } from "react-redux";

export default function EmployeesPage() {
  const dispatch = useDispatch();
  dispatch(setHeader("Employees"));
  return (
    <div className="flex-grow">
      <EmployeesTable />
    </div>
  );
}
