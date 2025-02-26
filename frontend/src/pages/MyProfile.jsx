import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  FiEdit,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiDroplet,
  FiAlertCircle,
  FiPlus,
  FiUser,
  FiHeart,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

const MyProfile = () => {
  const { userData, setUserData, token, backendurl, loadUserData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateUserData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", userData.address);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("bloodGroup", userData.bloodGroup);
      formData.append("bloodPressure", userData.bloodPressure);
      formData.append("allergies", userData.allergies);
      formData.append("medications", userData.medications);
      formData.append("medicalHistory", userData.medicalHistory);
      formData.append("hasAllergies", userData.hasAllergies);
      image && formData.append("image", image);

      const { data } = await axios.post(
        `${backendurl}/api/user/update-user-data`,
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message, toastConfig);
        await loadUserData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message, toastConfig);
      }
    } catch (error) {
      toast.error("Failed to connect. Please try again later.", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-50"
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative mb-6 group"
        >
          <div className="relative mb-6 group">
            <div className="relative rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 p-1.5 shadow-inner">
              <div className="relative rounded-full overflow-hidden border-4 border-white">
                <img
                  className={`w-32 h-32 object-cover transition-all duration-300 ${
                    isEdit ? "opacity-90 cursor-pointer grayscale-20" : ""
                  }`}
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                {isEdit && (
                  <label
                    htmlFor="image"
                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  >
                    <div className="animate-bounce">
                      <img
                        className="w-10 h-10 invert opacity-90"
                        src={assets.upload_icon}
                        alt="Upload"
                      />
                    </div>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
            </div>

            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                className="text-3xl font-bold text-center bg-transparent border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none pb-2 mt-4 px-4 transition-all duration-300"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {userData.name}
              </h2>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Section
            title="Contact Information"
            icon={<FiMail className="icon-style" />}
          >
            <InfoRow
              label="Email"
              value={userData.email}
              isEmail
              icon={<FiMail />}
            />
            <EditableInfo
              label="Phone"
              value={userData.phone}
              icon={<FiPhone />}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, phone: value }))
              }
            />
            <EditableInfo
              label="Address"
              value={userData.address}
              icon={<FiMapPin />}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, address: value }))
              }
            />
          </Section>

          <Section
            title="Basic Information"
            icon={<FiUser className="icon-style" />}
          >
            <EditableSelect
              label="Gender"
              value={userData.gender}
              icon={<FiUser />}
              options={["Male", "Female", "Other"]}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, gender: value }))
              }
            />
            <EditableDate
              label="Date of Birth"
              value={userData.dob}
              icon={<FiCalendar />}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, dob: value }))
              }
            />
          </Section>
        </div>

        <div className="space-y-6">
          <Section
            title="Health Information"
            icon={<FiHeart className="icon-style" />}
          >
            <EditableSelect
              label="Blood Group"
              value={userData.bloodGroup}
              icon={<FiDroplet />}
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, bloodGroup: value }))
              }
            />
            <EditableInfo
              label="Blood Pressure"
              value={userData.bloodPressure}
              icon={<FiAlertCircle />}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, bloodPressure: value }))
              }
            />
            <AllergiesInput
              userData={userData}
              setUserData={setUserData}
              isEdit={isEdit}
              icon={<FiAlertCircle />}
            />
            <EditableInfo
              label="Medications"
              value={userData.medications}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, medications: value }))
              }
            />
            <EditableTextarea
              label="Medical History"
              value={userData.medicalHistory}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, medicalHistory: value }))
              }
            />
          </Section>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
        {isEdit ? (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => setIsEdit(false)} variant="secondary">
                Cancel
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={updateUserData} isLoading={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </motion.div>
          </>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => setIsEdit(true)} variant="primary">
              <FiEdit className="mr-2" />
              Edit Profile
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Section = ({ title, children, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-b from-white to-indigo-50 p-6 rounded-2xl shadow-sm border border-gray-100"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-5">{children}</div>
  </motion.div>
);

const InfoRow = ({ label, value, isEmail, icon }) => (
  <div className="flex items-center p-3 bg-white rounded-lg shadow-xs hover:bg-gray-50 transition-colors">
    <span className="text-gray-500 mr-3">{icon}</span>
    <div className="flex-1 flex justify-between items-center">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      {isEmail ? (
        <a
          href={`mailto:${value}`}
          className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
        >
          {value}
        </a>
      ) : (
        <span className="text-gray-700 text-sm font-medium">
          {value || "-"}
        </span>
      )}
    </div>
  </div>
);

const EditableInfo = ({ label, value, isEdit, onChange, icon }) => (
  <div className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
    <span className="text-gray-500 mr-3">{icon}</span>
    <div className="flex-1 flex justify-between items-center">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      {isEdit ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-48 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
        />
      ) : (
        <span className="text-gray-700 text-sm font-medium">
          {value || "-"}
        </span>
      )}
    </div>
  </div>
);

const EditableSelect = ({ label, value, options, isEdit, onChange }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    {isEdit ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-48 px-3 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <span className="text-gray-700 text-sm">{value || "-"}</span>
    )}
  </div>
);

const EditableDate = ({ label, value, isEdit, onChange }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    {isEdit ? (
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-48 px-3 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    ) : (
      <span className="text-gray-700 text-sm">
        {value ? new Date(value).toLocaleDateString() : "-"}
      </span>
    )}
  </div>
);

const AllergiesInput = ({ userData, setUserData, isEdit }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-gray-600">Allergies:</span>
    {isEdit ? (
      <div className="flex flex-col gap-2 w-48">
        <select
          value={userData.hasAllergies}
          onChange={(e) => {
            const value = e.target.value;
            setUserData((prev) => ({
              ...prev,
              hasAllergies: value,
              allergies: value === "No" ? "None" : prev.allergies,
            }));
          }}
          className="px-3 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {userData.hasAllergies === "Yes" && (
          <input
            type="text"
            placeholder="Enter allergies..."
            value={userData.allergies}
            onChange={(e) =>
              setUserData((prev) => ({
                ...prev,
                allergies: e.target.value,
              }))
            }
            className="px-3 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        )}
      </div>
    ) : (
      <span className="text-gray-700 text-sm">{userData.allergies || "-"}</span>
    )}
  </div>
);

const EditableTextarea = ({ label, value, isEdit, onChange }) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    {isEdit ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    ) : (
      <span className="text-gray-700 text-sm">{value || "-"}</span>
    )}
  </div>
);

const Button = ({ children, onClick, variant = "primary", isLoading }) => {
  const baseStyles =
    "px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2";
  const variants = {
    primary:
      "bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-200",
    secondary:
      "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default MyProfile;
