import React from 'react'
import { RiShoppingBag2Fill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <div className="bg-gray-300 min-h-screen w-full flex items-start justify-between">
            <div className="md:w-1/2 w-full bg-white min-h-screen p-4">
                <div className="text-2xl font-extrabold flex items-center justify-start gap-x-4">
                    <RiShoppingBag2Fill />
                    NGATRA
                </div>
                {
                    children
                }
            </div>
            <ToastContainer autoClose={500} />
        </div>
    )
}

export default AuthLayout