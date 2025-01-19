import React from 'react'
import ProviderItem from './provider-item'
import { ArrowUp, ArrowUpNarrowWideIcon } from 'lucide-react'

type Props = {}

const ProviderAds = (props: Props) => {
  let data = [
    {
      name : "Global SMM",
      url : 'https://global-smm.com',
      icon : <ArrowUp className='rotate-45 h-6 w-6'/>
    },
    {
      name : "Sochype",
      url : 'https://global-smm.com',
      icon : <ArrowUp className='rotate-45 h-6 w-6'/>
    },
    {
      name : "Dnox SMM",
      url : 'https://global-smm.com',
      icon : <ArrowUp className='rotate-45 h-6 w-6'/>
    },
    {
      name : "Partner Soc",
      url : 'https://global-smm.com',
      icon : <ArrowUp className='rotate-45 h-6 w-6'/>
    },
    {
      name : "1x Panel",
      url : 'https://global-smm.com',
      icon : <ArrowUp className='rotate-45 h-6 w-6'/>
    },
    {
      name : "Tea Teagram",
      url : 'https://global-smm.com',
      icon : <ArrowUp className='rotate-45 h-6 w-6'/>
    },
  ]
  return (
    <div className="border-gray-900 rounded-lg border-2 w-[80%] shadow-md">
      {
        data.map((item, index)=>(
          <ProviderItem item={item.name} url={item.url} Icon={item.icon} key={index}/>
        ))
      }
    </div>
  )
}

export default ProviderAds