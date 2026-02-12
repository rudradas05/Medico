import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const ABSOLUTE_URL_REGEX = /^https?:\/\//i;
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

const resolveImageUrl = (imagePath, backendurl = "") => {
  if (typeof imagePath !== "string") return "";

  const raw = imagePath.trim();
  if (!raw) return "";

  const normalized = raw.replace(/\\/g, "/");

  if (normalized.startsWith("//")) {
    return encodeURI(`https:${normalized}`);
  }

  if (ABSOLUTE_URL_REGEX.test(normalized)) {
    try {
      const parsed = new URL(normalized);
      if (
        parsed.protocol === "http:" &&
        !LOCAL_HOSTNAMES.has(parsed.hostname)
      ) {
        parsed.protocol = "https:";
        return encodeURI(parsed.toString());
      }
    } catch {
      // Return the input if URL parsing fails.
    }
    return encodeURI(normalized);
  }

  if (normalized.startsWith("data:") || normalized.startsWith("blob:")) {
    return normalized;
  }

  const baseUrl = (backendurl || "").replace(/\/+$/, "");
  if (!baseUrl) return encodeURI(normalized);

  if (normalized.startsWith("/")) {
    return encodeURI(`${baseUrl}${normalized}`);
  }

  return encodeURI(`${baseUrl}/${normalized}`);
};

const CATEGORY_LABELS = {
  "imaging-radiology": "Imaging & Radiology",
  laboratory: "Laboratory Tests",
  "cardiovascular-pulmonary": "Heart & Lungs",
  endoscopy: "Endoscopy",
  "neurological-functional": "Neuro & Functional",
};

const CATEGORY_ICONS = {
  "imaging-radiology": "🩻",
  laboratory: "🧪",
  "cardiovascular-pulmonary": "❤️",
  endoscopy: "🔬",
  "neurological-functional": "🧠",
};

const ServicesList = () => {
  const { backendurl, admintoken } = useContext(AdminContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/services/list`);
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      toast.error("Could not load services");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (serviceId, current) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/admin/update`,
        { serviceId, available: !current },
        { headers: { admintoken } },
      );
      if (data.success) {
        toast.success("Availability updated");
        fetchServices();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      const { data } = await axios.post(
        `${backendurl}/api/services/admin/delete`,
        { serviceId },
        { headers: { admintoken } },
      );
      if (data.success) {
        toast.success("Service deleted");
        fetchServices();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="m-5 w-full max-w-5xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        All Diagnostic Services
      </h2>

      {services.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No services added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl p-5 shadow-sm border flex flex-col sm:flex-row items-start gap-4"
            >
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50">
                {service.image ? (
                  <img
                    src={resolveImageUrl(service.image, backendurl)}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    {CATEGORY_ICONS[service.category] || "🧪"}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-grow space-y-1">
                <h3 className="font-semibold text-gray-800">{service.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-gray-700">
                    ₹{service.price}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">
                    {CATEGORY_LABELS[service.category] || service.category}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      service.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() =>
                    toggleAvailability(service._id, service.available)
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    service.available
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {service.available ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => deleteService(service._id)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;
