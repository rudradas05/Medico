// // import React from "react";

// // const BookConsultation = () => {
// //   return (
// //     <section className="flex flex-col items-center my-10">
// //       {/* Steps Section */}
// //       <div className="w-full max-w-5xl px-6">
// //         <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
// //           How to book online doctor consultation
// //         </h2>
// //         <div className="flex justify-around bg-teal-100 rounded-lg p-6">
// //           {[
// //             "Choose doctor specialisation",
// //             "Check doctor’s availability",
// //             "Select date & time slot",
// //             "Book an Appointment",
// //           ].map((step, index) => (
// //             <div key={index} className="flex flex-col items-center">
// //               <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-2">
// //                 {index + 1}
// //               </div>
// //               <p className="text-center text-gray-700">{step}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Tips and Contact Section */}
// //       <div className="w-full max-w-5xl px-6 mt-10 flex flex-col md:flex-row gap-6">
// //         {/* Tips Section */}
// //         <div className="bg-teal-50 rounded-lg p-6 flex-1">
// //           <h3 className="text-xl font-bold text-gray-800 mb-4">
// //             How to get the best out of your doctor video consultation session
// //           </h3>
// //           <ul className="list-disc list-inside text-gray-600 space-y-2">
// //             <li>
// //               Make a list of questions and concerns you want to highlight. Tell
// //               your doctor your symptoms clearly and honestly; every little
// //               detail helps.
// //             </li>
// //             <li>
// //               Keep your medical history, such as previous test reports or
// //               prescriptions handy.
// //             </li>
// //             <li>Make sure there is no noise disturbance before connecting.</li>
// //             <li>
// //               It may be a good idea to have someone sit with you during the
// //               consultation just in case you miss something, the other person can
// //               fill you in.
// //             </li>
// //           </ul>
// //         </div>

// //         {/* Contact Form Section */}
// //         <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
// //           <h3 className="text-xl font-bold text-gray-800 mb-4">
// //             We are Here to Help!
// //           </h3>
// //           <p className="text-gray-600 mb-4">
// //             Get instant call back in few mins
// //           </p>
// //           <form className="space-y-4">
// //             <input
// //               type="text"
// //               placeholder="Full Name*"
// //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
// //               required
// //             />
// //             <input
// //               type="tel"
// //               placeholder="Enter 10-digit mobile no.*"
// //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
// //               required
// //             />
// //             <select
// //               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
// //               required
// //             >
// //               <option>Gurgaon</option>
// //               {/* Add more options as needed */}
// //             </select>
// //             <div className="flex items-center">
// //               <input type="checkbox" className="mr-2" required />
// //               <p className="text-gray-600 text-sm">
// //                 You hereby affirm & authorize Healthians to process the personal
// //                 data as per the{" "}
// //                 <a href="#" className="text-teal-500 underline">
// //                   T&C
// //                 </a>
// //                 .
// //               </p>
// //             </div>
// //             <button
// //               type="submit"
// //               className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
// //             >
// //               Book an Appointment
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default BookConsultation;

// // import React from "react";
// // import { FaCheck } from "react-icons/fa6";

// // const BookConsultation = () => {
// //   return (
// //     <section className="bg-white py-10 px-4 md:px-8 lg:px-12">
// //       {/* How to Book Section */}
// //       <h2 className="text-2xl font-semibold text-center mb-6">
// //         How to book online doctor consultation
// //       </h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
// //         {[
// //           "Choose doctor specialisation",
// //           "Check doctor’s availability",
// //           "Select date & time slot",
// //           "Book an Appointment",
// //         ].map((step, index) => (
// //           <div
// //             key={index}
// //             className="flex flex-col items-center p-4 bg-teal-100 rounded-lg"
// //           >
// //             <div className="text-4xl font-bold text-teal-700 mb-2">
// //               {index + 1}
// //             </div>
// //             <p className="text-teal-700 text-center">{step}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Consultation Tips */}
// //       <div className="bg-teal-50 p-6 rounded-lg mb-10">
// //         <h3 className="text-xl font-semibold mb-4">
// //           How to get the best out of your doctor video consultation session
// //         </h3>
// //         <ul className="list-disc list-inside text-gray-700 space-y-2">
// //           <li>Make a list of questions and concerns you want to highlight.</li>
// //           <li>Tell your doctor your symptoms clearly and honestly.</li>
// //           <li>
// //             Keep your medical history, such as test reports or prescriptions,
// //             handy.
// //           </li>
// //           <li>Make sure there is no noise disturbance before connecting.</li>
// //           <li>
// //             It may be helpful to have someone with you in case you miss any
// //             information.
// //           </li>
// //         </ul>
// //       </div>

