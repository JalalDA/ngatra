import FormLogin from '@/components/auth/form-login'
import FormRegister from '@/components/auth/form-register'
import Link from 'next/link'
import React from 'react'
import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'

type Props = {}

const Login = async (props: Props) => {
  const session = await auth()
  if(session?.user?.email){
    redirect("/dashboard")
  }
  return (
    <div className="flex items-center justify-center mt-20 flex-col gap-y-8">
      <div className="text-2xl font-bold">Masuk</div>
      <FormLogin />
      <div className="flex items-center justify-start gap-x-2">
        <div className='text-sm'>Belum punya akun?</div>
        <Link className='cursor-pointer text-sm text-blue-500 font-bold' href={"/register"}>Daftar</Link>
      </div>
    </div>
  )
}

export default Login