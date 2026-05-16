import { NextResponse } from 'next/server'
import { redis, TODOS_KEY } from '@/lib/redis'
import type { Todo } from '@/types/todo'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const patch: Partial<Todo> = await request.json()
  const todos = (await redis.get<Todo[]>(TODOS_KEY)) ?? []
  const updated = todos.map((t) => (t.id === id ? { ...t, ...patch } : t))
  await redis.set(TODOS_KEY, updated)
  return NextResponse.json(updated.find((t) => t.id === id))
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  const todos = (await redis.get<Todo[]>(TODOS_KEY)) ?? []
  const updated = todos.filter((t) => t.id !== id)
  await redis.set(TODOS_KEY, updated)
  return new NextResponse(null, { status: 204 })
}
