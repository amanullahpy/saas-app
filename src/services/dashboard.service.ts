import { apiClient } from "./api-client";

export interface StatItem {
  id: string;
  value: string;
  change: string;
}

export interface ActivityItem {
  id: number;
  letter: string;
  title: string;
  description: string;
  time: string;
}

export const dashboardService = {
  async getStats(): Promise<StatItem[]> {
    return apiClient.get<StatItem[]>("/dashboard/stats");
  },

  async getActivity(): Promise<ActivityItem[]> {
    return apiClient.get<ActivityItem[]>("/dashboard/activity");
  },
};
