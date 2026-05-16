'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTodoStore } from '@/store/todoStore'
import {
  type Priority,
  type Category,
  PRIORITY_CONFIG,
  CATEGORY_CONFIG,
} from '@/types/todo'

const PRIORITIES: Priority[] = ['high', 'medium', 'low']
const CATEGORIES: Category[] = ['work', 'personal', 'shopping', 'other']

export function AddTodoForm() {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState<Category>('personal')
  const { addTodo } = useTodoStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addTodo(text, priority, category)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="새 할일을 입력하세요..."
          className="flex-1"
        />
        <Button type="submit" className="shrink-0">
          <Plus className="h-4 w-4 mr-1" />
          추가
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">우선순위:</span>
          {PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                priority === p
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-foreground/30'
              }`}
            >
              {PRIORITY_CONFIG[p].label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">카테고리:</span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                category === c
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-foreground/30'
              }`}
            >
              {CATEGORY_CONFIG[c].label}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}
