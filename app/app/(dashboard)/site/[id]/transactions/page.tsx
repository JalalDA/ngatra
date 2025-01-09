import db from '@/lib/db'
import { transaction } from '@/lib/schema'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params : {
        id : string
    }
}

const Transactions = async ({params}: Props) => {
    const id = params.id
    const session = await getSession();
    if (!session) {
      redirect("/login");
    }
    const siteVendor = await db.query.transaction
    .findMany({
      where: (transaction, { eq }) => eq(transaction.siteId, decodeURIComponent(params.id))
    });
    console.log({transaction});
    
  return (
    <div>Transactions</div>
  )
}

export default Transactions