import { Badge } from '@/components/ui/badge'
import { type Priority, PRIORITY_CONFIG } from '@/types/todo'

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, color } = PRIORITY_CONFIG[priority]

  return (
    <Badge variant="outline" className={`text-xs font-medium ${color}`}>
      {label}
    </Badge>
  )
}
