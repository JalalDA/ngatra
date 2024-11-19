import React from "react";

const Pricing: React.FC = () => {
  const plans = [
    { name: "Basic", price: "$10", features: ["Feature A", "Feature B"] },
    { name: "Pro", price: "$25", features: ["Feature A", "Feature B", "Feature C"] },
    { name: "Enterprise", price: "$50", features: ["All Features"] },
  ];

  return (
    <section id="pricing" className="bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-600">Pricing Plans</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-blue-600">{plan.name}</h3>
              <p className="mt-2 text-2xl font-semibold text-gray-800">
                {plan.price}
              </p>
              <ul className="mt-4 text-gray-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>- {feature}</li>
                ))}
              </ul>
              <button className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
