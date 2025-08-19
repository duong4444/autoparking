// AlertSection.tsx
import { ReactNode } from "react"
import { IconAlertSquareRoundedFilled } from "@tabler/icons-react"

export interface IAlertSectionProps {
  title?: ReactNode
  children: ReactNode
}

export const AlertSection = ({ title, children }: IAlertSectionProps) => {
  return (
    <div className="min-h-[calc(100vh-8rem)] mt-6 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-amber-50 shadow-lg border border-amber-200 p-6">
        {title ? (
          <div className="flex items-center gap-2 mb-4">
            <IconAlertSquareRoundedFilled className="w-6 h-6 text-amber-500" />
            <h2 className="text-lg font-semibold text-amber-700">{title}</h2>
          </div>
        ) : null}
        <div className="flex flex-col items-center justify-center gap-4 text-center text-amber-800 font-light">
          {children}
        </div>
      </div>
    </div>
  )
}
