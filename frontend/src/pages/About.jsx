// // // import React from "react";
// // // import { assets } from "../assets/assets";
// // // import { useNavigate } from "react-router-dom";

// // // const About = () => {
// // //   const navigate = useNavigate();
// // //   return (
// // //     <div>
// // //       {/* About Header */}
// // //       <h1 className="text-4xl font-medium text-center text-gray-900 mt-5 mb-5">
// // //         About Us
// // //       </h1>

// // //       {/* About Content */}
// // //       <div className="flex flex-col gap-5 ">
// // //         <div className="w-full sm:w-1/5">
// // //           <img
// // //             src={assets.about_image}
// // //             alt="About Us"
// // //             className="rounded-lg shadow-md"
// // //           />
// // //         </div>
// // //         <div>
// // //           <p className="text-m text-gray-800 mb-5 max-w-[1000px]">
// // //             Welcome to <strong>Medico</strong>, your trusted partner in managing
// // //             your healthcare needs conveniently and efficiently. At Medico, we
// // //             understand the challenges individuals face when it comes to
// // //             scheduling doctor appointments and managing their health records.
// // //           </p>
// // //           <p className="text-m text-gray-800 mb-5 max-w-[1000px]">
// // //             <strong>Medico</strong> is committed to excellence in healthcare
// // //             technology. We continuously strive to enhance our platform,
// // //             integrating the latest advancements to improve user experience and
// // //             deliver superior service. Whether you're booking your first
// // //             appointment or managing ongoing care, Medico is here to support you
// // //             every step of the way.
// // //           </p>
// // //           <h1 className="text-2xl font-medium text-gray-900 mb-5">
// // //             Our Vision
// // //           </h1>
// // //           <p className="text-m text-gray-800 mb-5 max-w-[1000px]">
// // //             Our vision at Medico is to create a seamless healthcare experience
// // //             for every user. We aim to bridge the gap between patients and
// // //             healthcare providers, making it easier for you to access the care
// // //             you need, when you need it.
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="text-xl my-4">
// // //         <p>
// // //           WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>{" "}
// // //         </p>
// // //       </div>
// // //       <div className="flex flex-col md:flex-row mb-20">
// // //         <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover::text-white transition-all duration-300 text-gray-600 cursor-pointer">
// // //           <b>Efficiency:</b>
// // //           <p>
// // //             Streamlined appointment scheduling that fits into your busy
// // //             lifestyle.
// // //           </p>
// // //         </div>
// // //         <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover::text-white transition-all duration-300 text-gray-600 cursor-pointer">
// // //           <b>Convenience:</b>
// // //           <p>
// // //             Access to a network of trusted healthcare professionals in your
// // //             area.
// // //           </p>
// // //         </div>
// // //         <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover::text-white transition-all duration-300 text-gray-600 cursor-pointer">
// // //           <b>Personalization:</b>
// // //           <p>
// // //             Tailored recommendations and reminders to help you stay on top of
// // //             your health.
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Contact Section */}
// // //       <section className="w-full text-white py-8 mt-10 flex items-center justify-center rounded-lg">
// // //         <div className="max-w-4xl mx-auto bg-white text-gray-900 p-6 rounded-lg shadow-md">
// // //           <div className="flex flex-col sm:flex-row items-center justify-between">
// // //             {/* Text Section */}
// // //             <div className="mb-4 sm:mb-0">
// // //               <h2 className="text-2xl sm:text-3xl font-bold">
// // //                 Don’t hesitate to contact us!
// // //               </h2>
// // //               <p className="text-gray-600 mt-2 max-w-[500px]">
// // //                 It is a long established fact that a reader will be distracted
// // //                 by the readable content of a page when looking at its layout.
// // //               </p>
// // //             </div>

// // //             {/* Button Section */}
// // //             <div className="ml-10">
// // //               <button
// // //                 onClick={() => navigate("/doctors")}
// // //                 className="bg-blue-500 text-white py-2 px-6 rounded-lg text-sm font-medium shadow hover:bg-blue-600"
// // //                 aria-label="Get Appointment"
// // //               >
// // //                 Get Appointment
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // };

// // // export default About;

// // import React from "react";
// // import { assets } from "../assets/assets";
// // import { useNavigate } from "react-router-dom";

// // const About = () => {
// //   const navigate = useNavigate();
// //   return (
// //     <div>
// //       {/* About Header */}
// //       <h1 className="text-4xl font-medium text-center text-gray-900 mt-5 mb-5">
// //         About Us
// //       </h1>

