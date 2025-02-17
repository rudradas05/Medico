// // import React, { useState } from "react";
// // import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// // const FAQ = () => {
// //   const [activeIndex, setActiveIndex] = useState(null);

// //   const toggleFAQ = (index) => {
// //     setActiveIndex(activeIndex === index ? null : index);
// //   };

// //   return (
// //     <section className="max-w-7xl mx-auto py-10 px-4">
// //       <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
// //         Frequently Asked Questions
// //       </h1>

// //       <div className="space-y-4">
// //         {/* FAQ Item 1 */}
// //         <div className="border border-gray-300 rounded-lg shadow">
// //           <button
// //             onClick={() => toggleFAQ(1)}
// //             className={`w-full flex justify-between items-center px-4 py-3 ${
// //               activeIndex === 1
// //                 ? "bg-gray-100 border-l-4 border-blue-500"
// //                 : "bg-teal-500"
// //             } text-lg font-semibold text-blue-700`}
// //           >
// //             <span>How Does Remote Consultation Work?</span>
// //             {activeIndex === 1 ? <FaChevronUp /> : <FaChevronDown />}
// //           </button>
// //           {activeIndex === 1 && (
// //             <div className="px-4 py-3 text-gray-700 bg-white">
// //               <p>
// //                 You can book an appointment with a doctor through our platform.
// //                 At the scheduled time, you'll connect with the doctor using your
// //                 preferred method (call or chat). The doctor will listen to your
// //                 symptoms, ask questions, and provide medical advice tailored to
// //                 your needs.
// //               </p>
// //             </div>
// //           )}
// //         </div>

// //         {/* FAQ Item 2 with updated content */}
// //         <div className="border border-gray-300 rounded-lg shadow">
// //           <button
// //             onClick={() => toggleFAQ(2)}
// //             className={`w-full flex justify-between items-center px-4 py-3 ${
// //               activeIndex === 2
// //                 ? "bg-gray-100 border-l-4 border-blue-500"
// //                 : "bg-teal-500"
// //             } text-lg font-semibold text-blue-700`}
// //           >
// //             <span>How Do I Begin a Consultation with Doctors Remotely?</span>
// //             {activeIndex === 2 ? <FaChevronUp /> : <FaChevronDown />}
// //           </button>
// //           {activeIndex === 2 && (
// //             <div className="px-4 py-3 text-gray-700 bg-white">
// //               <p>
// //                 Starting a doctor consultation is very simple on our platform.
// //                 Follow these 4 simple steps:
// //               </p>
// //               <ul className="list-disc pl-6 mt-2 text-gray-700">
// //                 <li>Choose your health concern</li>
// //                 <li>Connect with a doctor within 2 minutes</li>
// //                 <li>Ask your queries to the doctor via audio call or chat.</li>
// //               </ul>
// //             </div>
// //           )}
// //         </div>

// //         {/* FAQ Item 3 */}
// //         <div className="border border-gray-300 rounded-lg shadow">
// //           <button
// //             onClick={() => toggleFAQ(3)}
// //             className={`w-full flex justify-between items-center px-4 py-3 ${
// //               activeIndex === 3
// //                 ? "bg-gray-100 border-l-4 border-blue-500"
// //                 : "bg-teal-500"
// //             } text-lg font-semibold text-blue-700`}
// //           >
// //             <span>Are Your Doctors Qualified for Remote Consultations?</span>
// //             {activeIndex === 3 ? <FaChevronUp /> : <FaChevronDown />}
// //           </button>
// //           {activeIndex === 3 && (
// //             <div className="px-4 py-3 text-gray-700 bg-white">
// //               <p>
// //                 We implement a rigorous verification process for every doctor
// //                 providing remote medical services. Our team manually verifies
// //                 all necessary documents, registrations, and certifications for
// //                 each healthcare provider
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FAQ;

// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// const FAQ = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <section className="bg-gradient-to-r from-teal-100 to-teal-500 py-16 px-6 sm:px-8 md:px-12 rounded-lg">
//       <div className="max-w-7xl mx-auto text-center mb-12">
//         <h1 className="text-4xl font-bold text-teal-800 mb-4">
//           Frequently Asked Questions
//         </h1>
//         <p className="text-lg sm:text-xl text-gray-600">
//           Find answers to common questions about our remote doctor consultation
//           service.
//         </p>
//       </div>

