import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
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
  const [loading, setLoading] = useState(false); // Loader state

  const updateUserData = async () => {
    setLoading(true); // Start loader
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
      setLoading(false); // Stop loader
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-6 group">
          <div className="relative rounded-full bg-gray-100 p-1">
            <img
              className={`w-32 h-32 rounded-full object-cover ${
                isEdit ? "opacity-75 cursor-pointer" : ""
              }`}
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            {isEdit && (
              <label
                htmlFor="image"
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <img
                  className="w-8 h-8 invert"
                  src={assets.upload_icon}
                  alt="Upload"
                />
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

          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              className="text-2xl font-bold text-center border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none pb-2 mt-4"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-3xl font-bold text-gray-900">
              {userData.name}
            </h2>
          )}
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact & Basic Info */}
        <div className="space-y-6">
          <Section title="Contact Information">
            <InfoRow label="Email" value={userData.email} isEmail />
            <EditableInfo
              label="Phone"
              value={userData.phone}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, phone: value }))
              }
            />
            <EditableInfo
              label="Address"
              value={userData.address}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, address: value }))
              }
            />
          </Section>

          <Section title="Basic Information">
            <EditableSelect
              label="Gender"
              value={userData.gender}
              options={["Male", "Female", "Other"]}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, gender: value }))
              }
            />
            <EditableDate
              label="Date of Birth"
              value={userData.dob}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, dob: value }))
              }
            />
          </Section>
        </div>

        {/* Health Information */}
        <div className="space-y-6">
          <Section title="Health Information">
            <EditableSelect
              label="Blood Group"
              value={userData.bloodGroup}
              options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, bloodGroup: value }))
              }
            />
            <EditableInfo
              label="Blood Pressure"
              value={userData.bloodPressure}
              isEdit={isEdit}
              onChange={(value) =>
                setUserData((prev) => ({ ...prev, bloodPressure: value }))
              }
            />
            <AllergiesInput
              userData={userData}
              setUserData={setUserData}
              isEdit={isEdit}
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8 border-t pt-6">
        {isEdit ? (
          <>
            <Button onClick={() => setIsEdit(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={updateUserData} isLoading={loading}>
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEdit(true)} variant="primary">
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <div className="bg-gray-50 p-5 rounded-xl">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const InfoRow = ({ label, value, isEmail }) => (
  <div className="flex justify-between items-start">
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    {isEmail ? (
      <a href={`mailto:${value}`} className="text-indigo-600 text-sm">
        {value}
      </a>
    ) : (
      <span className="text-gray-700 text-sm">{value || "-"}</span>
    )}
  </div>
);

const EditableInfo = ({ label, value, isEdit, onChange }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    {isEdit ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-48 px-3 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    ) : (
      <span className="text-gray-700 text-sm">{value || "-"}</span>
    )}
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
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default MyProfile;
