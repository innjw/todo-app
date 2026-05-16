import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { redis } from '@/lib/redis'
import type { Todo } from '@/types/todo'

function todosKey(userId: string) {
  return `todos:${userId}`
}

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const key = todosKey(session.user.email)
  const patch: Partial<Todo> = await request.json()
  const todos = (await redis.get<Todo[]>(key)) ?? []
  const updated = todos.map((t) => (t.id === id ? { ...t, ...patch } : t))
  await redis.set(key, updated)
  return NextResponse.json(updated.find((t) => t.id === id))
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const key = todosKey(session.user.email)
  const todos = (await redis.get<Todo[]>(key)) ?? []
  const updated = todos.filter((t) => t.id !== id)
  await redis.set(key, updated)
  return new NextResponse(null, { status: 204 })
}
