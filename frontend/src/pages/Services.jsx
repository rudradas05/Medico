// // import React, { useState } from "react";

// // const servicesData = [
// //   {
// //     id: 1,
// //     title: "Lab Reports",
// //     shortDescription: "Get your lab test results conveniently.",
// //     description:
// //       "Our lab report service provides detailed and accurate results for all your medical tests. You can access these reports directly through our platform.",
// //     image: "/images/lab-report.jpg",
// //   },
// //   {
// //     id: 2,
// //     title: "Doctor's Prescription",
// //     shortDescription: "Get expert prescriptions from qualified doctors.",
// //     description:
// //       "Consult with top-rated doctors to receive accurate prescriptions tailored to your health needs.",
// //     image: "/images/doctor-prescription.jpg",
// //   },
// //   {
// //     id: 3,
// //     title: "Online Consultation",
// //     shortDescription: "Consult with doctors online anytime, anywhere.",
// //     description:
// //       "Enjoy the convenience of online consultations with experienced doctors through video calls or chat.",
// //     image: "/images/online-consultation.jpg",
// //   },
// //   {
// //     id: 4,
// //     title: "Medicine Delivery",
// //     shortDescription: "Get medicines delivered to your doorstep.",
// //     description:
// //       "Order medicines through our platform and have them delivered to your home in a timely manner.",
// //     image: "/images/medicine-delivery.jpg",
// //   },
// //   {
// //     id: 5,
// //     title: "Health Checkup Packages",
// //     shortDescription: "Comprehensive health checkups at affordable prices.",
// //     description:
// //       "Choose from various health checkup packages to ensure your overall well-being.",
// //     image: "/images/health-checkup.jpg",
// //   },
// // ];

// // const Services = () => {
// //   const [selectedService, setSelectedService] = useState(null);

// //   // Function to handle service click
// //   const handleServiceClick = (service) => {
// //     setSelectedService(service);
// //   };

// //   // Function to go back to the list view
// //   const handleBack = () => {
// //     setSelectedService(null);
// //   };

// //   return (
// //     <div className="container mx-auto py-10">
// //       {/* Header Section */}
// //       <header className="bg-blue-500 text-white text-center py-6 rounded-lg mb-6">
// //         <h1 className="text-3xl font-bold">Welcome to Medico's Services</h1>
// //         <p className="mt-2 text-lg">
// //           Discover the range of healthcare services we offer to make your life
// //           easier.
// //         </p>
// //       </header>

// //       {/* Services Section */}
// //       <div>
// //         {/* List View */}
// //         {!selectedService ? (
// //           <>
// //             <h1 className="text-3xl font-bold text-center mb-8">
// //               Our Services
// //             </h1>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {servicesData.map((service) => (
// //                 <div
// //                   key={service.id}
// //                   className="border rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer"
// //                   onClick={() => handleServiceClick(service)}
// //                 >
// //                   <img
// //                     src={service.image}
// //                     alt={service.title}
// //                     className="w-full h-40 object-cover rounded-t-lg"
// //                   />
// //                   <h2 className="text-xl font-semibold mt-3">
// //                     {service.title}
// //                   </h2>
// //                   <p className="text-gray-600 mt-2">
// //                     {service.shortDescription}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </>
// //         ) : (
// //           // Details View
// //           <div>
// //             <button
// //               onClick={handleBack}
// //               className="text-blue-500 underline mb-4"
// //             >
// //               Back to Services
// //             </button>
// //             <h1 className="text-4xl font-bold mb-6">{selectedService.title}</h1>
// //             <img
// //               src={selectedService.image}
// //               alt={selectedService.title}
// //               className="w-full h-80 object-cover rounded-lg mb-6"
// //             />
// //             <p className="text-lg text-gray-700">
// //               {selectedService.description}
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Services;

// import React, { useState } from "react";

