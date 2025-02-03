import BackButton from '@/components/atoms/back-button';
import { Input } from '@/components/ui/input';
import { getSiteData } from '@/lib/fetchers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const RegPage = async ({
    params,
}: {
    params: { domain: string };
}) => {
    const domain = decodeURIComponent(params.domain);
    const [data] = await Promise.all([
        getSiteData(domain),
    ]);
    return (
        <div className="min-h-screen w-screen bg-white text-gray-800">
            <div className="flex items-center justify-between p-4 border-b">
                <BackButton />
                <div className="flex items-center gap-x-4">
                    <Image className='rounded-full' src={data?.image || ""} alt='logo' width={42} height={42} />
                </div>
                <div className="flex items-center gap-x-4">
                    <div className="font-semibold">Menu</div>
                </div>
            </div>
            <form className='flex items-center flex-col gap-y-4 p-8' action="">
                <div className="flex items-center gap-x-4 border rounded-md p-2 px-4 hover:shadow-md cursor-pointer">
                    <Image src={"/google-button.png"} alt='google button' height={32} width={32} />
                    <div className="text-md">Continue with google</div>
                </div>
                <div className='flex flex-col gap-y-2 md:w-1/3'>
                    <label htmlFor="">Email</label>
                    <Input type='text' />
                </div>
                <div className='flex flex-col gap-y-2 md:w-1/3'>
                    <label htmlFor="">Username</label>
                    <Input type='text' />
                </div>
                <div className='flex flex-col gap-y-2 md:w-1/3'>
                    <label htmlFor="">Password</label>
                    <Input type='text' />
                </div>
                <button
                    type="button"
                    className="rounded-md border md:w-1/3 border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-600 bg-gray-800 text-white dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Create Account
                </button>
                <Link href={"/auth"} className='md:w-1/3 flex items-center'>
                <button
                    type="button"
                    className="rounded-md border md:w-1/3 border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Sign in
                </button>
                </Link>
            </form>
        </div>
    )
}

export default RegPage