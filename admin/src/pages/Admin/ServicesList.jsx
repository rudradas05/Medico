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

/* ─── Edit Modal ─── */
const EditServiceModal = ({
  service,
  backendurl,
  admintoken,
  onClose,
  onUpdated,
}) => {
  const [name, setName] = useState(service.name || "");
  const [description, setDescription] = useState(service.description || "");
  const [price, setPrice] = useState(service.price || "");
  const [category, setCategory] = useState(service.category || "laboratory");
  const [instructions, setInstructions] = useState(
    (service.preTestInstructions || []).join(", "),
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    service.image ? resolveImageUrl(service.image, backendurl) : "",
  );
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price) {
      return toast.error("Name, description and price are required");
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("serviceId", service._id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const preTestInstructions = instructions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (preTestInstructions.length > 0) {
        formData.append(
          "preTestInstructions",
          JSON.stringify(preTestInstructions),
        );
      } else {
        formData.append("preTestInstructions", JSON.stringify([]));
      }

      const { data } = await axios.post(
        `${backendurl}/api/services/admin/update`,
        formData,
        { headers: { admintoken } },
      );

      if (data.success) {
        toast.success("Service updated successfully!");
        onUpdated();
        onClose();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4 rounded-t-2xl">
          <h3 className="text-lg font-semibold text-slate-800">Edit Service</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="admin-input"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="admin-input"
              required
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="admin-input"
              >
                <option value="imaging-radiology">Imaging & Radiology</option>
                <option value="laboratory">Laboratory Tests</option>
                <option value="cardiovascular-pulmonary">
                  Cardiovascular & Pulmonary
                </option>
                <option value="endoscopy">Endoscopy</option>
                <option value="neurological-functional">
                  Neurological & Functional
                </option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Image
            </label>
            <div className="rounded-2xl border-2 border-dashed border-teal-100 bg-teal-50/40 p-4 text-center">
              <label htmlFor="edit-service-img" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-white ring-1 ring-teal-100">
                    {imagePreview ? (
                      <img
                        className="w-full h-full object-cover"
                        src={imagePreview}
                        alt="Preview"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        {CATEGORY_ICONS[category] || "🧪"}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {imageFile ? imageFile.name : "Click to change image"}
                  </p>
                </div>
              </label>
              <input
                type="file"
                id="edit-service-img"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Pre-Test Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pre-Test Instructions (comma separated)
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="admin-input"
              placeholder="Fast for 12 hours, Avoid alcohol"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 rounded-xl py-3 font-semibold text-white transition-all ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-teal-600"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─── Services List ─── */
const ServicesList = () => {
  const { backendurl, admintoken } = useContext(AdminContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
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
              className="admin-card flex flex-col items-start gap-4 rounded-2xl p-5 sm:flex-row"
            >
              {/* Image */}
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 ring-1 ring-teal-100">
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
                <h3 className="font-semibold text-slate-800">{service.name}</h3>
                <p className="line-clamp-2 text-sm text-slate-500">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-slate-700">
                    ₹{service.price}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">
                    {CATEGORY_LABELS[service.category] || service.category}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      service.available
                        ? "bg-emerald-100 text-emerald-700"
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
                  onClick={() => setEditingService(service)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    toggleAvailability(service._id, service.available)
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    service.available
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
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

      {/* Edit Modal */}
      {editingService && (
        <EditServiceModal
          service={editingService}
          backendurl={backendurl}
          admintoken={admintoken}
          onClose={() => setEditingService(null)}
          onUpdated={fetchServices}
        />
      )}
    </div>
  );
};

export default ServicesList;
