import { Badge } from '@/components/ui/badge'
import { type Category, CATEGORY_CONFIG } from '@/types/todo'

interface CategoryBadgeProps {
  category: Category
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const { label, color } = CATEGORY_CONFIG[category]

  return (
    <Badge variant="secondary" className={`text-xs font-normal ${color}`}>
      {label}
    </Badge>
  )
}
