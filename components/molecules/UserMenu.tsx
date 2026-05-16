'use client'

import { signOut, useSession } from 'next-auth/react'

export function UserMenu() {
  const { data: session } = useSession()

  if (!session?.user) return null

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground truncate max-w-[200px]">
        {session.user.email}
      </span>
      <button
        onClick={() => signOut()}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border"
      >
        로그아웃
      </button>
    </div>
  )
}