//       <div className="space-y-6">
//         {/* FAQ Item 1 */}
//         <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden">
//           <button
//             onClick={() => toggleFAQ(1)}
//             className={`w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-teal-700 bg-white hover:bg-teal-50 transition-all duration-200 ${
//               activeIndex === 1 ? "border-l-4 border-teal-500" : "border-b"
//             }`}
//           >
//             <span>How Does Remote Consultation Work?</span>
//             {activeIndex === 1 ? (
//               <FaChevronUp className="text-teal-700" />
//             ) : (
//               <FaChevronDown className="text-teal-700" />
//             )}
//           </button>
//           {activeIndex === 1 && (
//             <div className="px-6 py-4 bg-teal-50 text-gray-700">
//               <p>
//                 You can book an appointment with a doctor through our platform.
//                 At the scheduled time, you'll connect with the doctor using your
//                 preferred method (call or chat). The doctor will listen to your
//                 symptoms, ask questions, and provide medical advice tailored to
//                 your needs.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* FAQ Item 2 */}
//         <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden">
//           <button
//             onClick={() => toggleFAQ(2)}
//             className={`w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-teal-700 bg-white hover:bg-teal-50 transition-all duration-200 ${
//               activeIndex === 2 ? "border-l-4 border-teal-500" : "border-b"
//             }`}
//           >
//             <span>How Do I Begin a Consultation with Doctors Remotely?</span>
//             {activeIndex === 2 ? (
//               <FaChevronUp className="text-teal-700" />
//             ) : (
//               <FaChevronDown className="text-teal-700" />
//             )}
//           </button>
//           {activeIndex === 2 && (
//             <div className="px-6 py-4 bg-teal-50 text-gray-700">
//               <p>
//                 Starting a doctor consultation is very simple on our platform.
//                 Follow these 4 simple steps:
//               </p>
//               <ul className="list-disc pl-6 mt-2 text-gray-700">
//                 <li>Choose your health concern</li>
//                 <li>Connect with a doctor within 2 minutes</li>
//                 <li>Ask your queries to the doctor via audio call or chat</li>
//                 <li>Receive tailored medical advice</li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* FAQ Item 3 */}
//         <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden">
//           <button
//             onClick={() => toggleFAQ(3)}
//             className={`w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-teal-700 bg-white hover:bg-teal-50 transition-all duration-200 ${
//               activeIndex === 3 ? "border-l-4 border-teal-500" : "border-b"
//             }`}
//           >
//             <span>Are Your Doctors Qualified for Remote Consultations?</span>
//             {activeIndex === 3 ? (
//               <FaChevronUp className="text-teal-700" />
//             ) : (
//               <FaChevronDown className="text-teal-700" />
//             )}
//           </button>
//           {activeIndex === 3 && (
//             <div className="px-6 py-4 bg-teal-50 text-gray-700">
//               <p>
//                 We implement a rigorous verification process for every doctor
//                 providing remote medical services. Our team manually verifies
//                 all necessary documents, registrations, and certifications for
//                 each healthcare provider to ensure the highest level of care.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How Does Remote Consultation Work?",
      answer:
        "You can book an appointment with a doctor through our platform. At the scheduled time, you'll connect with the doctor using your preferred method (call or chat). The doctor will listen to your symptoms, ask questions, and provide medical advice tailored to your needs.",
    },
    {
      question: "How Do I Begin a Consultation with Doctors Remotely?",
      answer: [
        "Choose your health concern",
        "Connect with a doctor within 2 minutes",
        "Ask your queries to the doctor via audio call or chat",
        "Receive tailored medical advice",
      ],
    },
    {
      question: "Are Your Doctors Qualified for Remote Consultations?",
      answer:
        "We implement a rigorous verification process for every doctor providing remote medical services. Our team manually verifies all necessary documents, registrations, and certifications for each healthcare provider to ensure the highest level of care.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="bg-gradient-to-br from-teal-50 to-teal-200 py-16 px-6 sm:px-8 md:px-12 rounded-2xl shadow-xl">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-teal-800 mb-4"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg sm:text-xl text-teal-700"
        >
          Find answers to common questions about our remote doctor consultation
          service
        </motion.p>
      </div>

      <motion.div
        className="space-y-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="border border-teal-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full flex justify-between items-center px-6 py-5 text-left transition-all duration-300 ${
                activeIndex === index ? "bg-teal-50" : "hover:bg-teal-50"
              }`}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <span className="text-lg font-semibold text-teal-800 pr-4">
                {item.question}
              </span>
              <span className="shrink-0 text-teal-600">
                {activeIndex === index ? (
                  <FaChevronUp className="w-5 h-5 transition-transform" />
                ) : (
                  <FaChevronDown className="w-5 h-5 transition-transform" />
                )}
              </span>
            </button>

            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  id={`faq-content-${index}`}
                  className="px-6 pb-5 pt-2 text-teal-700"
                >
                  {Array.isArray(item.answer) ? (
                    <ul className="space-y-3">
                      {item.answer.map((point, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <span className="text-teal-500">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{item.answer}</p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FAQ;
