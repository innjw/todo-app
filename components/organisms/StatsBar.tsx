"use client";

import { useTodoStore } from "@/store/todoStore";

export function StatsBar() {
  const { todos } = useTodoStore();
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">오늘의 진행률</span>
        <span className="text-xs font-semibold text-gray-700">{completed}/{total} 완료</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-800 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 text-right">{progress}%</p>
    </div>
  );
}
