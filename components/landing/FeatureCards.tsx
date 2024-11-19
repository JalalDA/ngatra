import React from "react";

const FeatureCards: React.FC = () => {
  const features = [
    { title: "Ultra fast", subtitle: "Almost speed of light." },
    { title: "Cool functions", subtitle: "Updates every month." },
    { title: "Hot design", subtitle: "Far ahead of others." },
    { title: "Ecosystem", subtitle: "Market transparency." },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="rounded-xl bg-black p-6 text-white shadow-lg hover:shadow-xl"
        >
          <h3 className="text-lg font-bold text-blue-400">{feature.title}</h3>
          <p className="mt-2 text-gray-400">{feature.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
