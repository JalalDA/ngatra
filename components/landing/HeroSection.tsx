import React from "react";

const Hero = ({ language }: { language: any }) => {
  return (
    <section className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-black py-16 text-center text-white w-full">
      <div className="container mx-auto">
        {/* <p className="text-lg italic text-blue-300">Automate Your Business</p> */}
        <h1 className="mt-4 text-4xl text-gray-300 font-bold">
          {language?.tagLine ? language?.tagLine : "Beli Layanan Sosmed dan Buat Website GRATIS DISINI"}
        </h1>
      </div>
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-stars"></div>
    </section>
  );
};

export default Hero;
