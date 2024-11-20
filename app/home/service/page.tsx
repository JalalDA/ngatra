import React from 'react'
import Header from './_components/Header'
import FormOrder from './_components/FormOrder'

type Props = {}

const Service = (props: Props) => {
  return (
    <div className='h-screen w-screen'>
        <Header/>
        <FormOrder/>
    </div>
  )
}

export default Service