// //       {/* About Content */}
// //       <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
// //         <div className="w-full sm:w-3/5 md:w-1/4">
// //           <img
// //             src={assets.about_image}
// //             alt="About Us"
// //             className="rounded-lg shadow-md object-cover w-full"
// //           />
// //         </div>
// //         <div className="w-full md:w-3/4">
// //           <p className="text-sm sm:text-base text-gray-800 mb-5 max-w-[1000px]">
// //             Welcome to <strong>Medico</strong>, your trusted partner in managing
// //             your healthcare needs conveniently and efficiently. At Medico, we
// //             understand the challenges individuals face when it comes to
// //             scheduling doctor appointments and managing their health records.
// //           </p>
// //           <p className="text-sm sm:text-base text-gray-800 mb-5 max-w-[1000px]">
// //             <strong>Medico</strong> is committed to excellence in healthcare
// //             technology. We continuously strive to enhance our platform,
// //             integrating the latest advancements to improve user experience and
// //             deliver superior service. Whether you're booking your first
// //             appointment or managing ongoing care, Medico is here to support you
// //             every step of the way.
// //           </p>
// //           <h1 className="text-2xl font-medium text-gray-900 mb-5">
// //             Our Vision
// //           </h1>
// //           <p className="text-sm sm:text-base text-gray-800 mb-5 max-w-[1000px]">
// //             Our vision at Medico is to create a seamless healthcare experience
// //             for every user. We aim to bridge the gap between patients and
// //             healthcare providers, making it easier for you to access the care
// //             you need, when you need it.
// //           </p>
// //         </div>
// //       </div>

// //       <div className="text-xl my-4 text-center">
// //         <p>
// //           WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
// //         </p>
// //       </div>
// //       <div className="flex flex-col md:flex-row gap-5 justify-center mb-20">
// //         <div className="border px-5 md:px-10 py-4 sm:py-8 flex flex-col gap-2 sm:gap-5 text-sm sm:text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer w-full md:w-1/3">
// //           <b>Efficiency:</b>
// //           <p>
// //             Streamlined appointment scheduling that fits into your busy
// //             lifestyle.
// //           </p>
// //         </div>
// //         <div className="border px-5 md:px-10 py-4 sm:py-8 flex flex-col gap-2 sm:gap-5 text-sm sm:text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer w-full md:w-1/3">
// //           <b>Convenience:</b>
// //           <p>
// //             Access to a network of trusted healthcare professionals in your
// //             area.
// //           </p>
// //         </div>
// //         <div className="border px-5 md:px-10 py-4 sm:py-8 flex flex-col gap-2 sm:gap-5 text-sm sm:text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer w-full md:w-1/3">
// //           <b>Personalization:</b>
// //           <p>
// //             Tailored recommendations and reminders to help you stay on top of
// //             your health.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Contact Section */}
// //       <section className="w-full text-white py-8 mt-10 flex items-center justify-center rounded-lg">
// //         <div className="max-w-4xl mx-auto bg-white text-gray-900 p-6 sm:p-10 rounded-lg shadow-md">
// //           <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
// //             {/* Text Section */}
// //             <div className="mb-4 sm:mb-0">
// //               <h2 className="text-2xl sm:text-3xl font-bold">
// //                 Don’t hesitate to contact us!
// //               </h2>
// //               <p className="text-gray-600 mt-2 max-w-[500px]">
// //                 It is a long established fact that a reader will be distracted
// //                 by the readable content of a page when looking at its layout.
// //               </p>
// //             </div>

// //             {/* Button Section */}
// //             <div className="mt-4 sm:mt-0 sm:ml-10">
// //               <button
// //                 onClick={() => navigate("/doctors")}
// //                 className="bg-blue-500 text-white py-2 px-6 rounded-lg text-sm font-medium shadow hover:bg-blue-600"
// //                 aria-label="Get Appointment"
// //               >
// //                 Get Appointment
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default About;

// import React from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";

// const About = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-gray-50 min-h-screen py-10">
//       {/* About Header */}
//       <header className="text-center mb-16">
//         <h1 className="text-5xl font-extrabold text-gray-800">About Us</h1>
//         <p className="text-lg text-gray-600 mt-2">
//           Your trusted partner in healthcare management.
//         </p>
//       </header>

//       {/* About Content */}
//       <div className="max-w-screen-xl mx-auto px-6 md:px-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//           <div className="flex justify-center">
//             <img
//               src={assets.about_image}
//               alt="About Us"
//               className="rounded-lg shadow-xl w-full max-w-sm"
//             />
//           </div>

