import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ServiceCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function ServiceCard({ description, icon: Icon, title }: ServiceCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-soft">
      <CardHeader>
        {Icon ? (
          <div className="mb-2 grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon aria-hidden="true" />
          </div>
        ) : null}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">
          Built for clarity, maintainability, and business value.
        </p>
      </CardContent>
    </Card>
  );
}

