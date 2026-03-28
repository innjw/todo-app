"use client";

import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "@/components/atoms/PriorityBadge";
import { CategoryBadge } from "@/components/atoms/CategoryBadge";
import { useTodoStore } from "@/store/todoStore";
import { Todo } from "@/types/todo";

export function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div
      className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
        todo.completed
          ? "bg-gray-50 border-gray-100 opacity-60"
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="mt-0.5 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium leading-snug ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <PriorityBadge priority={todo.priority} />
          <CategoryBadge category={todo.category} />
          {todo.dueDate && (
            <span className="text-xs text-gray-400">
              📅 {todo.dueDate}
            </span>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