// //       {/* Subscription Section */}
// //     </section>
// //   );
// // };

// // export default BookConsultation;

// import React from "react";
// import { FaCheck } from "react-icons/fa";

// const BookConsultation = () => {
//   return (
//     <section className="bg-gradient-to-r from-teal-500 to-teal-700 py-16 px-6 md:px-12 lg:px-16">
//       {/* How to Book Section */}
//       <h2 className="text-3xl sm:text-4xl font-semibold text-center text-white mb-8">
//         How to Book an Online Doctor Consultation
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
//         {[
//           "Choose Doctor's Specialisation",
//           "Check Doctor’s Availability",
//           "Select Date & Time Slot",
//           "Book an Appointment",
//         ].map((step, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
//           >
//             <div className="flex items-center justify-center w-16 h-16 mb-4 bg-teal-500 text-white rounded-full">
//               <span className="text-2xl font-semibold">{index + 1}</span>
//             </div>
//             <p className="text-lg font-medium text-teal-700 text-center">
//               {step}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Consultation Tips Section */}
//       <div className="bg-teal-100 p-8 rounded-lg shadow-md mb-12">
//         <h3 className="text-2xl font-semibold text-teal-700 mb-6">
//           How to Get the Best Out of Your Doctor Video Consultation Session
//         </h3>
//         <ul className="list-disc list-inside text-gray-700 space-y-4">
//           <li className="flex items-start space-x-3">
//             <FaCheck className="text-teal-500 mt-1" />
//             <span>
//               Make a list of questions and concerns you want to highlight.
//             </span>
//           </li>
//           <li className="flex items-start space-x-3">
//             <FaCheck className="text-teal-500 mt-1" />
//             <span>Tell your doctor your symptoms clearly and honestly.</span>
//           </li>
//           <li className="flex items-start space-x-3">
//             <FaCheck className="text-teal-500 mt-1" />
//             <span>
//               Keep your medical history, such as test reports or prescriptions,
//               handy.
//             </span>
//           </li>
//           <li className="flex items-start space-x-3">
//             <FaCheck className="text-teal-500 mt-1" />
//             <span>
//               Make sure there is no noise disturbance before connecting.
//             </span>
//           </li>
//           <li className="flex items-start space-x-3">
//             <FaCheck className="text-teal-500 mt-1" />
//             <span>
//               It may be helpful to have someone with you in case you miss any
//               information.
//             </span>
//           </li>
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default BookConsultation;

import React from "react";
import { FaCheck } from "react-icons/fa";

const BookConsultation = () => {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-teal-700 py-16 px-6 md:px-12 lg:px-16">
      {/* How to Book Section */}
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-white mb-8 animate-fadeIn">
        How to Book an Online Doctor Consultation
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {[
          "Choose Doctor's Specialisation",
          "Check Doctor’s Availability",
          "Select Date & Time Slot",
          "Book an Appointment",
        ].map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 animate-fadeInUp"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-teal-500 text-white rounded-full shadow-md">
              <span className="text-2xl font-semibold">{index + 1}</span>
            </div>
            <p className="text-lg font-medium text-teal-700 text-center">
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Consultation Tips Section */}
      <div className="bg-teal-100 p-8 rounded-lg shadow-md mb-12 animate-fadeIn">
        <h3 className="text-2xl font-semibold text-teal-700 mb-6">
          How to Get the Best Out of Your Doctor Video Consultation Session
        </h3>
        <ul className="list-none space-y-4">
          {[
            "Make a list of questions and concerns you want to highlight.",
            "Tell your doctor your symptoms clearly and honestly.",
            "Keep your medical history, such as test reports or prescriptions, handy.",
            "Make sure there is no noise disturbance before connecting.",
            "It may be helpful to have someone with you in case you miss any information.",
          ].map((tip, index) => (
            <li key={index} className="flex items-start space-x-3">
              <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BookConsultation;
