import Link from 'next/link';
import React from 'react'

type Props = {
    item: string;
    url: string;
    Icon?: React.ReactNode
}

const ProviderItem = ({
    item,
    url,
    Icon,
}: Props) => {
    return (
        <Link href={`/${url}`} className='p-4 border-b flex items-center gap-x-4 border-gray-900'>
            <div className="text-md font-semobold">{item}</div>
            {Icon && Icon}
        </Link>
    )
}

export default ProviderItem