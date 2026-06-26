import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type IndustryCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function IndustryCard({ description, icon: Icon, title }: IndustryCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-soft">
      <CardHeader>
        {Icon ? (
          <div className="mb-2 grid size-10 place-items-center rounded-lg bg-secondary/15 text-secondary">
            <Icon aria-hidden="true" />
          </div>
        ) : null}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

