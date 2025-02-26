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
      <header className="text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your trusted partner in healthcare management
        </p>
      </header>

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
