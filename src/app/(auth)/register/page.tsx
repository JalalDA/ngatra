import FormRegister from '@/components/auth/form-register'
import Link from 'next/link'
import React from 'react'
import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'

type Props = {}

const Register = async  (props: Props) => {
  const session = await auth()
  if(session?.user?.email){
    redirect("/dashboard")
  }
  return (
    <div className="flex items-center justify-center mt-20 flex-col gap-y-8">
        <div className="text-2xl font-bold">Daftar Akun Baru</div>
        <FormRegister/>
        <div className="flex items-center justify-start gap-x-2">
        <div className='text-sm'>Sudah punya akun?</div>
        <Link className='cursor-pointer text-sm text-blue-500 font-bold' href={"/login"}>Masuk</Link>
      </div>
    </div>
  )
}

export default Register