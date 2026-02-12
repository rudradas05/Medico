import React from "react";
import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

const contactCards = [
  {
    title: "Phone & Email",
    line1: "+ (000) 1234 56789",
    line2: "info@medico.com",
    Icon: FiPhone,
  },
  {
    title: "Address",
    line1: "Salt Lake City, Sector V",
    line2: "Kolkata, West Bengal, India",
    Icon: FiMapPin,
  },
  {
    title: "Working Hours",
    line1: "Mon - Sat: 8am - 5pm",
    line2: "Sunday Closed",
    Icon: FiClock,
  },
];

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="pb-10 pt-4">
      <section className="rounded-3xl bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 px-6 py-12 text-white shadow-[0_18px_40px_rgba(20,184,166,0.24)] sm:px-8 lg:px-12">
        <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-50">
          Contact Team
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">We are here to help</h1>
        <p className="mt-3 max-w-2xl text-sm text-teal-50 sm:text-base">
          Reach out for bookings, platform support, or general healthcare
          guidance. We will get back to you shortly.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="premium-panel overflow-hidden rounded-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.762185682023!2d88.36389391496092!3d22.57264618518062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02770000000001%3A0x8f8e4a34de2ac43a!2sKolkata%2C%20West%20Bengal%2C%20India!5e0!3m2!1sen!2sbd!4v1698869933324!5m2!1sen!2sbd"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map - Kolkata"
            className="h-[520px] w-full"
          />
        </div>

        <div className="premium-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900">Send us a message</h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the form and our team will respond soon.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
              />
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <input
              type="tel"
              placeholder="Phone number"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
            />

            <input
              type="text"
              required
              placeholder="Subject"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
            />

            <textarea
              rows={5}
              required
              placeholder="Your message"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
            />

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Send Message
              <FiSend className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {contactCards.map((item) => (
          <article key={item.title} className="premium-panel rounded-2xl p-5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <item.Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-700">{item.line1}</p>
            <p className="text-sm text-gray-500">{item.line2}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Contact;
