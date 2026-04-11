import { AdminRouteGuard } from "@/modules/auth/components/AdminRouteGuard";
import { AdminShell } from "@/ui/layout/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminRouteGuard>
      <AdminShell>{children}</AdminShell>
    </AdminRouteGuard>
  );
}
