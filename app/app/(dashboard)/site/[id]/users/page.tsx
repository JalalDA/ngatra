import { UserTable } from '@/components/table/user-table'
import React from 'react'

type Props = {}

const Users = (props: Props) => {
  return (
    <div className='text-black'>
      <UserTable/>
    </div>
  )
}

export default Users