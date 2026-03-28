import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, Priority, Category } from "@/types/todo";
import mockTodos from "@/mocks/todos.json";

interface TodoStore {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  categoryFilter: Category | "all";
  addTodo: (title: string, priority: Priority, category: Category, dueDate?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
  setCategoryFilter: (category: Category | "all") => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: mockTodos as Todo[],
      filter: "all",
      categoryFilter: "all",

      addTodo: (title, priority, category, dueDate) =>
        set((state) => ({
          todos: [
            {
              id: Date.now().toString(),
              title,
              completed: false,
              priority,
              category,
              createdAt: new Date().toISOString(),
              dueDate,
            },
            ...state.todos,
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      setFilter: (filter) => set({ filter }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    { name: "todo-storage" }
  )
);
