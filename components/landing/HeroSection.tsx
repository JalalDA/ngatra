import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-black py-16 text-center text-white w-full">
      <div className="container mx-auto">
        <p className="text-lg italic text-blue-300">Automate Your Business</p>
        <h1 className="mt-2 text-5xl font-bold">Create your own SMM panel</h1>
        <p className="mt-4 text-lg text-gray-300">
          Manage your social media services with ease and efficiency.
        </p>
      </div>
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-stars"></div>
    </section>
  );
};

export default Hero;
