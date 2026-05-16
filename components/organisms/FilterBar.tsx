'use client'

import { useTodoStore } from '@/store/todoStore'
import { Button } from '@/components/ui/button'
import { FILTER_OPTIONS, type FilterType } from '@/types/todo'

const STATUS_FILTERS: FilterType[] = ['all', 'active', 'completed']
const CATEGORY_FILTERS: FilterType[] = ['work', 'personal', 'shopping', 'other']

export function FilterBar() {
  const { filter, setFilter, clearCompleted, getStats } = useTodoStore()
  const { completed } = getStats()

  const statusOptions = FILTER_OPTIONS.filter((o) =>
    STATUS_FILTERS.includes(o.value)
  )
  const categoryOptions = FILTER_OPTIONS.filter((o) =>
    CATEGORY_FILTERS.includes(o.value)
  )

  return (
    <div className="space-y-3">
      {/* Status filter - pill toggle */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl">
        {statusOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-all ${
              filter === value
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category filter - chips */}
      <div className="flex gap-1.5 flex-wrap">
        {categoryOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(filter === value ? 'all' : value)}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              filter === value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-foreground/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Clear completed */}
      {completed > 0 && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCompleted}
            className="text-xs text-muted-foreground hover:text-destructive h-7"
          >
            완료된 항목 삭제 ({completed})
          </Button>
        </div>
      )}
    </div>
  )
}
