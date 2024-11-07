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
import { useGetAllTenantsQuery } from "@/redux/services/api";
import { Tenant } from "@/types";

export const TenantTable = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, error, isLoading } = useGetAllTenantsQuery({ page, limit });

  if (isLoading) return <Spinner label="Loading tenants..." />;
  if (error) return <p>Error loading tenants.</p>;

  const tenants = data?.data || [];
  const totalPages = data?.metaData?.totalPages || 1;

  return (
    <div className="p-16 flex flex-col gap-5">
      <h3 className="text-gray-800 mb-4 text-5xl font-semibold">Tenants</h3>
      <Table aria-label="Tenant Table">
        <TableHeader>
          <TableColumn>NO.</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Users Count</TableColumn>
          <TableColumn>Role Name</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant: Tenant, index: number) => (
            <TableRow key={tenant.id}>
              <TableCell>{(page - 1) * limit + index + 1}.</TableCell>
              <TableCell>{tenant.id}</TableCell>
              <TableCell>{tenant.name}</TableCell>
              <TableCell>{tenant.usersCount}</TableCell>
              <TableCell>{tenant.roleName}</TableCell>
              <TableCell>
                <Button color="primary" size="sm">
                  View
                </Button>
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
