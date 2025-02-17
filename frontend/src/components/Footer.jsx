// // import React from "react";

// // const Footer = () => {
// //   const quickLinks = [
// //     { name: "Home", url: "/" },
// //     { name: "About Us", url: "/about" },
// //     { name: "Services", url: "/services" },
// //     { name: "Our Cases", url: "#" },
// //     { name: "Other Links", url: "#" },
// //   ];

// //   return (
// //     <footer className="bg-primary py-10 text-white rounded mt-10 ">
// //       {/* <footer className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-14"> */}
// //       <div className="container mx-auto flex flex-col md:flex-row justify-center items-start md:justify-between gap-10 px-10">
// //         {/* About Us Section */}
// //         <div className="space-y-6 md:w-1/4">
// //           <h3 className="text-2xl font-semibold mb-4">About Us</h3>
// //           <div className="w-16 h-1 bg-white mb-4"></div>
// //           <p className="text-sm leading-relaxed">
// //             Lorem ipsum dolor sit amet, consectetur adipisicing elit do eiusmod
// //             tempor incididunt ut labore dolore magna.
// //           </p>
// //           <div className="flex gap-6">
// //             <a
// //               href="#"
// //               aria-label="Facebook"
// //               className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-100 transition"
// //             >
// //               <i className="fab fa-facebook-f text-xl"></i>
// //             </a>
// //             <a
// //               href="#"
// //               aria-label="Google"
// //               className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-100 transition"
// //             >
// //               <i className="fab fa-google text-xl"></i>
// //             </a>
// //             <a
// //               href="#"
// //               aria-label="Twitter"
// //               className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-100 transition"
// //             >
// //               <i className="fab fa-twitter text-xl"></i>
// //             </a>
// //             <a
// //               href="#"
// //               aria-label="Vimeo"
// //               className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-100 transition"
// //             >
// //               <i className="fab fa-vimeo-v text-xl"></i>
// //             </a>
// //             <a
// //               href="#"
// //               aria-label="Pinterest"
// //               className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-100 transition"
// //             >
// //               <i className="fab fa-pinterest text-xl"></i>
// //             </a>
// //           </div>
// //         </div>

// //         {/* Quick Links Section */}
// //         <div className="space-y-6 md:w-1/4">
// //           <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
// //           <div className="w-16 h-1 bg-white mb-4"></div>
// //           <ul className="space-y-3 text-sm">
// //             {quickLinks.map((link, index) => (
// //               <li key={index}>
// //                 <a
// //                   href={link.url}
// //                   className="hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-200"
// //                 >
// //                   {link.name}
// //                 </a>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>

// //         {/* Newsletter Section */}
// //         <div className="space-y-6 md:w-1/4">
// //           <h3 className="text-2xl font-semibold mb-4">Newsletter</h3>
// //           <div className="w-16 h-1 bg-white mb-4"></div>
// //           <p className="text-sm leading-relaxed">
// //             Subscribe to our newsletter to get all our news in your inbox. Lorem
// //             ipsum dolor sit amet, consectetur adipisicing elit.
// //           </p>
// //           <form className="flex">
// //             <input
// //               type="email"
// //               placeholder="Email Address"
// //               aria-label="Email Address"
// //               required
// //               className="p-3 rounded-l-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
// //             />
// //             <button
// //               type="submit"
// //               className="bg-teal-700 text-white px-6 py-3 rounded-r-lg hover:bg-teal-800 transition"
// //             >
// //               <i className="fas fa-paper-plane text-lg"></i>
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //       <div className="mt-12 text-center text-sm">
// //         © Copyright {new Date().getFullYear()} | All Rights Reserved by{" "}
// //         <a
// //           href="https://wpthemesgrid.com"
// //           className="underline hover:text-teal-300"
// //         >
// //           wpthemesgrid.com
// //         </a>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;

// import React from "react";

// const Footer = () => {
//   const quickLinks = [
//     { name: "Home", url: "/" },
//     { name: "About Us", url: "/about" },
//     { name: "Services", url: "/services" },
//     { name: "Our Cases", url: "#" },
//     { name: "Other Links", url: "#" },
//   ];

