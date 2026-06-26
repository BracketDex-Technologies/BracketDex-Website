import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectCardProps = {
  title: string;
  category: string;
  industry: string;
  description: string;
};

export function ProjectCard({
  category,
  description,
  industry,
  title,
}: ProjectCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-soft">
      <CardHeader>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
          <span>{category}</span>
          <span aria-hidden="true">/</span>
          <span>{industry}</span>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed border-border bg-muted p-4 text-sm text-muted-foreground">
          Real screenshots and measurable outcomes are required before this card becomes a public case study.
        </div>
      </CardContent>
    </Card>
  );
}

