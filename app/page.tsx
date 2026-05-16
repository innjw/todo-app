import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import TodoApp from './_components/TodoApp'

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return <TodoApp />
}
