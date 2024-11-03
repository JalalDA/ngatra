import Logo from '@/components/logo'
import Header from '@/components/navbar'
import OrganizationForm from '@/components/setup/OrganizationForm'
import React from 'react'

type Props = {}

const SetupWeb = (props: Props) => {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <div className="flex items-center justify-between bg-white p-4">
            <Logo/>
            <button>Logout</button>
        </div>
        <div className="flex items-center justify-center flex-col gap-y-4 mt-8">
            <div className="text-xl font-bold text-gray-900">Masukan Detail Organisasi Anda</div>
            <div className="text-sm text-gray-500">Berikan detail informasi organisasi atau perusahaan anda</div>
            <OrganizationForm/>
        </div>
    </div>
  )
}

export default SetupWeb