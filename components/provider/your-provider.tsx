import { Button } from '@tremor/react'
import { ArrowUp, PlusCircleIcon, SearchIcon } from 'lucide-react'
import React from 'react'
import ProviderItem from './provider-item'
import AddDirectProvider from './add-direct-provider'
import AddDirectProviderModal from './add-direct-provider-modal'

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
        <div className="border rounded-lg shadow-md">
            <div className="h-60 w-full flex items-center justify-center gap-x-4">
                <SearchIcon size={18} color='blue' className='animate-bounce'/> 
                <h5 className='font-semibold'>Add providers to buy services from them</h5>
            </div>
            <div className="flex items-center justify-center border-t p-4">
                <AddDirectProvider>
                    <AddDirectProviderModal/>
                </AddDirectProvider>
            </div>
        </div>
    )
}

export default YourProvider