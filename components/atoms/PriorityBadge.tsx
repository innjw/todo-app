import { Badge } from "@/components/ui/badge";
import { Priority } from "@/types/todo";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: "높음", className: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "보통", className: "bg-amber-100 text-amber-700 border-amber-200" },
  low: { label: "낮음", className: "bg-gray-100 text-gray-600 border-gray-200" },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = priorityConfig[priority];
  return (
    <Badge variant="outline" className={`text-xs font-medium ${className}`}>
      {label}
    </Badge>
  );
}
