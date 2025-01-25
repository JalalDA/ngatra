import React from 'react'
import Header from './_components/Header'
import FormOrder from './_components/FormOrder'
import { getSiteData } from '@/lib/fetchers'

type Props = {}

const Order = async ({
    params,
}: {
    params: { domain: string };
}) => {
    const domain = decodeURIComponent(params.domain);
    const [data] = await Promise.all([
        getSiteData(domain),
    ]);
    return (
        <div className='h-screen w-screen'>
            <Header name={data?.name || ""}/>
            <FormOrder />
        </div>
    )
}

export default Order