"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Input,
} from "@nextui-org/react";
import { useGetAllEmployeesQuery } from "@/redux/services/api";
import { DeleteEmployeeButton } from "./deleteEmployeeComponent";
import UpdateEmployeeButton from "./UpdateEmpolyeeButton";
import { Employee } from "@/types";
import AddEmployeeModal from "./addEmployeeComponent";
import { usePathname } from "next/navigation";

export const EmployeesTable = () => {
  const path = usePathname();
  const isPathRight = path === "/home/employees";
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const rowsPerPage = 5;

  // Debounce the search term to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch employees based on the current page, rowsPerPage, and debounced search term
  const { data, error, isLoading } = useGetAllEmployeesQuery({
    page,
    limit: rowsPerPage,
    name: debouncedSearchTerm || undefined, // Pass search term only if it's not empty
  });

  // Reset to the first page whenever the search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  if (isLoading) return <Spinner label="Loading employees..." />;
  if (error) return <p>Error loading employees.</p>;

  const employees = data?.data || [];
  const totalPages = data?.metaData?.totalPages || 1;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className=" mb-4 text-5xl font-semibold text-white">Employees</h3>
        {isPathRight && <AddEmployeeModal />}
      </div>

      {/* Search Input */}
      {isPathRight && (
        <Input
          isClearable
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")} // Clear search term to load all employees
        />
      )}

      <Table aria-label="Employees Table">
        <TableHeader>
          <TableColumn>NO.</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>{isPathRight && "Actions"}</TableColumn>
        </TableHeader>
        <TableBody
          loadingState={isLoading ? "loading" : "idle"}
          loadingContent={<Spinner label="Loading employees..." />}
        >
          {employees.map((employee: Employee, index: number) => (
            <TableRow key={employee.id}>
              <TableCell>{(page - 1) * rowsPerPage + index + 1}.</TableCell>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                {new Date(employee.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex gap-3 items-center">
                {isPathRight && (
                  <>
                    <UpdateEmployeeButton
                      id={employee.id}
                      name={employee.name}
                    />
                    <DeleteEmployeeButton employeeId={employee.id} />
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};
