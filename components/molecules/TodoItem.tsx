'use client'

import { useState } from 'react'
import { Trash2, Pencil, Check, X } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PriorityBadge } from '@/components/atoms/PriorityBadge'
import { CategoryBadge } from '@/components/atoms/CategoryBadge'
import { useTodoStore } from '@/store/todoStore'
import type { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, removeTodo, updateTodo } = useTodoStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') handleCancel()
  }

  return (
    <div
      className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
        todo.completed
          ? 'bg-muted/50 border-border opacity-60'
          : 'bg-card border-border hover:border-foreground/20 hover:shadow-sm'
      }`}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="mt-0.5"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-7 text-sm"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleSave}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              <Check className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleCancel}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <p
            className={`text-sm font-medium leading-snug ${
              todo.completed
                ? 'line-through text-muted-foreground'
                : 'text-foreground'
            }`}
          >
            {todo.text}
          </p>
        )}

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <PriorityBadge priority={todo.priority} />
          <CategoryBadge category={todo.category} />
          <span className="text-xs text-muted-foreground">
            {new Date(todo.createdAt).toLocaleDateString('ko-KR', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {!isEditing && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setIsEditing(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => removeTodo(todo.id)}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}
