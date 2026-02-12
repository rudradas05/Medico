import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiLinkedin, FiSend, FiTwitter } from "react-icons/fi";
import { assets } from "../assets/assets";

const links = [
  { label: "Home", path: "/" },
  { label: "Doctors", path: "/doctors" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="mt-14 rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-600 px-5 py-10 text-white sm:px-8 lg:px-10">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <img src={assets.logo} alt="Medico" className="h-10" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-teal-50">
            Medico helps patients connect with trusted doctors and diagnostic
            services through a simple and secure digital experience.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, index) => (
              <button
                key={index}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-teal-50 transition hover:bg-white/20"
                aria-label="Social link"
                type="button"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <div className="mt-4 grid gap-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="w-fit text-sm text-teal-50 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Stay Updated</h3>
          <p className="mt-3 text-sm text-teal-50">
            Subscribe for healthcare tips and feature updates.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-teal-100 focus:border-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
            >
              <FiSend className="h-4 w-4" />
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-white/20 pt-4 text-xs text-teal-100 sm:flex sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Medico. All rights reserved.</p>
        <div className="mt-2 flex items-center gap-4 sm:mt-0">
          <button type="button" className="hover:text-white transition">
            Privacy Policy
          </button>
          <button type="button" className="hover:text-white transition">
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
