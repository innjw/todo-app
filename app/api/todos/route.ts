import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { redis } from '@/lib/redis'
import type { Todo } from '@/types/todo'

function todosKey(userId: string) {
  return `todos:${userId}`
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const todos = await redis.get<Todo[]>(todosKey(session.user.email))
  return NextResponse.json(todos ?? [])
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const key = todosKey(session.user.email)
  const todo: Todo = await request.json()
  const todos = (await redis.get<Todo[]>(key)) ?? []
  const updated = [todo, ...todos]
  await redis.set(key, updated)
  return NextResponse.json(todo, { status: 201 })
}
