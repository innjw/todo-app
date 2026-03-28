import { Badge } from "@/components/ui/badge";
import { Category } from "@/types/todo";

const categoryConfig: Record<Category, { label: string; emoji: string }> = {
  work: { label: "업무", emoji: "💼" },
  personal: { label: "개인", emoji: "🏠" },
  study: { label: "학습", emoji: "📚" },
  health: { label: "건강", emoji: "💪" },
  other: { label: "기타", emoji: "📌" },
};

export function CategoryBadge({ category }: { category: Category }) {
  const { label, emoji } = categoryConfig[category];
  return (
    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 font-normal">
      {emoji} {label}
    </Badge>
  );
}
