// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import axios from "axios";
// import { AppContext } from "../../context/AppContext";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const DoctorProfile = () => {
//   const { doctortoken, backendurl, doctorData, setDoctorData, loadDoctorData } =
//     useContext(DoctorContext);
//   const { currencySymbol } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Handle profile update
//   const updateDoctorData = async () => {
//     setLoading(true);
//     try {
//       const updateData = {
//         address: doctorData.address,
//         available: doctorData.available,
//         fees: doctorData.fees,
//         about: doctorData.about,
//       };

//       // Call the backend API
//       const { data } = await axios.post(
//         `${backendurl}/api/doctor/update-doctor-data`,
//         updateData,
//         {
//           headers: {
//             doctortoken,
//           },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         setDoctorData(data.updatedDoctor); // Update doctor data in context
//         setIsEdit(false); // Exit edit mode
//         loadDoctorData();
//         setLoading(false);
//       } else {
//         setLoading(false);
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     loadDoctorData();
//   }, [doctortoken]);

//   return (
//     doctorData && (
//       <div className="flex flex-col gap-6 m-8">
//         <div className="relative">
//           <img
//             className="bg-primary/80 w-full sm:max-w-64 rounded-lg shadow-lg"
//             src={doctorData.image}
//             alt="Doctor"
//           />
//         </div>
//         <div className="flex-1 border border-stone-200 rounded-lg p-8 py-7 bg-white shadow-md transition-all duration-300 ease-in-out">
//           <p className="flex items-center gap-2 text-3xl font-semibold text-gray-800">
//             {doctorData.name}
//           </p>
//           <div className="flex items-center gap-3 mt-1 text-gray-600">
//             <p>
//               {doctorData.degree} - {doctorData.speciality}
//             </p>
//             <button className="py-0.5 px-2 border text-xs rounded-full text-blue-600 bg-blue-100">
//               {doctorData.experience} years
//             </button>
//           </div>
//           <div>
//             <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-2">
//               About:
//             </p>
//             <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//               {isEdit ? (
//                 <input
//                   type="text"
//                   onChange={(e) =>
//                     setDoctorData((prev) => ({
//                       ...prev,
//                       about: e.target.value,
//                     }))
//                   }
//                   className="border rounded-md p-2 w-full"
//                   value={doctorData.about}
//                 />
//               ) : (
//                 doctorData.about
//               )}
//             </p>
//           </div>
//           <p className="text-gray-600 font-medium mt-4">
//             Appointment Fee :{" "}
//             <span className="text-gray-800">
//               {currencySymbol}
//               {isEdit ? (
//                 <input
//                   type="number"
//                   onChange={(e) =>
//                     setDoctorData((prev) => ({
//                       ...prev,
//                       fees: e.target.value,
//                     }))
//                   }
//                   className="border rounded-md p-2 w-32"
//                   value={doctorData.fees}
//                 />
//               ) : (
//                 doctorData.fees
//               )}
//             </span>
//           </p>
//           <div className="flex gap-2 py-2">
//             <p>Address:</p>
//             <p className="text-sm">
//               {isEdit ? (
//                 <input
//                   type="text"
//                   onChange={(e) =>
//                     setDoctorData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line1: e.target.value },
//                     }))
//                   }
//                   className="border rounded-md p-2 w-full"
//                   value={doctorData.address.line1}
//                 />
//               ) : (
//                 doctorData.address.line1
//               )}
//               <br />
//               {isEdit ? (
//                 <input
//                   type="text"
//                   onChange={(e) =>
//                     setDoctorData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line2: e.target.value },
//                     }))
//                   }
//                   className="border rounded-md p-2 w-full mt-2"
//                   value={doctorData.address.line2}
//                 />
//               ) : (
//                 doctorData.address.line2
//               )}
//             </p>
//           </div>
//           <div className="flex gap-1 pt-2">
//             <input
//               onChange={() =>
//                 isEdit &&
//                 setDoctorData((prev) => ({
//                   ...prev,
//                   available: !prev.available,
//                 }))
//               }
//               checked={doctorData.available}
//               type="checkbox"
//             />
//             <label htmlFor="">Available</label>
//           </div>

