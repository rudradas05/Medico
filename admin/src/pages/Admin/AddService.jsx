import React, { useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddService = () => {
  const { backendurl, admintoken } = useContext(AdminContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("laboratory");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      return toast.error("Name, description and price are required");
    }

    // Parse pre-test instructions (comma separated)
    const preTestInstructions = instructions
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      if (image) formData.append("image", image);
      if (preTestInstructions.length > 0) {
        formData.append(
          "preTestInstructions",
          JSON.stringify(preTestInstructions),
        );
      }

      const { data } = await axios.post(
        `${backendurl}/api/services/admin/add`,
        formData,
        { headers: { admintoken } },
      );

      if (data.success) {
        toast.success("Service added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
        setCategory("laboratory");
        setInstructions("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-5 w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Add Diagnostic Service
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white rounded-xl p-6 shadow-sm border"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="e.g., Blood Sugar Test"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Detailed description of the service..."
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="99"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
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
            Service Image (optional)
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <label htmlFor="service-img" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-32 h-32 rounded-xl bg-gray-50 overflow-hidden">
                  {image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(image)}
                      alt="Service preview"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
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
                  {image ? image.name : "Click to upload service image"}
                </p>
              </div>
            </label>
            <input
              type="file"
              id="service-img"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Fast for 12 hours, Avoid alcohol"
          />
        </div>

        {/* Info about slots */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Time slots are automatically generated daily
            from 9:00 AM to 9:00 PM with 30-minute intervals. No manual slot
            configuration needed.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AddService;
