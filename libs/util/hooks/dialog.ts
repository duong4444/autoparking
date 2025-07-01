import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const useDialogState = (defaultState = false) => {
  const [open, setOpen] = useState(defaultState)
  console.log("open trong hook: ",open);
  

  const pathname = usePathname()
  const initialPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== initialPathname.current) {
      setOpen(false)
      initialPathname.current = pathname
    }
  }, [pathname, open])

  return [open, setOpen] as const
}
