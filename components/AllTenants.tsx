"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Pagination,
  Input,
} from "@nextui-org/react";
import { useGetAllTenantsQuery } from "@/redux/services/api";
import AddTenantModal from "./addTenantButton";
import UpdateTenantButton from "./UpdateTenantButton";
import DeleteTenantButton from "./DeleteTenantButton";
import { Tenant } from "@/types";
import { usePathname } from "next/navigation";


export const TenantCards = () => {
  
  const path = usePathname()
  const isPathRight = path === "/home/tenants"
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const limit = 5;

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch tenants based on the search term and page
  const { data, error, isLoading } = useGetAllTenantsQuery({
    page,
    limit,
    name: debouncedSearchTerm || undefined,
  });

  // Reset to page 1 when the search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  if (isLoading) return <p>Loading tenants...</p>;
  if (error) return <p>Error loading tenants.</p>;

  const tenants = data?.data || [];
  const totalPages = data?.metaData?.totalPages || 1;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-4 text-5xl font-semibold text-white">Tenants</h3>
        {isPathRight &&<AddTenantModal />}
      </div>

      {/* Search Input */}
      {isPathRight && <div className="mb-4">
        <Input
          isClearable
          placeholder="Search by tenant name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
        />
      </div>}

      {/* Tenant Cards */}
      <div className="gap-4 grid grid-cols-12">
        {tenants.map((tenant: Tenant) => (
          <Card key={tenant.id} className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                Tenant Name
              </p>
              <h4 className="text-white font-medium text-small">
                {tenant.name}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt={`Tenant ${tenant.id}`}
              className="z-0 w-full h-full object-cover"
              src={tenant.imageUrl || "https://via.placeholder.com/300"}
            />
            {isPathRight && <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div className="flex gap-2">
                <UpdateTenantButton
                  tenantId={tenant.id}
                  tenantName={tenant.name}
                />
                <DeleteTenantButton
                  tenantId={tenant.id}
                  tenantName={tenant.name}
                />
              </div>
            </CardFooter>}
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};