// const servicesData = [
//   {
//     id: 1,
//     title: "Lab Reports",
//     shortDescription: "Get your lab test results conveniently.",
//     description:
//       "Our lab report service provides detailed and accurate results for all your medical tests. You can access these reports directly through our platform.",
//     image: "/images/lab-report.jpg",
//   },
//   {
//     id: 2,
//     title: "Doctor's Prescription",
//     shortDescription: "Get expert prescriptions from qualified doctors.",
//     description:
//       "Consult with top-rated doctors to receive accurate prescriptions tailored to your health needs.",
//     image: "/images/doctor-prescription.jpg",
//   },
//   {
//     id: 3,
//     title: "Online Consultation",
//     shortDescription: "Consult with doctors online anytime, anywhere.",
//     description:
//       "Enjoy the convenience of online consultations with experienced doctors through video calls or chat.",
//     image: "/images/online-consultation.jpg",
//   },
//   {
//     id: 4,
//     title: "Medicine Delivery",
//     shortDescription: "Get medicines delivered to your doorstep.",
//     description:
//       "Order medicines through our platform and have them delivered to your home in a timely manner.",
//     image: "/images/medicine-delivery.jpg",
//   },
//   {
//     id: 5,
//     title: "Health Checkup Packages",
//     shortDescription: "Comprehensive health checkups at affordable prices.",
//     description:
//       "Choose from various health checkup packages to ensure your overall well-being.",
//     image: "/images/health-checkup.jpg",
//   },
// ];

// const Services = () => {
//   const [selectedService, setSelectedService] = useState(null);

//   // Function to handle service click
//   const handleServiceClick = (service) => {
//     setSelectedService(service);
//   };

//   // Function to go back to the list view
//   const handleBack = () => {
//     setSelectedService(null);
//   };

//   return (
//     <div className="container mx-auto py-10">
//       {/* Header Section */}
//       <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-6 rounded-lg mb-10 shadow-lg">
//         <h1 className="text-4xl font-extrabold">
//           Welcome to Medico's Services
//         </h1>
//         <p className="mt-2 text-lg max-w-3xl mx-auto">
//           Discover the range of healthcare services we offer to make your life
//           easier and healthier.
//         </p>
//       </header>

//       {/* Services Section */}
//       <div>
//         {/* List View */}
//         {!selectedService ? (
//           <>
//             <h2 className="text-3xl font-semibold text-center mb-12">
//               Our Healthcare Services
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {servicesData.map((service) => (
//                 <div
//                   key={service.id}
//                   className="group relative border rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
//                   onClick={() => handleServiceClick(service)}
//                 >
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                   />
//                   <div className="p-6 bg-white">
//                     <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600">
//                       {service.title}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       {service.shortDescription}
//                     </p>
//                   </div>
//                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           // Details View
//           <div>
//             <button
//               onClick={handleBack}
//               className="text-blue-600 font-semibold underline mb-4 block"
//             >
//               Back to Services
//             </button>
//             <h1 className="text-4xl font-bold text-gray-800 mb-6">
//               {selectedService.title}
//             </h1>
//             <img
//               src={selectedService.image}
//               alt={selectedService.title}
//               className="w-full h-96 object-cover rounded-lg mb-6"
//             />
//             <p className="text-lg text-gray-700 mb-6">
//               {selectedService.description}
//             </p>
//             <button
//               onClick={handleBack}
//               className="w-full sm:w-auto bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-medium shadow-md hover:bg-blue-600 transition-all duration-300"
//             >
//               Back to Services
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;

import React, { useState } from "react";

const servicesData = [
  {
    id: 1,
    title: "Lab Reports",
    shortDescription: "Get your lab test results conveniently.",
    description:
      "Our lab report service provides detailed and accurate results for all your medical tests. You can access these reports directly through our platform.",
    image: "/images/lab-report.jpg",
  },
  {
    id: 2,
    title: "Doctor's Prescription",
    shortDescription: "Get expert prescriptions from qualified doctors.",
    description:
      "Consult with top-rated doctors to receive accurate prescriptions tailored to your health needs.",
    image: "/images/doctor-prescription.jpg",
  },
  {
    id: 3,
    title: "Online Consultation",
    shortDescription: "Consult with doctors online anytime, anywhere.",
    description:
      "Enjoy the convenience of online consultations with experienced doctors through video calls or chat.",
    image: "/images/online-consultation.jpg",
  },
  {
    id: 4,
    title: "Medicine Delivery",
    shortDescription: "Get medicines delivered to your doorstep.",
    description:
      "Order medicines through our platform and have them delivered to your home in a timely manner.",
    image: "/images/medicine-delivery.jpg",
  },
  {
    id: 5,
    title: "Health Checkup Packages",
    shortDescription: "Comprehensive health checkups at affordable prices.",
    description:
      "Choose from various health checkup packages to ensure your overall well-being.",
    image: "/images/health-checkup.jpg",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
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

      {/* Services Section */}
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
          /* Detailed View */
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
