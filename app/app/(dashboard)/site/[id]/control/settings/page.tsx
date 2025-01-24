import React from 'react'

type Props = {}

const Settings = (props: Props) => {
    return (
        <div className='flex flex-col gap-y-4 md:w-full'>
            <div className="text-md font-semibold">General Settings</div>

            {/* banner */}
            <div className="bg-gray-50 p-4 rounded-lg border shadow-sm flex justify-between items-center w-full">
                <div>
                    <h4 className="font-semibold text-lg">Activate banner & get benefits</h4>
                    <p className="text-green-600 text-sm">✓ Listing in top providers</p>
                    <p className="text-green-600 text-sm">✓ You are helping Socpanel to improve</p>
                </div>
                <button className="bg-gray-100 border px-3 py-1 text-sm rounded-md hover:bg-gray-200">
                    Turn off banner
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Services settings</h5>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <h5 className="font-semibold">Fast order</h5>
                <span className="text-green-600 text-sm font-medium">Active</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Custom Registration Fields</h5>
                <p className="text-sm text-gray-500">Added fields: 0</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <h5 className="font-semibold">Currency</h5>
                <p className="text-sm text-gray-500">Primary currency: <span className="font-medium">IDR</span></p>
            </div>
        </div>
    )
}

export default Settings