"use client";

import { useMemo } from "react";
import { useTodoStore } from "@/store/todoStore";
import { TodoItem } from "@/components/molecules/TodoItem";
import { Separator } from "@/components/ui/separator";

export function TodoList() {
  const { todos, filter, categoryFilter } = useTodoStore();

  const filtered = useMemo(() => {
    return todos.filter((todo) => {
      const statusMatch =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed);
      const categoryMatch =
        categoryFilter === "all" || todo.category === categoryFilter;
      return statusMatch && categoryMatch;
    });
  }, [todos, filter, categoryFilter]);

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-3xl mb-3">✅</p>
        <p className="text-gray-400 text-sm">할일이 없어요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filtered.map((todo, index) => (
        <div key={todo.id}>
          <TodoItem todo={todo} />
          {index < filtered.length - 1 && (
            <Separator className="my-1 opacity-0" />
          )}
        </div>
      ))}
    </div>
  );
}
