import AddManagersButton from '@/components/control/managers/add-managers-button'
import AddManagersModal from '@/components/control/managers/add-managers-modal'
import { LockIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Mangers = (props: Props) => {
  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">Managers</div>
      <div className="border rounded-lg shadow-md">
            <div className="h-64 w-full flex items-center justify-center gap-x-4">
                <LockIcon size={18} color='blue' className='animate-bounce'/> 
                <h5 className='font-semibold'>Here you can add managers and choose what they are allowed to do on your panel</h5>
            </div>
            <div className="flex items-center justify-center border-t p-4">
              <AddManagersButton>
                <AddManagersModal/>
              </AddManagersButton>
            </div>
        </div>
    </div>
  )
}

export default Mangers