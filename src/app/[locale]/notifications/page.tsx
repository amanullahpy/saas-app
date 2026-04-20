import { MainShell } from "@/ui/layout/MainShell";
import { setRequestLocale } from "next-intl/server";
import { NotificationsClient, type Notification } from "@/modules/notifications/NotificationsClient";

const NOTIFICATIONS: Notification[] = [
  { id:1, type:"billing",  iconName:"CreditCard",    color:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", title:"Payment successful",      body:"Your Pro plan invoice of $29.00 was paid successfully.",                                          time:"2 min ago",  read:false },
  { id:2, type:"team",     iconName:"UserPlus",      color:"bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",             title:"New member joined",       body:"Priya Sharma accepted your invitation and joined the workspace.",                              time:"1 hr ago",   read:false },
  { id:3, type:"security", iconName:"ShieldCheck",   color:"bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",         title:"New login detected",      body:"A new sign-in from Chrome on macOS was detected in San Francisco, CA.",                      time:"3 hr ago",   read:false },
  { id:4, type:"system",   iconName:"Zap",           color:"bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",     title:"System update complete",  body:"Platform updated to v2.4.1. See changelog for new features.",                               time:"Yesterday",  read:true  },
  { id:5, type:"alert",    iconName:"AlertTriangle", color:"bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",                 title:"Storage limit approaching",body:"You've used 84% of your 10 GB storage. Consider upgrading your plan.",                       time:"Yesterday",  read:true  },
  { id:6, type:"chat",     iconName:"MessageSquare", color:"bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",             title:"New message from AI",     body:"Your weekly analytics summary is ready. Revenue is up 12% this week.",                      time:"2 days ago", read:true  },
  { id:7, type:"team",     iconName:"UserPlus",      color:"bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",             title:"Role updated",            body:"James Okafor's role was changed from Viewer to Member by Sarah Kim.",                       time:"3 days ago", read:true  },
  { id:8, type:"billing",  iconName:"CreditCard",    color:"bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400", title:"Upcoming renewal",        body:"Your Pro plan renews on May 1, 2026. Ensure your payment method is up to date.",           time:"4 days ago", read:true  },
];

export default async function NotificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MainShell><div className="space-y-8"><NotificationsClient initialNotifications={NOTIFICATIONS} /></div></MainShell>;
}
