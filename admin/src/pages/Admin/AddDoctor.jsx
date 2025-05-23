import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendurl, admintoken } = useContext(AdminContext);
  const { currencySymbol } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);

      const { data } = await axios.post(
        backendurl + "/api/admin/add-doctor",
        formData,
        { headers: { admintoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setSpeciality("General Physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="  mx-4 my-6 max-w-4xl">
      <div className="text-2xl font-bold text-gray-800 mb-6">
        Add New Doctor
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
          <label htmlFor="doc-img" className="cursor-pointer">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-24 h-24 rounded-full bg-gray-50 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={
                    docImg ? URL.createObjectURL(docImg) : assets.upload_area
                  }
                  alt="Doctor preview"
                />
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {docImg ? "Change photo" : "Click to upload doctor photo"}
              </p>
            </div>
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Dr. John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="doctor@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Speciality *
              </label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[
                  "General Physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience *
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consultation Fee *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  min="0"
                  required
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className="w-full pl-8 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="150"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education *
            </label>
            <input
              type="text"
              required
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="MBBS, MD, etc."
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Street address"
              />
            </div>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Apartment, suite, etc. (optional)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Doctor *
          </label>
          <textarea
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the doctor's expertise and qualifications..."
          />
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-6 space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? (
              <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></motion.div>
            ) : (
              "Add Doctor"
            )}
          </motion.button>
        </motion.div>
      </div>
    </form>
  );
};

export default AddDoctor;
