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

        <div className="border-t border-teal-600 mb-8"></div>

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