//           {isEdit ? (
//             <motion.button
//               onClick={updateDoctorData}
//               className="px-6 py-2 bg-blue-500 text-white text-sm rounded-full mt-5 hover:bg-blue-600 focus:outline-none"
//               disabled={loading}
//               whileTap={{ scale: 0.95 }}
//             >
//               {loading ? (
//                 <div className="w-4 h-4 border-4 border-t-4 border-white rounded-full animate-spin mx-auto" />
//               ) : (
//                 "Save"
//               )}
//             </motion.button>
//           ) : (
//             <button
//               onClick={() => {
//                 setIsEdit(true);
//               }}
//               className="px-6 py-2 border-primary text-sm rounded-full mt-5 hover:bg-primary/10"
//             >
//               Edit
//             </button>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default DoctorProfile;

import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiMapPin,
  FiDollarSign,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const DoctorProfile = () => {
  const { doctortoken, backendurl, doctorData, setDoctorData, loadDoctorData } =
    useContext(DoctorContext);
  const { currencySymbol } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateDoctorData = async () => {
    setLoading(true);
    try {
      const updateData = {
        address: doctorData.address,
        available: doctorData.available,
        fees: doctorData.fees,
        about: doctorData.about,
      };

      const { data } = await axios.post(
        `${backendurl}/api/doctor/update-doctor-data`,
        updateData,
        { headers: { doctortoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDoctorData(data.updatedDoctor);
        setIsEdit(false);
        loadDoctorData();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadDoctorData();
  }, [doctortoken]);

  return (
    doctorData && (
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-80 flex-shrink-0 bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="relative group">
              <img
                className="w-full h-64 object-cover rounded-xl mb-4"
                src={doctorData.image}
                alt="Doctor"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {doctorData.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {doctorData.degree} • {doctorData.speciality}
              </p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {doctorData.experience}
                </span>
                <div className="flex items-center gap-1">
                  {doctorData.available ? (
                    <FiCheckCircle className="text-green-500" />
                  ) : (
                    <FiXCircle className="text-red-500" />
                  )}
                  <span className="text-sm">
                    {doctorData.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Profile Information
              </h2>
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  backgroundColor: isEdit ? "#f3f4f6" : "#3b82f6",
                  color: isEdit ? "#374151" : "white",
                }}
              >
                <FiEdit className="text-sm" />
                {isEdit ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <div className="space-y-6">
              {/* About Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiInfo className="text-gray-500" />
                  <h3 className="font-semibold text-gray-700">About</h3>
                </div>
                {isEdit ? (
                  <textarea
                    value={doctorData.about}
                    onChange={(e) =>
                      setDoctorData({ ...doctorData, about: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {doctorData.about}
                  </p>
                )}
              </div>

              {/* Fee & Address Section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiDollarSign className="text-gray-500" />
                    <h3 className="font-semibold text-gray-700">
                      Appointment Fee
                    </h3>
                  </div>
                  {isEdit ? (
                    <input
                      type="number"
                      value={doctorData.fees}
                      onChange={(e) =>
                        setDoctorData({ ...doctorData, fees: e.target.value })
                      }
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {currencySymbol}
                      {doctorData.fees}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiMapPin className="text-gray-500" />
                    <h3 className="font-semibold text-gray-700">Address</h3>
                  </div>
                  {isEdit ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={doctorData.address.line1}
                        onChange={(e) =>
                          setDoctorData({
                            ...doctorData,
                            address: {
                              ...doctorData.address,
                              line1: e.target.value,
                            },
                          })
                        }
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={doctorData.address.line2}
                        onChange={(e) =>
                          setDoctorData({
                            ...doctorData,
                            address: {
                              ...doctorData.address,
                              line2: e.target.value,
                            },
                          })
                        }
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-600 space-y-1">
                      <p>{doctorData.address.line1}</p>
                      <p>{doctorData.address.line2}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Availability Toggle */}
              {isEdit && (
                <div className="flex items-center gap-4 pt-4">
                  <label className="font-medium text-gray-700">
                    Availability
                  </label>
                  <div
                    onClick={() =>
                      setDoctorData({
                        ...doctorData,
                        available: !doctorData.available,
                      })
                    }
                    className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                      doctorData.available ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                        doctorData.available ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Save Button */}
              {isEdit && (
                <motion.button
                  onClick={updateDoctorData}
                  disabled={loading}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
