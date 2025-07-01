'use client'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import { Button } from '../atoms/Button'

export const LogoutButton = () => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        signOut()
      }}
      className="flex gap-2"
    >
      <IconLogout /> Logout
    </Button>
  )
}
