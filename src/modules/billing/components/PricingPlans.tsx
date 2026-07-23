"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function PricingPlans() {
  const t = useTranslations("modules.billing");

  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for small projects and side hustles.",
      features: ["Up to 3 projects", "Basic analytics", "Standard support", "1GB storage"],
      buttonText: t("get_started"),
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      description: "The complete toolkit for scaling your SaaS business.",
      features: ["Unlimited projects", "Advanced analytics", "Priority support", "10GB storage", "Custom domain"],
      buttonText: t("upgrade", { plan: "Pro" }),
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99+",
      description: "Enterprise-grade features for large teams.",
      features: ["Dedicated support", "SLA uptime guarantee", "Custom integrations", "SSO & SAML", "Unlimited storage"],
      buttonText: t("contact_sales"),
      popular: false,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
      {plans.map((plan) => (
        <Card 
          key={plan.name}
          variant={plan.popular ? "featured" : "default"}
          className={cn(
            "relative flex flex-col h-full transition-all duration-300",
            plan.popular && "scale-105 z-10 shadow-accent-lg"
          )}
        >
          {plan.popular && (
            <div className="absolute -top-3.5 right-6">
              <span className="bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-accent">
                {t("popular_badge")}
              </span>
            </div>
          )}
          <CardHeader className="space-y-1.5">
            <CardTitle className="text-2xl font-heading text-foreground">{plan.name}</CardTitle>
            <CardDescription className="text-sm leading-relaxed">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6 pt-2 text-start">
            <div className="flex items-baseline gap-1.5 border-b border-border/40 pb-5">
              <span className="text-5xl font-heading text-foreground tracking-tight">{plan.price}</span>
              <span className="text-muted-foreground text-xs font-mono font-medium uppercase tracking-wider">{t("per_month")}</span>
            </div>
            <ul className="space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-foreground/90 text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-4">
            <Button 
              size="xl"
              className="w-full"
              variant={plan.popular ? "gradient" : "outline"}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
