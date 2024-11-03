"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignInSchema, signInSchema } from '@/lib/types';
import { RiLoader2Fill, RiLoader2Line } from 'react-icons/ri';
import { signInCreadentials } from '@/lib/action';
import { toast } from 'react-toastify';

type Props = {}

const FormLogin = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setError,
    setValue
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema)
  });


  const onSubmit = async (data: TSignInSchema) => {
    const response = await signInCreadentials(data)
    response?.success ? toast.success(response.message || "Login success") : toast.error(response?.message || "Terjadi kesalahan")
    reset()
  }

  return (
    <form className='space-y-6 w-full md:w-2/3' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-y-2'>
        <label className='mb-1 text-sm font-bold text-gray-900' htmlFor="email">Email</label>
        <input
          className='mb-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-lg p-2.5 border border-gray-300'
          {...register("email")}
          id='email'
          name='email'
          type="text"
          placeholder='Email' />
        {
          errors.email && <div className="text-sm text-red-500">{`${errors?.email?.message}`}</div>
        }
      </div>
      <div className='flex flex-col gap-y-2'>
        <label className='mb-1 text-sm font-bold text-gray-900' htmlFor="password">password</label>
        <input
          className='mb-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-lg p-2.5 border border-gray-300'
          {...register("password")}
          id='password'
          name='password'
          type="text"
          placeholder='password' />
        {
          errors.password && <div className="text-sm text-red-500">{`${errors?.password?.message}`}</div>
        }
      </div>
      <button disabled={isSubmitting} type='submit' className='bg-gray-900 hover:bg-gray-700 text-white font-bold w-full py-2 rounded-lg flex items-center justify-center'>
        {isSubmitting ? <RiLoader2Line className='animate-spin text-white'/>: "Masuk"}
      </button>
    </form>
  )
}

export default FormLogin