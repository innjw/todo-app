'use client'

import { useTodoStore } from '@/store/todoStore'
import { TodoItem } from '@/components/molecules/TodoItem'

export function TodoList() {
  const { getFilteredTodos } = useTodoStore()
  const filtered = getFilteredTodos()

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-4xl mb-3">&#10003;</p>
        <p className="text-muted-foreground text-sm">
          할일이 없습니다. 새로운 할일을 추가해보세요!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {filtered.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
