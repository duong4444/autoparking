// IsLoggedIn.tsx
"use client"

import { ReactNode } from "react"
import { useSession } from "next-auth/react"
import { LoaderPanel } from "../molecules/Loader"
import { AlertSection } from "../molecules/AlertSection"
import Link from "next/link"
import { Button } from '../atoms/Button'

type RenderPropChild = (uid: string) => ReactNode

export const IsLoggedIn = ({
  children,
  notLoggedIn,
}: {
  children: RenderPropChild | ReactNode
  notLoggedIn?: ReactNode
}) => {
  const { status, data } = useSession()

  if (status === "loading") {
    return <LoaderPanel text="Loading user..." />
  }

  // chưa login
  if (!data?.user?.uid) {
    if (notLoggedIn) {
      return <>{notLoggedIn}</>
    } else {
      return (
        <AlertSection title="You are not logged in">
          <Link href="/login">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6">
              Login
            </Button>
          </Link>
        </AlertSection>
      )
    }
  }

  return (
    <>
      {typeof children === "function"
        ? (children as RenderPropChild)(data.user.uid)
        : children}
    </>
  )
}
