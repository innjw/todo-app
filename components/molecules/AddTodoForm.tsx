"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/todoStore";
import { Priority, Category } from "@/types/todo";

export function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("personal");
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title.trim(), priority, category);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="새 할일을 입력하세요..."
          className="flex-1 bg-white border-gray-200 focus-visible:ring-gray-300 placeholder:text-gray-400"
        />
        <Button
          type="submit"
          className="bg-gray-900 hover:bg-gray-700 text-white px-4 shrink-0"
        >
          <Plus className="h-4 w-4 mr-1" />
          추가
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">우선순위:</span>
          {(["high", "medium", "low"] as Priority[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                priority === p
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
            >
              {p === "high" ? "높음" : p === "medium" ? "보통" : "낮음"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">카테고리:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            <option value="personal">🏠 개인</option>
            <option value="work">💼 업무</option>
            <option value="study">📚 학습</option>
            <option value="health">💪 건강</option>
            <option value="other">📌 기타</option>
          </select>
        </div>
      </div>
    </form>
  );
}
