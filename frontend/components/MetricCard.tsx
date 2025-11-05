import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  trend?: "up" | "down";
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  trend,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("bg-white", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <p
            className={cn(
              "text-xs mt-1",
              trend === "up" ? "text-green-600" : "text-red-600"
            )}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

