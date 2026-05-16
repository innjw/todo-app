'use client'

import { useTodoStore } from '@/store/todoStore'

export function StatsBar() {
  const { getStats } = useTodoStore()
  const { total, completed, active } = getStats()
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="space-y-3">
      {/* Stat counters */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="전체" value={total} />
        <StatCard label="진행중" value={active} />
        <StatCard label="완료" value={completed} />
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">진행률</span>
          <span className="text-xs font-semibold text-foreground">
            {progress}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center p-3 rounded-xl bg-muted/50 border border-border">
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  )
}
