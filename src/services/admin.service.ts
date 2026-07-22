import { apiClient } from "./api-client";

export interface AdminStatItem {
  label: string;
  value: string;
  change: string;
}

export interface TenantItem {
  name: string;
  plan: string;
  members: number;
  created: string;
  status: "Active" | "Suspended";
}

export const adminService = {
  async getStats(): Promise<AdminStatItem[]> {
    return apiClient.get<AdminStatItem[]>("/admin/stats");
  },

  async getTenants(): Promise<TenantItem[]> {
    return apiClient.get<TenantItem[]>("/admin/tenants");
  },

  async createTenant(data: Partial<TenantItem>): Promise<TenantItem> {
    return apiClient.post<TenantItem>("/admin/tenants", data);
  },

  async updateTenant(id: string, data: Partial<TenantItem>): Promise<TenantItem> {
    return apiClient.put<TenantItem>(`/admin/tenants/${id}`, data);
  },

  async deleteTenant(id: string): Promise<void> {
    return apiClient.delete<void>(`/admin/tenants/${id}`);
  },
};
