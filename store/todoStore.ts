import { create } from 'zustand'
import type { Todo, Priority, Category, FilterType } from '@/types/todo'

interface TodoState {
  todos: Todo[]
  filter: FilterType
  loading: boolean

  fetchTodos: () => Promise<void>
  addTodo: (text: string, priority: Priority, category: Category) => Promise<void>
  removeTodo: (id: string) => Promise<void>
  toggleTodo: (id: string) => Promise<void>
  updateTodo: (id: string, text: string) => Promise<void>
  setFilter: (filter: FilterType) => void
  clearCompleted: () => Promise<void>

  getFilteredTodos: () => Todo[]
  getStats: () => { total: number; completed: number; active: number }
}

export const useTodoStore = create<TodoState>()((set, get) => ({
  todos: [],
  filter: 'all',
  loading: false,

  fetchTodos: async () => {
    set({ loading: true })
    const res = await fetch('/api/todos')
    const todos: Todo[] = await res.json()
    set({ todos, loading: false })
  },

  addTodo: async (text, priority, category) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
    }
    set((s) => ({ todos: [todo, ...s.todos] }))
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
  },

  removeTodo: async (id) => {
    set((s) => ({ todos: s.todos.filter((t) => t.id !== id) }))
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
  },

  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id)
    if (!todo) return
    const completed = !todo.completed
    set((s) => ({
      todos: s.todos.map((t) => (t.id === id ? { ...t, completed } : t)),
    }))
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
  },

  updateTodo: async (id, text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    set((s) => ({
      todos: s.todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t)),
    }))
    await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: trimmed }),
    })
  },

  setFilter: (filter) => set({ filter }),

  clearCompleted: async () => {
    const completed = get().todos.filter((t) => t.completed)
    set((s) => ({ todos: s.todos.filter((t) => !t.completed) }))
    await Promise.all(
      completed.map((t) => fetch(`/api/todos/${t.id}`, { method: 'DELETE' }))
    )
  },

  getFilteredTodos: () => {
    const { todos, filter } = get()
    switch (filter) {
      case 'all': return todos
      case 'active': return todos.filter((t) => !t.completed)
      case 'completed': return todos.filter((t) => t.completed)
      default: return todos.filter((t) => t.category === filter)
    }
  },

  getStats: () => {
    const { todos } = get()
    const completed = todos.filter((t) => t.completed).length
    return { total: todos.length, completed, active: todos.length - completed }
  },
}))
