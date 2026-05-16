'use client'

import { useEffect } from 'react'
import { AddTodoForm } from '@/components/molecules/AddTodoForm'
import { TodoList } from '@/components/organisms/TodoList'
import { FilterBar } from '@/components/organisms/FilterBar'
import { StatsBar } from '@/components/organisms/StatsBar'
import { Separator } from '@/components/ui/separator'
import { UserMenu } from '@/components/molecules/UserMenu'
import { useTodoStore } from '@/store/todoStore'

export default function Home() {
  const fetchTodos = useTodoStore((s) => s.fetchTodos)

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Todo App
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </p>
          </div>
          <UserMenu />
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsBar />
        </div>

        <Separator className="mb-6" />

        {/* Add Todo */}
        <div className="mb-6">
          <AddTodoForm />
        </div>

        {/* Filters */}
        <div className="mb-4">
          <FilterBar />
        </div>

        {/* Todo List */}
        <TodoList />
      </div>
    </div>
  )
}
