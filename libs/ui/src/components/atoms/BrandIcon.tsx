import { ReactNode } from 'react'

export interface IBrandIconProps {
  children?: ReactNode
}

export const BrandIcon = ({
  children = <div className={`bg-emerald-500 shadow w-2 h-4 animate-park-car `} />,
}: IBrandIconProps) => {
  return (
    <div className="inline-block overflow-hidden">
      <div
        className={`flex items-center justify-center border-2 border-cyan-500 w-4 h-6`}
      >
        {children}
      </div>
    </div>
  )
}
