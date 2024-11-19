import React from "react";

const ServiceCards: React.FC = () => {
  const services = [
    {
      name: "Premium Votes Asian",
      price: "1 $",
      oldPrice: "1.3 $",
      discount: "-30%",
    },
    {
      name: "Channel Post Viewers",
      price: "0.5 $",
      discount: "-50%",
    },
    {
      name: "Real Exclusive Subscribers Indian",
      price: "0.5 $",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center justify-between rounded-lg bg-gray-800 p-4 text-white shadow-md hover:shadow-xl"
        >
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="mt-2 text-2xl font-bold">{service.price}</p>
          {service.oldPrice && (
            <p className="text-sm line-through text-gray-400">
              {service.oldPrice}
            </p>
          )}
          {service.discount && (
            <div className="absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-xs font-bold">
              {service.discount}
            </div>
          )}
          <button className="mt-4 rounded bg-blue-600 px-4 py-2 hover:bg-blue-700">
            Order Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
