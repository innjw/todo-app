export type Priority = 'high' | 'medium' | 'low'
export type Category = 'work' | 'personal' | 'shopping' | 'other'
export type FilterType = 'all' | 'active' | 'completed' | Category

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: Priority
  category: Category
  createdAt: number
}

export const CATEGORY_CONFIG: Record<Category, { label: string; color: string }> = {
  work: { label: '업무', color: 'bg-blue-100 text-blue-700' },
  personal: { label: '개인', color: 'bg-violet-100 text-violet-700' },
  shopping: { label: '쇼핑', color: 'bg-emerald-100 text-emerald-700' },
  other: { label: '기타', color: 'bg-gray-100 text-gray-600' },
}

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  high: { label: '높음', color: 'bg-red-100 text-red-700 border-red-200' },
  medium: { label: '보통', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  low: { label: '낮음', color: 'bg-gray-100 text-gray-600 border-gray-200' },
}

export const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행중' },
  { value: 'completed', label: '완료' },
  { value: 'work', label: '업무' },
  { value: 'personal', label: '개인' },
  { value: 'shopping', label: '쇼핑' },
  { value: 'other', label: '기타' },
]
