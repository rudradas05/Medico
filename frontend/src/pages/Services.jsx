import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiAperture,
  FiChevronRight,
  FiClock,
  FiCpu,
  FiFilter,
  FiGrid,
  FiHeart,
  FiSearch,
  FiShield,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { resolveImageUrl } from "../utils/imageUrl";

const CATEGORIES = [
  {
    value: "all",
    label: "All Services",
    hint: "Complete catalog",
    Icon: FiGrid,
  },
  {
    value: "imaging-radiology",
    label: "Imaging & Radiology",
    hint: "Scans and imaging",
    Icon: FiAperture,
  },
  {
    value: "laboratory",
    label: "Laboratory Tests",
    hint: "Blood and urine panels",
    Icon: FiActivity,
  },
  {
    value: "cardiovascular-pulmonary",
    label: "Heart & Lungs",
    hint: "Cardio and respiratory",
    Icon: FiHeart,
  },
  {
    value: "endoscopy",
    label: "Endoscopy",
    hint: "Internal diagnostics",
    Icon: FiSearch,
  },
  {
    value: "neurological-functional",
    label: "Neuro & Functional",
    hint: "Nerve and function tests",
    Icon: FiCpu,
  },
];

const CATEGORY_MAP = CATEGORIES.reduce((acc, item) => {
  if (item.value !== "all") {
    acc[item.value] = item;
  }
  return acc;
}, {});

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Services = () => {
  const { backendurl, currencySymbol } = useContext(AppContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const activeServices = useMemo(
    () => services.filter((service) => service.available),
    [services],
  );

  const filteredServices = useMemo(() => {
    return activeServices
      .filter(
        (service) =>
          activeCategory === "all" || service.category === activeCategory,
      )
      .filter((service) => {
        if (!search.trim()) return true;
        const query = search.toLowerCase();
        return (
          service.name.toLowerCase().includes(query) ||
          service.description?.toLowerCase().includes(query)
        );
      });
  }, [activeServices, activeCategory, search]);

  const uniqueCategoryCount = useMemo(() => {
    return new Set(activeServices.map((service) => service.category)).size;
  }, [activeServices]);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/services/list`);
      if (data.success) {
        setServices(data.services || []);
      } else {
        toast.error(data.message || "Could not load services");
      }
    } catch {
      toast.error("Could not load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [backendurl]);

  if (loading) {
    return (
      <div className="flex min-h-[62vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <section className="relative mt-4 overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 text-white shadow-lg">
        <div className="absolute -right-14 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-emerald-200/20 blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal-50">
              <FiShield className="h-4 w-4" />
              Trusted Diagnostics
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Book Diagnostic Services In Minutes
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-teal-50 sm:text-base">
              Browse verified lab tests and scans, compare prices, and book your
              preferred slot quickly from one place.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wide text-teal-100">
                Active Services
              </p>
              <p className="mt-1 text-2xl font-semibold">
                {activeServices.length}
              </p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wide text-teal-100">
                Categories
              </p>
              <p className="mt-1 text-2xl font-semibold">
                {uniqueCategoryCount}
              </p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wide text-teal-100">
                Slot Duration
              </p>
              <p className="mt-1 text-2xl font-semibold">30 Min</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-5 max-w-6xl px-2 sm:mt-6 sm:px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tests, scans, checkups..."
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
              <FiFilter className="h-4 w-4 text-primary" />
              <span>
                Showing{" "}
                <strong className="text-gray-700">
                  {filteredServices.length}
                </strong>{" "}
                {filteredServices.length === 1 ? "service" : "services"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.value;
              const Icon = category.Icon;

              return (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`flex min-w-max items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition sm:text-sm ${
                    isActive
                      ? "border-primary bg-teal-50 text-primary shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-teal-200 hover:text-teal-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-2 sm:px-4">
        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <FiSearch className="mx-auto h-10 w-10 text-gray-300" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              No services found
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
              {search
                ? `No match for "${search}". Try a broader keyword or clear filters.`
                : "No diagnostic services are available in this category right now."}
            </p>
            {(activeCategory !== "all" || search.trim()) && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                }}
                className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-600"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.06 }}
            className="grid grid-cols-1 gap-5 pb-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredServices.map((service) => {
              const categoryMeta = CATEGORY_MAP[service.category];
              const CategoryIcon = categoryMeta?.Icon || FiActivity;

              return (
                <motion.article
                  key={service._id}
                  variants={cardVariants}
                  onClick={() => navigate(`/services/${service._id}`)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50">
                    {service.image ? (
                      <img
                        src={resolveImageUrl(service.image, backendurl)}
                        alt={service.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="rounded-2xl border border-teal-200 bg-white/80 p-5 text-primary">
                          <CategoryIcon className="h-10 w-10" />
                        </span>
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full border border-teal-200 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                      {categoryMeta?.label || service.category}
                    </span>

                    <span className="absolute right-3 top-3 rounded-lg bg-gray-900/80 px-3 py-1.5 text-sm font-semibold text-white">
                      {currencySymbol}
                      {service.price}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-primary">
                      {service.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-500">
                      {service.description ||
                        "Detailed diagnostic service with professional guidance."}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <FiClock className="h-3.5 w-3.5 text-primary" />
                        30 min slot
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FiShield className="h-3.5 w-3.5 text-primary" />
                        Verified care
                      </span>
                    </div>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/services/${service._id}`);
                      }}
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
                    >
                      View and Book
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Services;
