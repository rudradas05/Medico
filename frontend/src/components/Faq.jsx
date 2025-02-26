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
