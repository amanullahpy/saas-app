import { useState, useEffect } from "react";
import { dashboardService, StatItem, ActivityItem } from "@/services/dashboard.service";

export function useDashboardStats() {
  const [data, setData] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const stats = await dashboardService.getStats();
        setData(stats);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stats");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export function useDashboardActivity() {
  const [data, setData] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const activity = await dashboardService.getActivity();
        setData(activity);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch activity");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
