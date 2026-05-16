import { NextResponse } from 'next/server'
import { redis, TODOS_KEY } from '@/lib/redis'
import type { Todo } from '@/types/todo'

export async function GET() {
  const todos = await redis.get<Todo[]>(TODOS_KEY)
  return NextResponse.json(todos ?? [])
}

export async function POST(request: Request) {
  const todo: Todo = await request.json()
  const todos = (await redis.get<Todo[]>(TODOS_KEY)) ?? []
  const updated = [todo, ...todos]
  await redis.set(TODOS_KEY, updated)
  return NextResponse.json(todo, { status: 201 })
}
