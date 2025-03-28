import React, { useState } from "react";

const servicesData = [
  {
    id: 1,
    title: "Lab Reports",
    shortDescription: "Get your lab test results conveniently.",
    description:
      "Our lab report service provides detailed and accurate results for all your medical tests. You can access these reports directly through our platform.",
    image:
      "https://th.bing.com/th/id/OIP.VugIWHCrB3EeedVpUWhiFAHaE8?pid=ImgDet&w=193&h=128&c=7&dpr=2",
  },
  {
    id: 2,
    title: "Doctor's Prescription",
    shortDescription: "Get expert prescriptions from qualified doctors.",
    description:
      "Consult with top-rated doctors to receive accurate prescriptions tailored to your health needs.",
    image:
      "https://th.bing.com/th/id/OIP.GwvoDxUSbJIsmv3ZC8GL3wHaE7?w=264&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
  {
    id: 3,
    title: "Online Consultation",
    shortDescription: "Consult with doctors online anytime, anywhere.",
    description:
      "Enjoy the convenience of online consultations with experienced doctors through video calls or chat.",
    image:
      "https://th.bing.com/th/id/OIP.jle8tqJMHY4SM9hvdh0ztgHaFj?pid=ImgDet&w=193&h=144&c=7&dpr=2",
  },
  {
    id: 4,
    title: "Medicine Delivery",
    shortDescription: "Get medicines delivered to your doorstep.",
    description:
      "Order medicines through our platform and have them delivered to your home in a timely manner.",
    image:
      "https://th.bing.com/th/id/OIP.AwPL799-F1L4gp_U2geCBwHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: 5,
    title: "Health Checkup Packages",
    shortDescription: "Comprehensive health checkups at affordable prices.",
    description:
      "Choose from various health checkup packages to ensure your overall well-being.",
    image:
      "https://th.bing.com/th/id/OIP.fDeii030j6u7ipnQCjQ9uQHaE8?w=246&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-12 rounded-2xl mb-12 shadow-xl transform transition-all duration-500 hover:shadow-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
            Medico Healthcare Services
          </h1>
          <p className="text-xl text-blue-100 font-medium leading-relaxed">
            Your Gateway to Comprehensive, Modern Healthcare Solutions
          </p>
        </div>
      </header>

      <div className="relative">
        {!selectedService ? (
          <>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
              Discover Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <button className="mt-4 inline-flex items-center text-blue-600 font-semibold group-hover:underline">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2 mt-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Services
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-96 md:h-auto">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    {selectedService.title}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {selectedService.description}
                  </p>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
                    Get Started
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
