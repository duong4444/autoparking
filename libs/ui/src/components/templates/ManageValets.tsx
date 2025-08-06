'use client'
import { AddValet } from '../organisms/AddValet'
import { ListValets } from '../organisms/ListValets'

export const ManageValets = () => {
  return (
    <div>
      <div className="flex justify-end">
        {/* dialog_form */}
        <AddValet />
      </div>
      {/* pagination _ ShowData */}
      <ListValets />
    </div>
  )
}
