import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqItems = [
  {
    question: "How does remote consultation work?",
    answer:
      "Book an appointment, join at the scheduled time, and discuss your symptoms directly with the doctor through your preferred channel.",
  },
  {
    question: "How quickly can I start a consultation?",
    answer:
      "You can usually connect within a few minutes for instant consultations, or choose a scheduled slot that works best for you.",
  },
  {
    question: "Are doctors verified for online consultations?",
    answer:
      "Yes. Doctors are verified for qualifications, registrations, and relevant documentation before onboarding.",
  },
  {
    question: "Can I follow up after the consultation?",
    answer:
      "Yes. You can book follow-up appointments and maintain continuity of care through your profile.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleItem = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="mt-10 rounded-3xl bg-gradient-to-br from-white via-teal-50/60 to-emerald-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-700">
            Help Center
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Quick answers to common questions about consultations and bookings.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <article
                key={item.question}
                className="premium-panel overflow-hidden rounded-2xl"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-gray-900 sm:text-base">
                    {item.question}
                  </span>
                  <FiChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-teal-700 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-6 text-gray-600">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
