"use client"
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'


const BackButton = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }
    return (
        <div onClick={handleBack} className="flex items-center gap-x-2 cursor-pointer">
            <ArrowLeftIcon className='w-6 h-6' />
            <div className="text-md">Go to main page</div>
        </div>
    )
}

export default BackButton