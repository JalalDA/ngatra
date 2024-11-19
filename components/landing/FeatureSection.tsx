import React from "react";

const Features: React.FC = () => {
  const features = [
    { title: "Affordable Pricing", description: "Get the best rates in the market." },
    { title: "Fast Delivery", description: "Instant order processing for your needs." },
    { title: "Secure Payments", description: "100% secure and reliable payment options." },
    { title: "24/7 Support", description: "We are here to help anytime, anywhere." },
  ];

  return (
    <section id="features" className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-600">Why Choose Ngatra Panel?</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-blue-50 p-6 shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-blue-600">{feature.title}</h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
