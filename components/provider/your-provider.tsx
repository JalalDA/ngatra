import { Button } from '@tremor/react'
import { ArrowUp } from 'lucide-react'
import React from 'react'
import ProviderItem from './provider-item'

type Props = {}

const YourProvider = (props: Props) => {
    let data = [
        {
            name: "Global SMM",
            url: 'https://global-smm.com',
            icon: <ArrowUp className='rotate-45 h-6 w-6' />
        },
        {
            name: "Sochype",
            url: 'https://global-smm.com',
            icon: <ArrowUp className='rotate-45 h-6 w-6' />
        },
        {
            name: "Dnox SMM",
            url: 'https://global-smm.com',
            icon: <ArrowUp className='rotate-45 h-6 w-6' />
        },
        {
            name: "Partner Soc",
            url: 'https://global-smm.com',
            icon: <ArrowUp className='rotate-45 h-6 w-6' />
        },
        {
            name: "1x Panel",
            url: 'https://global-smm.com',
            icon: <ArrowUp className='rotate-45 h-6 w-6' />
        },
        {
            name: "Tea Teagram",
            url: 'https://global-smm.com',
            icon: <ArrowUp className='rotate-45 h-6 w-6' />
        },
    ]
    return (
        <div className="border-gray-900 rounded-lg border-2 w-[80%] shadow-md">
            {
                data.map((item, index) => (
                    <ProviderItem item={item.name} url={item.url} Icon={item.icon} key={index}/>
                ))
            }
            <div className="flex items-center justify-center border-t border-gray-900 p-4">
                <Button>Add Provider</Button>
            </div>
        </div>
    )
}

export default YourProvider