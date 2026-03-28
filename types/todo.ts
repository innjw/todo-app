export type Priority = "low" | "medium" | "high";
export type Category = "personal" | "work" | "study" | "health" | "other";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: string;
  dueDate?: string;
}
