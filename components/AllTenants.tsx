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
  Button,
  Input,
} from "@nextui-org/react";
import { useGetAllTenantsQuery, useSearchTenantsQuery } from "@/redux/services/api";
import { Tenant } from "@/types";
import DeleteTenantButton from "./DeleteTenantButton";

export const TenantTable = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 5;

  // Fetch tenants based on the search term
  const { data, error, isLoading } = searchTerm
    ? useSearchTenantsQuery({ searchTerm })
    : useGetAllTenantsQuery({ page, limit });

  useEffect(() => {
    setPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm]);

  if (isLoading) return <Spinner label="Loading tenants..." />;
  if (error) return <p>Error loading tenants.</p>;

  const tenants = data?.data || [];
  const totalPages = data?.metaData?.totalPages || 1;

  return (
    <div className="p-16 flex flex-col gap-5">
      <h3 className="text-gray-800 mb-4 text-5xl font-semibold">Tenants</h3>
      
      {/* Search Input */}
      <Input
        isClearable
        placeholder="Search by tenant name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm("")} // Clear search term to load all tenants
      />

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
                <DeleteTenantButton tenantId={tenant.id} tenantName={tenant.name} />
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
