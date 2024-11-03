"use client"
import { TOrganizationSchema, organizationSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import React from 'react'
import { useForm } from 'react-hook-form';
import { RiLoader2Line } from 'react-icons/ri';


type Props = {}

const OrganizationForm = (props: Props) => {

    const Select = dynamic(() => import('react-select'), { ssr: false });

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: '#f9fafb',
            borderColor: '#d1d5db',
            borderRadius: '0.5rem'
        }),
    };

    const industries = [
        {
            label: "Makanan dan Minuman",
            value: 'f&b'
        },
        {
            label: "Toko Kelontong",
            value: 'f&b'
        },
        {
            label: "Retail",
            value: 'f&b'
        },
        {
            label: "B2B",
            value: 'f&b'
        },
        {
            label: "Layanan Dan Jasa",
            value: 'f&b'
        },
        {
            label: "Lainnya",
            value: 'f&b'
        },
    ]

    const employee = [
        {
            label: "1",
            value: "1"
        },
        {
            label: "2 - 5",
            value: "2 - 5"
        },
        {
            label: "6 - 20",
            value: "6 - 20"
        },
        {
            label: "20+",
            value: "20+"
        },
    ]



    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
        setError,
        setValue
    } = useForm<TOrganizationSchema>({
        resolver: zodResolver(organizationSchema)
    });

    const onSubmit = async (data: TOrganizationSchema) => {
        console.log({ data });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white flex flex-col gap-y-4 p-4 rounded-lg md:w-1/3 w-full text-sm'>
            <div className="flex flex-col gap-y-2">
                <label className='font-semibold' htmlFor="name">Nama Organisasi <span className='text-red-500'>*</span></label>
                <input
                    className='mb-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-lg p-2.5 border border-gray-300'
                    {...register("name")}
                    id='name'
                    name='name'
                    type="text"
                    placeholder='ABC Restaurant' />
                {
                    errors.name && <div className="text-sm text-red-500">{`${errors?.name?.message}`}</div>
                }
            </div>
            <div className="flex flex-col gap-y-2">
                <label className='font-semibold' htmlFor="industry_id">Jenis Bisnis Apa Yang Anda Operasikan? <span className='text-red-500'>*</span></label>
                <Select
                    onChange={(e: any) => {
                        setValue("industryId", e.value)
                    }}
                    styles={customStyles}
                    options={industries}
                    placeholder={"Pilih industri"}
                />
                {
                    errors.industryId && <div className="text-sm text-red-500">{`${errors?.industryId?.message}`}</div>
                }
            </div>
            <div className="flex flex-col gap-y-2">
                <label className='font-semibold' htmlFor="organization-name">Jumlah Karyawan <span className='text-red-500'>*</span></label>
                <Select
                    onChange={(e: any) => {
                        setValue("industryId", e.value)
                    }}
                    styles={customStyles}
                    options={employee}
                    placeholder={"Pilih jumlah karyawan"}
                />
                {
                    errors.employee && <div className="text-sm text-red-500">{`${errors?.employee?.message}`}</div>
                }
            </div>
            <div className="flex flex-col gap-y-2">
                <label className='font-semibold' htmlFor="organization-name">Berapa banyak pesananan yang anda proses setiap bulan? <span className='text-red-500'>*</span></label>
                <Select
                    onChange={(e: any) => {
                        setValue("industryId", e.value)
                    }}
                    styles={customStyles}
                    options={employee}
                    placeholder={"Pilih volume pesananan bulanan"}
                />
                {
                    errors.ordered_month && <div className="text-sm text-red-500">{`${errors?.ordered_month?.message}`}</div>
                }
            </div>

            <button disabled={isSubmitting} type='submit' className='bg-gray-900 mt-6 hover:bg-gray-700 text-white font-bold w-full py-2 rounded-lg flex items-center justify-center'>
                {isSubmitting ? <RiLoader2Line className='animate-spin text-white' /> : "Simpan"}
            </button>
        </form>
    )
}

export default OrganizationForm