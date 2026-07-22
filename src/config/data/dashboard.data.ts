import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

export const statsData = [
  {
    id: "revenue",
    icon: DollarSign,
    value: "$45,231.89",
    change: "+20.1% from last month",
  },
  {
    id: "subscriptions",
    icon: Users,
    value: "+2,350",
    change: "+180.1% from last month",
  },
  {
    id: "sales",
    icon: CreditCard,
    value: "+12,234",
    change: "+19% from last month",
  },
  {
    id: "active_now",
    icon: Activity,
    value: "+573",
    change: "+201 since last hour",
  },
];

export const recentActivityData = [
  {
    id: 1,
    letter: "A",
    title: "New subscription",
    description: "User 1 just upgraded to Pro",
    time: "2m ago",
  },
  {
    id: 2,
    letter: "B",
    title: "New subscription",
    description: "User 2 just upgraded to Pro",
    time: "5m ago",
  },
  {
    id: 3,
    letter: "C",
    title: "New subscription",
    description: "User 3 just upgraded to Pro",
    time: "8m ago",
  },
  {
    id: 4,
    letter: "D",
    title: "New subscription",
    description: "User 4 just upgraded to Pro",
    time: "12m ago",
  },
  {
    id: 5,
    letter: "E",
    title: "New subscription",
    description: "User 5 just upgraded to Pro",
    time: "15m ago",
  },
];
