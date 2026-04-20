import { setRequestLocale } from "next-intl/server";
import { UsersClient, type AdminUser } from "@/modules/admin/UsersClient";

const USERS: AdminUser[] = [
  { name:"Sarah Kim",    email:"sarah@acmecorp.com",  tenant:"Acme Corp",       role:"Admin",  lastSeen:"2 min ago",  status:"Active",    initials:"SK", color:"bg-violet-500" },
  { name:"James Okafor", email:"james@acmecorp.com",  tenant:"Acme Corp",       role:"Member", lastSeen:"1 hr ago",   status:"Active",    initials:"JO", color:"bg-blue-500"   },
  { name:"Tony Stark",   email:"tony@stark.io",       tenant:"Stark Industries", role:"Admin",  lastSeen:"3 hr ago",   status:"Active",    initials:"TS", color:"bg-red-500"    },
  { name:"Pepper Potts", email:"pepper@stark.io",     tenant:"Stark Industries", role:"Member", lastSeen:"Yesterday",  status:"Active",    initials:"PP", color:"bg-rose-400"   },
  { name:"John Smith",   email:"john@umbrella.co",    tenant:"Umbrella Co",      role:"Admin",  lastSeen:"3 days ago", status:"Suspended", initials:"JS", color:"bg-neutral-400"},
  { name:"Priya Sharma", email:"priya@acmecorp.com",  tenant:"Acme Corp",       role:"Member", lastSeen:"5 hr ago",   status:"Active",    initials:"PS", color:"bg-pink-500"   },
  { name:"Carlos Ruiz",  email:"carlos@globex.com",   tenant:"Globex Inc",      role:"Member", lastSeen:"2 days ago", status:"Active",    initials:"CR", color:"bg-amber-500"  },
  { name:"Mei Lin",      email:"mei@initech.com",     tenant:"Initech LLC",     role:"Admin",  lastSeen:"1 day ago",  status:"Active",    initials:"ML", color:"bg-emerald-500"},
];

export default async function AdminUsersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="mx-auto max-w-5xl space-y-6 pb-8"><UsersClient initialUsers={USERS} /></div>;
}
