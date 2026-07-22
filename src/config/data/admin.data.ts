import { Users, Building2, Activity, ShieldAlert, TrendingUp, Globe } from "lucide-react";

export const adminStatsData = [
  { 
    label: "Total Tenants", 
    value: "142", 
    change: "+8 this month", 
    icon: Building2, 
    color: "text-primary" 
  },
  { 
    label: "Total Users", 
    value: "3,847", 
    change: "+234 this month", 
    icon: Users, 
    color: "text-primary" 
  },
  { 
    label: "Active Now", 
    value: "312", 
    change: "across all tenants", 
    icon: Activity, 
    color: "text-success" 
  },
  { 
    label: "Security Alerts", 
    value: "3", 
    change: "require attention", 
    icon: ShieldAlert, 
    color: "text-destructive" 
  },
  { 
    label: "MRR", 
    value: "$18,430", 
    change: "+12.4% vs last month", 
    icon: TrendingUp, 
    color: "text-warning" 
  },
  { 
    label: "Regions", 
    value: "4", 
    change: "US, EU, APAC, CA", 
    icon: Globe, 
    color: "text-info" 
  },
];

export const recentTenantsData = [
  { 
    name: "Acme Corp", 
    plan: "Pro", 
    members: 12, 
    created: "Apr 18, 2026", 
    status: "Active" 
  },
  { 
    name: "Globex Inc", 
    plan: "Enterprise", 
    members: 48, 
    created: "Apr 15, 2026", 
    status: "Active" 
  },
  { 
    name: "Initech LLC", 
    plan: "Starter", 
    members: 3, 
    created: "Apr 12, 2026", 
    status: "Active" 
  },
  { 
    name: "Umbrella Co", 
    plan: "Pro", 
    members: 19, 
    created: "Apr 10, 2026", 
    status: "Suspended" 
  },
  { 
    name: "Stark Industries", 
    plan: "Enterprise", 
    members: 87, 
    created: "Apr 8, 2026", 
    status: "Active" 
  },
];
