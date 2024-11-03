import React from 'react'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'

type Props = {}

const Dashboard = async (props: Props) => {
    const session = await auth()
    if(!session?.user?.name){
        redirect('/login')
    }
  return (
    <div>hello {session?.user?.name || ""}</div>
  )
}

export default Dashboard