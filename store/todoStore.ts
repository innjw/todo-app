import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Todo, Priority, Category, FilterType } from '@/types/todo'

interface TodoState {
  todos: Todo[]
  filter: FilterType

  addTodo: (text: string, priority: Priority, category: Category) => void
  removeTodo: (id: string) => void
  toggleTodo: (id: string) => void
  updateTodo: (id: string, text: string) => void
  setFilter: (filter: FilterType) => void
  clearCompleted: () => void

  getFilteredTodos: () => Todo[]
  getStats: () => { total: number; completed: number; active: number }
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',

      addTodo: (text, priority, category) => {
        const trimmed = text.trim()
        if (!trimmed) return

        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text: trimmed,
          completed: false,
          priority,
          category,
          createdAt: Date.now(),
        }
        set((state) => ({ todos: [newTodo, ...state.todos] }))
      },

      removeTodo: (id) => {
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }))
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        }))
      },

      updateTodo: (id, text) => {
        const trimmed = text.trim()
        if (!trimmed) return

        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, text: trimmed } : t
          ),
        }))
      },

      setFilter: (filter) => set({ filter }),

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((t) => !t.completed),
        }))
      },

      getFilteredTodos: () => {
        const { todos, filter } = get()
        switch (filter) {
          case 'all':
            return todos
          case 'active':
            return todos.filter((t) => !t.completed)
          case 'completed':
            return todos.filter((t) => t.completed)
          default:
            return todos.filter((t) => t.category === filter)
        }
      },

      getStats: () => {
        const { todos } = get()
        const completed = todos.filter((t) => t.completed).length
        return {
          total: todos.length,
          completed,
          active: todos.length - completed,
        }
      },
    }),
    {
      name: 'todo-storage',
    }
  )
)
