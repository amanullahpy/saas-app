"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for small projects and side hustles.",
    features: ["Up to 3 projects", "Basic analytics", "Standard support", "1GB storage"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "The complete toolkit for scaling your SaaS business.",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "10GB storage", "Custom domain"],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99+",
    description: "Enterprise-grade features for large teams.",
    features: ["Dedicated support", "SLA uptime guarantee", "Custom integrations", "SSO & SAML", "Unlimited storage"],
    buttonText: "Contact Sales",
    popular: false,
  },
];

export function PricingPlans() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <Card 
          key={plan.name} 
          className={cn(
            "relative flex flex-col border-none shadow-sm h-full",
            plan.popular && "ring-2 ring-primary bg-card scale-105 z-10"
          )}
        >
          {plan.popular && (
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Popular
              </span>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
            <ul className="space-y-2.5 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full h-11" 
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
