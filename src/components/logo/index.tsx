import Link from 'next/link'
import React from 'react'
import { RiShoppingBag2Fill } from 'react-icons/ri'

type Props = {}

const Logo = (props: Props) => {
  return (
    <div className="w-60 max-w-full px-4 xl:mr-12">
    <Link
      href="/">
      <div className="text-2xl font-extrabold flex items-center justify-start gap-x-4">
        <RiShoppingBag2Fill />
        NGATRA
      </div>
    </Link>
  </div>
  )
}

export default Logo