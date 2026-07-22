import { useState, useEffect } from "react";
import { adminService, AdminStatItem, TenantItem } from "@/services/admin.service";

export function useAdminStats() {
  const [data, setData] = useState<AdminStatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const stats = await adminService.getStats();
        setData(stats);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch admin stats");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export function useTenants() {
  const [data, setData] = useState<TenantItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const tenants = await adminService.getTenants();
        setData(tenants);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tenants");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const createTenant = async (tenantData: Partial<TenantItem>) => {
    try {
      const newTenant = await adminService.createTenant(tenantData);
      setData([...data, newTenant]);
      return newTenant;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create tenant");
      throw err;
    }
  };

  const updateTenant = async (id: string, tenantData: Partial<TenantItem>) => {
    try {
      const updatedTenant = await adminService.updateTenant(id, tenantData);
      setData(data.map((t) => (t.name === id ? updatedTenant : t)));
      return updatedTenant;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update tenant");
      throw err;
    }
  };

  const deleteTenant = async (id: string) => {
    try {
      await adminService.deleteTenant(id);
      setData(data.filter((t) => t.name !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete tenant");
      throw err;
    }
  };

  return { data, isLoading, error, createTenant, updateTenant, deleteTenant };
}
