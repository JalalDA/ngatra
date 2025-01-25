import DomainSettingsModal from '@/components/control/modal/domain-settings-modal'
import FastOrderModal from '@/components/control/modal/fast-order-modal'
import MetaDataModal from '@/components/control/modal/meta-data-modal'
import ServiceSettingModal from '@/components/control/modal/service-settings-modal'
import SettingsItem from '@/components/control/settings/settings-item'
import { Switch } from '@/components/ui/switch'
import { BanknoteIcon, BookUserIcon, CheckCircle2Icon, ChevronRightIcon, CoinsIcon, Globe2Icon, InspectIcon, Layers2, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Settings = (props: Props) => {
    return (
        <div className='flex flex-col gap-y-4 md:w-full'>
            <div className="text-md font-semibold text-xl">General Settings</div>

            {/* banner */}
            <div className=" rounded-lg border shadow-sm flex justify-between items-center w-full">
                <div className='flex flex-col gap-y-4 p-4 border-r md:w-1/2'>
                    <h4 className="font-semibold text-lg">Activate banner & get benefits</h4>
                    <p className="text-md flex items-center gap-x-4 font-semibold"><CheckCircle2Icon className='text-green-700' /> Listing in top providers</p>
                    <p className="text-md flex items-center gap-x-4 font-semibold"><CheckCircle2Icon className='text-green-700' />  You are helping Ngatra to improve</p>
                </div>
                <button className="px-3 py-1 text-sm rounded-md flex items-center flex-col gap-y-2 justify-center w-1/2">
                    <div className="p-4 shadow-sm font-semibold border rounded-md flex items-center gap-x-2">
                        <Image src={"/ngatra-logo.svg"} alt='ngatra -loho' height={32} width={32} />
                        Made by Ngatra
                    </div>
                    <div className="p-4 shadow-sm hover:shadow-lg hover:bg-gray-100 font-semibold border rounded-md">
                        Turn off banner
                    </div>
                </button>
            </div>

            {/* orders and services */}
            <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <SettingsItem rightIcon={<Layers2/>} title='Service settings' >
                        <ServiceSettingModal/>
                    </SettingsItem>
                </div>
                <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <SettingsItem rightIcon={<ShoppingCartIcon/>} title='Fast order' >
                        <FastOrderModal/>
                    </SettingsItem>
                </div>
            </div>

            {/* currency */}
            <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <div className="flex items-center gap-x-2">
                        <BanknoteIcon/>
                        <h5 className="font-semibold">Currency</h5>
                    </div>
                    <ChevronRightIcon />
                </div>
            </div>

            {/* metadata */}
            <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <SettingsItem rightIcon={<InspectIcon/>} title='Meta data' >
                        <MetaDataModal/>
                    </SettingsItem>
                </div>
                <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <SettingsItem rightIcon={<Globe2Icon/>} title='Domain Settings' >
                        <DomainSettingsModal/>
                    </SettingsItem>
                </div>
            </div>

            {/* other */}
            <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <div className="flex items-center gap-x-2">
                        <CoinsIcon />
                        <h5 className="font-semibold">Show total panel orders</h5>
                    </div>
                    <Switch />
                </div>
                <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                    <div className="flex items-center gap-x-2">
                        <BookUserIcon/>
                        <h5 className="font-semibold">Show user spent</h5>
                    </div>
                    <Switch />
                </div>
            </div>
        </div>
    )
}

export default Settings