"use client";

import { useTodoStore } from "@/store/todoStore";
import { Category } from "@/types/todo";
import { Button } from "@/components/ui/button";

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "work", label: "💼 업무" },
  { value: "personal", label: "🏠 개인" },
  { value: "study", label: "📚 학습" },
  { value: "health", label: "💪 건강" },
  { value: "other", label: "📌 기타" },
];

export function FilterBar() {
  const { todos, filter, categoryFilter, setFilter, setCategoryFilter, clearCompleted } =
    useTodoStore();

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="space-y-3">
      {/* Status filter */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition-all ${
              filter === f
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {f === "all" ? `전체 ${todos.length}` : f === "active" ? `진행중 ${activeCount}` : `완료 ${completedCount}`}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 flex-wrap">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setCategoryFilter(value)}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              categoryFilter === value
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Clear completed */}
      {completedCount > 0 && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCompleted}
            className="text-xs text-gray-400 hover:text-red-500 h-7"
          >
            완료된 항목 삭제 ({completedCount})
          </Button>
        </div>
      )}
    </div>
  );
}
