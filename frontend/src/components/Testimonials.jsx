import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import { resolveImageUrl } from "../utils/imageUrl";

const Testimonials = () => {
  const { backendurl } = useContext(AppContext);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await axios.get(`${backendurl}/api/user/testimonials`);
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        } else {
          setTestimonials([]);
        }
      } catch {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [backendurl]);

  const orderedTestimonials = useMemo(() => {
    return [...testimonials]
      .sort((a, b) => (b.reviewedAt || 0) - (a.reviewedAt || 0))
      .slice(0, 10);
  }, [testimonials]);

  useEffect(() => {
    if (orderedTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % orderedTestimonials.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [orderedTestimonials.length]);

  if (loading || orderedTestimonials.length === 0) return null;

  return (
    <section className="mt-10 rounded-3xl bg-gradient-to-br from-white via-teal-50 to-emerald-100/60 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-teal-700">
              <FiMessageCircle className="h-3.5 w-3.5" />
              Patient Voices
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Real Reviews From Real Appointments
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
              Latest patient feedback, sliding from newest to oldest.
            </p>
          </div>
          <span className="rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-700">
            {orderedTestimonials.length} testimonial
            {orderedTestimonials.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {orderedTestimonials.map((item) => {
              const userInitial = (item.userName || "P").charAt(0).toUpperCase();
              return (
                <article key={item._id} className="min-w-full px-1 sm:px-2">
                  <div className="premium-panel rounded-2xl p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-3">
                        {item.userImage ? (
                          <img
                            src={resolveImageUrl(item.userImage, backendurl)}
                            alt={item.userName}
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-teal-100"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                            {userInitial}
                          </div>
                        )}

                        <div>
                          <p className="text-base font-semibold text-gray-900">{item.userName}</p>
                          <p className="text-xs text-gray-500">
                            For Dr. {item.doctorName}
                            {item.doctorSpeciality ? ` - ${item.doctorSpeciality}` : ""}
                          </p>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-600">
                        {Array.from({ length: 5 }, (_, index) => (
                          <FaStar
                            key={index}
                            className={`h-3.5 w-3.5 ${
                              index < Number(item.rating || 0)
                                ? "text-amber-400"
                                : "text-amber-200"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs font-semibold text-amber-700">
                          {item.rating}/5
                        </span>
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-gray-700">
                      "{item.review}"
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {orderedTestimonials.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {orderedTestimonials.map((item, index) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-teal-200 hover:bg-teal-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
