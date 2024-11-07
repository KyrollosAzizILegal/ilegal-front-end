"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
} from "@nextui-org/react";
import { useGetAllEmployeesQuery } from "@/redux/services/api";
import { DeleteEmployeeButton } from "./deleteEmployeeComponent";

export const EmployeesTable = () => {
  const { data, error, isLoading } = useGetAllEmployeesQuery({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  if (isLoading) return <Spinner label="Loading employees..." />;
  if (error) return <p>Error loading employees.</p>;

  const employees = data || [];

  // Calculate pagination
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const paginatedEmployees = employees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-16 flex flex-col gap-5">
      <h3 className="text-gray-800 mb-4 text-5xl font-semibold">Employees</h3>
      <Table aria-label="Employees Table">
        <TableHeader>
          <TableColumn>NO.</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          loadingState={isLoading ? "loading" : "idle"}
          loadingContent={<Spinner label="Loading employees..." />}
        >
          {paginatedEmployees.map((employee: any, index: number) => (
            <TableRow key={employee.id}>
              <TableCell>{(page - 1) * rowsPerPage + index + 1}.</TableCell>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                {new Date(employee.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="felx gap-3 items-center">
                <Button color="primary" size="sm">
                  View
                </Button>
                <DeleteEmployeeButton employeeId={employee.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
  );
};
