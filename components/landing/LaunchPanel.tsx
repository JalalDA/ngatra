import React from 'react';

const LaunchPanel = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center py-10 px-4">
      {/* Section Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* Left Card */}
        <div className="rounded-lg bg-gradient-to-br from-purple-700 via-indigo-900 to-blue-900 p-6 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Launch SMM panel <br /> in 5 minutes
          </h2>
          <p className="text-sm md:text-base text-gray-300 mb-6">
            <span className="inline-flex items-center gap-1">
              <span>🌿</span> No code solution <span>🌿</span>
            </span>
          </p>
          <div className="w-full flex justify-center items-center">
            {/* Speedometer */}
            <div className="relative w-40 h-40">
              <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"></div>
              <div className="absolute w-[90%] h-[90%] top-[5%] left-[5%] bg-primary rounded-full"></div>
              <div className="absolute left-1/2 top-[50%] w-[2px] h-20 bg-gradient-to-r from-blue-300 to-blue-500 rounded transform origin-bottom -translate-x-1/2 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Middle Card */}
        <div className="rounded-lg bg-gradient-to-br from-blue-900 to-black p-6 flex flex-col items-center text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Payment systems for every taste
          </h2>
          <p className="text-[4rem] md:text-[5rem] font-extrabold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent mb-4">
            200+
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {/* Payment System Logos */}
            <span className="bg-gray-800 px-3 py-1 rounded-full">Paytm</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">UPI</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">USDT</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">Stripe</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">Perfect Money</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">Payeer</span>
            <span className="text-gray-400 px-3 py-1">...and much more</span>
          </div>
        </div>

        {/* Right Card */}
        <div className="rounded-lg bg-gradient-to-br from-purple-900 to-black p-6 flex flex-col items-center text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Localization in 20+ languages
          </h2>
          <div className="flex gap-2 mt-4">
            {/* Flags */}
            <div className="w-12 h-8 bg-gradient-to-r from-gray-200 to-white rounded-md"></div>
            <div className="w-12 h-8 bg-gradient-to-r from-gray-200 to-red-500 rounded-md"></div>
            <div className="w-12 h-8 bg-gradient-to-r from-gray-200 to-blue-400 rounded-md"></div>
            <div className="w-12 h-8 bg-gradient-to-r from-orange-400 to-green-500 rounded-md"></div>
            <div className="w-12 h-8 bg-gradient-to-r from-gray-200 to-blue-600 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPanel;
