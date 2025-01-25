import IntegrationItem from '@/components/control/integrations/integration-items'
import FastOrderModal from '@/components/control/modal/fast-order-modal'
import ServiceSettingModal from '@/components/control/modal/service-settings-modal'
import SettingsItem from '@/components/control/settings/settings-item'
import { Switch } from '@/components/ui/switch'
import { Layers2, ShoppingCartIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Notification = (props: Props) => {
  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">Notification Settings</div>
      <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">Email Notification</div>
          <Switch/>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">Password Reset</div>
          <Switch/>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">Success Payment</div>
          <Switch/>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">New Order</div>
          <Switch/>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">Order Failed</div>
          <Switch/>
        </div>
      </div>
    </div>
  )
}

export default Notification