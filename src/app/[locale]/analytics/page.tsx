import { MainShell } from "@/ui/layout/MainShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setRequestLocale } from "next-intl/server";
import { OverviewChart } from "@/modules/dashboard/components/OverviewChart";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MainShell>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Analytics & Insights
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Deep dive into your data with advanced charting and filters.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <OverviewChart />
          <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium">User Segmentation</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-48 h-48 rounded-full border-8 border-primary border-t-transparent animate-spin-slow mx-auto" />
                <p className="text-sm text-muted-foreground">Generating segmentation data...</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Key Metric {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(Math.random() * 100).toFixed(1)}%</div>
                <div className="w-full bg-muted/50 h-2 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainShell>
  );
}