//   return (
//     <footer className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-14 mt-10">
//       <div className="container mx-auto px-6 sm:px-12 md:px-20">
//         <div className="flex flex-col md:flex-row justify-between items-start gap-16">
//           {/* About Us Section */}
//           <div className="space-y-6 md:w-1/3">
//             <h3 className="text-2xl font-semibold mb-4">About Us</h3>
//             <div className="w-16 h-1 bg-white mb-4"></div>
//             <p className="text-sm leading-relaxed">
//               We are dedicated to providing exceptional healthcare services
//               through modern technology and dedicated professionals.
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="#"
//                 aria-label="Facebook"
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-200 transition duration-300"
//               >
//                 <i className="fab fa-facebook-f text-xl"></i>
//               </a>
//               <a
//                 href="#"
//                 aria-label="Google"
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-200 transition duration-300"
//               >
//                 <i className="fab fa-google text-xl"></i>
//               </a>
//               <a
//                 href="#"
//                 aria-label="Twitter"
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-200 transition duration-300"
//               >
//                 <i className="fab fa-twitter text-xl"></i>
//               </a>
//               <a
//                 href="#"
//                 aria-label="Vimeo"
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-200 transition duration-300"
//               >
//                 <i className="fab fa-vimeo-v text-xl"></i>
//               </a>
//               <a
//                 href="#"
//                 aria-label="Pinterest"
//                 className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-teal-700 hover:bg-teal-200 transition duration-300"
//               >
//                 <i className="fab fa-pinterest text-xl"></i>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links Section */}
//           <div className="space-y-6 md:w-1/3">
//             <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
//             <div className="w-16 h-1 bg-white mb-4"></div>
//             <ul className="space-y-3 text-sm">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a
//                     href={link.url}
//                     className="hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-200 transition duration-300"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter Section */}
//           <div className="space-y-6 md:w-1/3">
//             <h3 className="text-2xl font-semibold mb-4">Newsletter</h3>
//             <div className="w-16 h-1 bg-white mb-4"></div>
//             <p className="text-sm leading-relaxed">
//               Subscribe to our newsletter and stay updated with the latest news
//               and health tips from our experts.
//             </p>
//             <form className="flex">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 aria-label="Email Address"
//                 required
//                 className="p-3 rounded-l-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
//               />
//               <button
//                 type="submit"
//                 className="bg-teal-700 text-white px-6 py-3 rounded-r-lg hover:bg-teal-800 transition duration-300"
//               >
//                 <i className="fas fa-paper-plane text-lg"></i>
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-16 text-center text-sm">
//           © {new Date().getFullYear()} All Rights Reserved by{" "}
//           <a
//             href="https://wpthemesgrid.com"
//             className="underline hover:text-teal-300 transition duration-300"
//           >
//             wpthemesgrid.com
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Our Doctors", url: "/doctors" },
    { name: "Contact", url: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "#", label: "Facebook" },
    { icon: <FaTwitter />, url: "#", label: "Twitter" },
    { icon: <FaInstagram />, url: "#", label: "Instagram" },
    { icon: <FaLinkedinIn />, url: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-r from-teal-700 to-teal-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* About Section */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-2xl font-bold mb-6 relative after:absolute after:left-0 after:-bottom-3 after:w-16 after:h-1 after:bg-teal-500">
              About Us
            </h3>
            <p className="text-sm leading-relaxed opacity-90 mb-6">
              Connecting you to expert healthcare professionals through
              innovative telemedicine solutions. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  aria-label={link.label}
                  className="p-3 rounded-full bg-teal-600 hover:bg-teal-500 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-2xl font-bold mb-6 relative after:absolute after:left-0 after:-bottom-3 after:w-16 after:h-1 after:bg-teal-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="opacity-90 hover:opacity-100 hover:text-teal-300 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:animate-pulse"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 lg:col-span-6">
            <h3 className="text-2xl font-bold mb-6 relative after:absolute after:left-0 after:-bottom-3 after:w-16 after:h-1 after:bg-teal-500">
              Stay Updated
            </h3>
            <p className="text-sm opacity-90 mb-6">
              Subscribe to our newsletter for health tips, updates, and special
              offers.
            </p>
            <form className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                  className="w-full px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-teal-500 focus:border-teal-300 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <FaPaperPlane className="text-lg" />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-teal-600 mb-8"></div>

        {/* Copyright */}
        <div className="text-center opacity-80 text-sm">
          <p>
            © {new Date().getFullYear()} HealthConnect. All rights reserved.
            <br className="md:hidden" />{" "}
            <a
              href="#"
              className="hover:text-teal-300 underline transition-colors"
            >
              Privacy Policy
            </a>{" "}
            |{" "}
            <a
              href="#"
              className="hover:text-teal-300 underline transition-colors"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
