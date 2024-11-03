"use client"
import { signUpCredentials } from '@/lib/action'
import React, { useActionState } from 'react'
import { useFormState } from 'react-dom'
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerSchema } from '@/lib/zod';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { RiLoader2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type Props = {}

export type RegisterSchema = {
  name: string
  email: string
  password: string
}

const FormRegister = (props: Props) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterSchema>();
  const router = useRouter()
  return (
    <form method='POST' onSubmit={handleSubmit(async (data) => {
      try {
        const response = await signUpCredentials(data)
        response?.success ? toast.success(response.message || "") : toast.error(response?.message || "")
        if (response?.success) {
          router.push(`/login`)
        }
      } catch (error: any) {
        toast.error(error?.message || "Terjadi kesalahan")
      }
    })} className='space-y-6 w-full md:w-2/3'>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor="name" className='mb-1 text-sm font-bold text-gray-900'>Name</label>
        <input
          {...register("name", { required: "Nama wajib di isi" })}
          id='name'
          name='name'
          type="text"
          className='mb-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-lg p-2.5 border border-gray-300'
          placeholder='Name . . .'
        />
        <div aria-atomic="true" aria-live='polite'>
          <span className='text-sm text-red-500'>{errors.name?.message}</span>
        </div>
      </div>

      {/* email */}
      <div className='flex flex-col gap-y-2'>
        <label htmlFor="email" className='mb-1 text-sm font-bold text-gray-900'>Email</label>
        <input
          {...register("email", { required: "Email wajib di isi" })}
          id='email'
          name='email'
          type="text"
          className='mb-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-lg p-2.5 border border-gray-300'
          placeholder='Email . . .'
        />
        <div aria-atomic="true" aria-live='polite'>
          <span className='text-sm text-red-500'>{errors.email?.message}</span>
        </div>
      </div>

      {/* password */}
      <div className='flex flex-col gap-y-2'>
        <label htmlFor="password" className='mb-1 text-sm font-bold text-gray-900'>Password</label>
        <input
          {...register("password", { required: "Password wajib di isi" })}
          id='password'
          name='password'
          type="password"
          className='mb-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-lg p-2.5 border border-gray-300'
          placeholder='Password . . .'
        />
        <div aria-atomic="true" aria-live='polite'>
          <span className='text-sm text-red-500'>{errors.password?.message}</span>
        </div>
      </div>


      <button type='submit' className='bg-gray-900 hover:bg-gray-700 text-white font-bold w-full py-2 rounded-lg flex items-center justify-center'>
        {isSubmitting ? <RiLoader2Line className='animate-spin text-white' /> : "Daftar"}
      </button>
    </form>
  )
}

export default FormRegister