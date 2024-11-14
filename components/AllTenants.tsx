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
import { useGetAllTenantsQuery } from "@/redux/services/api";
import { Tenant } from "@/types";
import DeleteTenantButton from "./DeleteTenantButton";
import UpdateTenantButton from "./UpdateTenantButton";

export const TenantTable = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const limit = 5;

  // Debounce searchTerm to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch tenants based on the debounced search term and page
  const { data, error, isLoading } = useGetAllTenantsQuery({
    page,
    limit,
    name: debouncedSearchTerm || undefined, // Only pass if debouncedSearchTerm is not empty
  });

  // Reset to the first page whenever the search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

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
                <UpdateTenantButton
                  tenantId={tenant.id}
                  tenantName={tenant.name}
                />
                <DeleteTenantButton
                  tenantId={tenant.id}
                  tenantName={tenant.name}
                />
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