//           <div className="space-y-6">
//             <p className="text-lg text-gray-700">
//               Welcome to <strong>Medico</strong>, your trusted partner in
//               managing your healthcare needs conveniently and efficiently. At
//               Medico, we understand the challenges individuals face when it
//               comes to scheduling doctor appointments and managing their health
//               records.
//             </p>
//             <p className="text-lg text-gray-700">
//               <strong>Medico</strong> is committed to excellence in healthcare
//               technology. We continuously strive to enhance our platform,
//               integrating the latest advancements to improve user experience and
//               deliver superior service. Whether you're booking your first
//               appointment or managing ongoing care, Medico is here to support
//               you every step of the way.
//             </p>

//             <h2 className="text-3xl font-semibold text-gray-800 mt-8">
//               Our Vision
//             </h2>
//             <p className="text-lg text-gray-700">
//               Our vision at Medico is to create a seamless healthcare experience
//               for every user. We aim to bridge the gap between patients and
//               healthcare providers, making it easier for you to access the care
//               you need, when you need it.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Why Choose Us */}
//       <section className="mt-20">
//         <div className="text-center">
//           <h2 className="text-3xl font-semibold text-gray-800">
//             Why Choose Us
//           </h2>
//           <p className="text-lg text-gray-600 mt-2">
//             We offer personalized, convenient, and efficient healthcare
//             management solutions.
//           </p>
//         </div>
//         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           <div className="border border-gray-300 rounded-lg p-6 text-center hover:bg-primary hover:text-white transition-all duration-300">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Efficiency
//             </h3>
//             <p className="text-lg text-gray-600">
//               Streamlined appointment scheduling that fits into your busy
//               lifestyle.
//             </p>
//           </div>

//           <div className="border border-gray-300 rounded-lg p-6 text-center hover:bg-primary hover:text-white transition-all duration-300">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Convenience
//             </h3>
//             <p className="text-lg text-gray-600">
//               Access to a network of trusted healthcare professionals in your
//               area.
//             </p>
//           </div>

//           <div className="border border-gray-300 rounded-lg p-6 text-center hover:bg-primary hover:text-white transition-all duration-300">
//             <h3 className="text-xl font-semibold text-gray-800 mb-3">
//               Personalization
//             </h3>
//             <p className="text-lg text-gray-600">
//               Tailored recommendations and reminders to help you stay on top of
//               your health.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16 mt-24">
//         <div className="max-w-screen-xl mx-auto text-center">
//           <h2 className="text-3xl font-semibold mb-4">
//             Don't hesitate to contact us!
//           </h2>
//           <p className="text-lg mb-6">
//             We’re here to assist you with any questions or concerns. Your health
//             is our priority.
//           </p>
//           <button
//             onClick={() => navigate("/doctors")}
//             className="bg-blue-700 py-3 px-8 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-blue-800"
//           >
//             Get Appointment
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;

import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ title, description }) => (
  <div className="border border-gray-300 rounded-lg p-6 text-center transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-xl hover:border-transparent">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-lg">{description}</p>
  </div>
);

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* About Header */}
      <header className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your trusted partner in healthcare management
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-6 md:px-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div className="flex justify-center animate-slide-in-left">
            <img
              src={assets.about_image}
              alt="Medical professionals discussing patient care"
              className="rounded-lg shadow-xl w-full max-w-md"
            />
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to <strong className="text-primary">Medico</strong>, your
              trusted partner in managing healthcare needs conveniently and
              efficiently. We understand the challenges individuals face with
              scheduling appointments and health record management.
            </p>

            <article>
              <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create a seamless healthcare experience that bridges the gap
                between patients and providers, ensuring access to care when you
                need it most.
              </p>
            </article>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <div className="text-center mb-14 animate-fade-in">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Why Choose Medico
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover personalized, convenient, and efficient healthcare
              solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Efficiency"
              description="Streamlined scheduling that fits your busy lifestyle"
            />
            <FeatureCard
              title="Convenience"
              description="Access to trusted healthcare professionals nearby"
            />
            <FeatureCard
              title="Personalization"
              description="Tailored recommendations and health reminders"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16 mt-24 rounded-2xl shadow-xl animate-fade-in-up">
          <div className="max-w-screen-md mx-auto text-center px-4">
            <h2 className="text-3xl font-semibold mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg mb-8">
              Our team is here to help you navigate your healthcare journey
            </p>
            <button
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="bg-white text-blue-600 py-3 px-8 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-blue-50 hover:shadow-lg"
              aria-label="Book a doctor appointment"
            >
              Get Started Today
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
