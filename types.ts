// types.ts

// Interface for Employee data
export interface Employee {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  passwordResetToken: string | null;
  passwordResetTokenVerified: boolean | null;
  passwordResetTokenExpire: string | null;
  passwordChangedAt: string | null;
}

// Interface for User within Tenant
export interface TenantUser {
  id: string;
}

// Interface for Role within Tenant
export interface TenantRole {
  id: string;
}

// Interface for Tenant data
export interface Tenant {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  users: TenantUser[];
  roles: TenantRole[];
  usersCount: number;
  roleName: number;
}

// Interface for Tenant API response metadata
export interface TenantMetaData {
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
}

// Interface for Tenant API response
export interface TenantResponse {
  data: Tenant[];
  metaData: TenantMetaData;
}

export interface Template {
  id: string;
  name: string;
  attachmentFileUrl: string;
  createdBy: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}
