// // // import React, { useContext, useState } from "react";
// // // import { AppContext } from "../context/AppContext";
// // // import { assets } from "../assets/assets";
// // // import axios from "axios";
// // // import { toast } from "react-toastify";

// // // const MyProfile = () => {
// // //   const { userData, setUserData, token, backendurl, loadUserData } =
// // //     useContext(AppContext);
// // //   const [isEdit, setIsEdit] = useState(false);
// // //   const [image, setImage] = useState(null);

// // //   const updateUserData = async () => {
// // //     try {
// // //       const formData = new FormData();

// // //       formData.append("name", userData.name);
// // //       formData.append("phone", userData.phone);
// // //       formData.append("address", userData.address);
// // //       formData.append("dob", userData.dob);
// // //       formData.append("gender", userData.gender);
// // //       formData.append("bloodGroup", userData.bloodGroup);
// // //       formData.append("bloodPressure", userData.bloodPressure);
// // //       formData.append("allergies", userData.allergies);
// // //       formData.append("medications", userData.medications);
// // //       formData.append("medicalHistory", userData.medicalHistory);
// // //       formData.append("hasAllergies", userData.hasAllergies);
// // //       image && formData.append("image", image);

// // //       const { data } = await axios.post(
// // //         `${backendurl}/api/user/update-user-data`,
// // //         formData,
// // //         {
// // //           headers: { token },
// // //         }
// // //       );

// // //       if (data.success) {
// // //         toast.success(data.message);
// // //         await loadUserData();
// // //         setIsEdit(false);
// // //         setImage(null);
// // //       } else {
// // //         toast.error(data.message);
// // //       }
// // //     } catch (error) {
// // //       toast.error("Failed to connect. Please try again later.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6 max-w-6xl mx-auto shadow-lg rounded-lg bg-white">
// // //       {/* Profile Header */}
// // //       <div className="flex flex-col items-center mb-8">
// // //         {/* Profile Picture */}
// // //         <div className="relative mb-4">
// // //           {isEdit ? (
// // //             <label htmlFor="image">
// // //               <div className="inline-block relative cursor-pointer">
// // //                 <img
// // //                   className="w-36 rounded opacity-60"
// // //                   src={image ? URL.createObjectURL(image) : userData.image}
// // //                   alt=""
// // //                 />
// // //                 <img
// // //                   className="w-10 absolute bottom-12 right-12"
// // //                   src={image ? "" : assets.upload_icon}
// // //                   alt=""
// // //                 />
// // //               </div>
// // //               <input
// // //                 onChange={(e) => setImage(e.target.files[0])}
// // //                 type="file"
// // //                 id="image"
// // //                 hidden
// // //               />
// // //             </label>
// // //           ) : (
// // //             <img className="w-36 rounded" src={userData.image} alt="" />
// // //           )}
// // //         </div>

// // //         {isEdit ? (
// // //           <input
// // //             type="text"
// // //             value={userData.name}
// // //             className="text-xl font-semibold text-center border p-2 rounded w-full max-w-xs"
// // //             onChange={(e) =>
// // //               setUserData((prev) => ({ ...prev, name: e.target.value }))
// // //             }
// // //           />
// // //         ) : (
// // //           <h2 className="text-3xl font-semibold">{userData.name}</h2>
// // //         )}
// // //       </div>
// // //       <hr className="bg-zinc-400 h-[1px] border-none mb-2" />

// // //       {/* Profile Body */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
// // //         {/* Left Column: Basic & Contact Information */}
// // //         <div>
// // //           {/* Contact Information */}
// // //           <div className="mb-6">
// // //             <p className="text-neutral-500 text-xl font-semibold underline mt-3">
// // //               CONTACT INFORMATION
// // //             </p>
// // //             <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
// // //               <p className="font-medium mr-2">Email id:</p>
// // //               <p className="text-blue-500">{userData.email}</p>
// // //               <p className="font-medium mr-2">Phone:</p>
// // //               {isEdit ? (
// // //                 <input
// // //                   type="text"
// // //                   value={userData.phone}
// // //                   className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                   onChange={(e) =>
// // //                     setUserData((prev) => ({
// // //                       ...prev,
// // //                       phone: e.target.value,
// // //                     }))
// // //                   }
// // //                 />
// // //               ) : (
// // //                 <p className="text-blue-400">{userData.phone}</p>
// // //               )}

// // //               <p className="font-medium mr-2">Address:</p>
// // //               {isEdit ? (
// // //                 <input
// // //                   type="text"
// // //                   value={userData.address}
// // //                   className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                   onChange={(e) =>
// // //                     setUserData((prev) => ({
// // //                       ...prev,
// // //                       address: e.target.value,
// // //                     }))
// // //                   }
// // //                 />
// // //               ) : (
// // //                 <p className="text-gray-900">{userData.address}</p>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Basic Information */}
// // //           <div className="mb-6">
// // //             <p className="text-neutral-500 text-xl font-semibold underline mt-3">
// // //               BASIC INFORMATION
// // //             </p>
// // //             <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
// // //               <p className="font-medium mr-2">Gender:</p>
// // //               {isEdit ? (
// // //                 <select
// // //                   value={userData.gender}
// // //                   className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                   onChange={(e) =>
// // //                     setUserData((prev) => ({
// // //                       ...prev,
// // //                       gender: e.target.value,
// // //                     }))
// // //                   }
// // //                 >
// // //                   <option value="Male">Male</option>
// // //                   <option value="Female">Female</option>
// // //                   <option value="other">Other</option>
// // //                 </select>
// // //               ) : (
// // //                 <p className="text-gray-900">{userData.gender}</p>
// // //               )}

// // //               <p className="font-medium mr-2">Date of Birth:</p>
// // //               {isEdit ? (
// // //                 <input
// // //                   type="date"
// // //                   value={userData.dob}
// // //                   className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                   onChange={(e) =>
// // //                     setUserData((prev) => ({
// // //                       ...prev,
// // //                       dob: e.target.value,
// // //                     }))
// // //                   }
// // //                 />
// // //               ) : (
// // //                 <p>{new Date(userData.dob).toLocaleDateString()}</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Right Column: Health Information */}
// // //         <div>
// // //           <p className="text-neutral-500 text-xl font-semibold underline mt-3">
// // //             HEALTH INFORMATION
// // //           </p>
// // //           <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
// // //             <p className="font-medium mr-2">Blood Group:</p>
// // //             {isEdit ? (
// // //               <select
// // //                 value={userData.bloodGroup}
// // //                 className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                 onChange={(e) =>
// // //                   setUserData((prev) => ({
// // //                     ...prev,
// // //                     bloodGroup: e.target.value,
// // //                   }))
// // //                 }
// // //               >
// // //                 <option value="A+">A+</option>
// // //                 <option value="A-">A-</option>
// // //                 <option value="B+">B+</option>
// // //                 <option value="B-">B-</option>
// // //                 <option value="AB+">AB+</option>
// // //                 <option value="AB-">AB-</option>
// // //                 <option value="O+">O+</option>
// // //                 <option value="O-">O-</option>
// // //               </select>
// // //             ) : (
// // //               <p className="text-gray-900">{userData.bloodGroup}</p>
// // //             )}
// // //             <p className="font-medium mr-2">Blood Pressure:</p>
// // //             {isEdit ? (
// // //               <input
// // //                 type="text"
// // //                 value={userData.bloodPressure}
// // //                 className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                 onChange={(e) =>
// // //                   setUserData((prev) => ({
// // //                     ...prev,
// // //                     bloodPressure: e.target.value,
// // //                   }))
// // //                 }
// // //               />
// // //             ) : (
// // //               <p className="text-gray-900">{userData.bloodPressure}</p>
// // //             )}
// // //             {/*
// // //             <p className="font-medium mr-2">Allergies:</p>
// // //             {isEdit ? (
// // //               <div className="flex flex-col gap-2">
// // //                 <select
// // //                   value={userData.hasAllergies}
// // //                   className="border bg-gray-100 rounded max-w-xs"
// // //                   onChange={(e) => {
// // //                     const value = e.target.value;
// // //                     setUserData((prev) => ({
// // //                       ...prev,
// // //                       hasAllergies: value,
// // //                       allergies: value === "No" ? "None" : prev.allergies,
// // //                     }));
// // //                   }}
// // //                 >
// // //                   <option value="No">No</option>
// // //                   <option value="Yes">Yes</option>
// // //                 </select>
// // //                 {userData.hasAllergies === "Yes" && (
// // //                   <input
// // //                     type="text"
// // //                     placeholder="Fill Details..."
// // //                     value={userData.allergies}
// // //                     className="border bg-gray-100 rounded max-w-xs"
// // //                     onChange={(e) =>
// // //                       setUserData((prev) => ({
// // //                         ...prev,
// // //                         allergies: e.target.value,
// // //                       }))
// // //                     }
// // //                   />
// // //                 )}
// // //               </div>
// // //             ) : (
// // //               <p className="text-gray-900">{userData.allergies}</p>
// // //             )} */}
// // //             {/* <p className="font-medium mr-2">Allergies:</p>
// // //             {isEdit ? (
// // //               <div className="flex flex-col gap-2">
// // //                 <select
// // //                   value={userData.hasAllergies}
// // //                   className="border bg-gray-100 rounded max-w-xs"
// // //                   onChange={(e) => {
// // //                     const value = e.target.value;
// // //                     setUserData((prev) => ({
// // //                       ...prev,
// // //                       hasAllergies: value,
// // //                       allergies: value === "No" ? "None" : prev.allergies, // Reset allergies if No is selected
// // //                     }));
// // //                   }}
// // //                 >
// // //                   <option value="No">No</option>
// // //                   <option value="Yes">Yes</option>
// // //                 </select>
// // //                 {userData.hasAllergies === "Yes" && (
// // //                   <input
// // //                     type="text"
// // //                     placeholder="Fill Details..."
// // //                     value={userData.allergies}
// // //                     className="border bg-gray-100 rounded max-w-xs"
// // //                     onChange={(e) =>
// // //                       setUserData((prev) => ({
// // //                         ...prev,
// // //                         allergies: e.target.value,
// // //                       }))
// // //                     }
// // //                   />
// // //                 )}
// // //               </div>
// // //             ) : (
// // //               <p className="text-gray-900">{userData.allergies}</p>
// // //             )} */}
// // //             <p className="font-medium mr-2">Allergies:</p>{" "}
// // //             {isEdit ? (
// // //               <div className="flex flex-col gap-2">
// // //                 <select
// // //                   value={userData.hasAllergies}
// // //                   className="border bg-gray-100 rounded max-w-xs"
// // //                   onChange={(e) => {
// // //                     const value = e.target.value;
// // //                     setUserData((prev) => ({
// // //                       ...prev,
// // //                       hasAllergies: value,
// // //                       allergies: value === "No" ? "None" : prev.allergies,
// // //                     }));
// // //                   }}
// // //                 >
// // //                   <option value="No">No</option>
// // //                   <option value="Yes">Yes</option>
// // //                 </select>
// // //                 {userData.hasAllergies === "Yes" ? (
// // //                   <input
// // //                     type="text"
// // //                     placeholder="Fill Details..."
// // //                     value={userData.allergies}
// // //                     className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                     onChange={(e) =>
// // //                       setUserData((prev) => ({
// // //                         ...prev,
// // //                         allergies: e.target.value,
// // //                       }))
// // //                     }
// // //                   />
// // //                 ) : userData.hasAllergies === "No" ? (
// // //                   <p>None</p>
// // //                 ) : null}
// // //               </div>
// // //             ) : (
// // //               <p className="text-gray-900">{userData.allergies}</p>
// // //             )}
// // //             <p className="font-medium mr-2">Medications:</p>
// // //             {isEdit ? (
// // //               <input
// // //                 type="text"
// // //                 value={userData.medications}
// // //                 className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                 onChange={(e) =>
// // //                   setUserData((prev) => ({
// // //                     ...prev,
// // //                     medications: e.target.value,
// // //                   }))
// // //                 }
// // //               />
// // //             ) : (
// // //               <p className="text-gray-900">{userData.medications}</p>
// // //             )}
// // //             <p className="font-medium mr-2">Medical History:</p>
// // //             {isEdit ? (
// // //               <textarea
// // //                 rows={5}
// // //                 type="text"
// // //                 value={userData.medicalHistory}
// // //                 className="border bg-gray-100 rounded max-w-xs pl-2"
// // //                 onChange={(e) =>
// // //                   setUserData((prev) => ({
// // //                     ...prev,
// // //                     medicalHistory: e.target.value,
// // //                   }))
// // //                 }
// // //               />
// // //             ) : (
// // //               <p className="text-gray-900">{userData.medicalHistory}</p>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Action Buttons */}
// // //       <div className="mt-6 flex flex-col sm:flex-row justify-between">
// // //         {isEdit ? (
// // //           <button
// // //             onClick={updateUserData}
// // //             className="bg-green-500 text-white py-2 px-4 rounded"
// // //           >
// // //             Save Information
// // //           </button>
// // //         ) : (
// // //           <button
// // //             onClick={() => setIsEdit(true)} // Cancel and toggle off edit mode
// // //             className="bg-blue-500 text-white py-2 px-4 rounded mb-2 sm:mb-0"
// // //           >
// // //             Edit
// // //           </button>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MyProfile;
// // import React, { useContext, useState } from "react";
// // import { AppContext } from "../context/AppContext";
// // import { assets } from "../assets/assets";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const toastConfig = {
// //   position: "top-right",
// //   autoClose: 5000, // 5 seconds
// //   hideProgressBar: false,
// //   closeOnClick: true,
// //   pauseOnHover: true,
// //   draggable: true,
// //   theme: "colored",
// // };

// // const MyProfile = () => {
// //   const { userData, setUserData, token, backendurl, loadUserData } =
// //     useContext(AppContext);
// //   const [isEdit, setIsEdit] = useState(false);
// //   const [image, setImage] = useState(null);
// //   const [loading, setLoading] = useState(false); // Loader state

// //   const updateUserData = async () => {
// //     setLoading(true); // Start loader
// //     try {
// //       const formData = new FormData();

// //       formData.append("name", userData.name);
// //       formData.append("phone", userData.phone);
// //       formData.append("address", userData.address);
// //       formData.append("dob", userData.dob);
// //       formData.append("gender", userData.gender);
// //       formData.append("bloodGroup", userData.bloodGroup);
// //       formData.append("bloodPressure", userData.bloodPressure);
// //       formData.append("allergies", userData.allergies);
// //       formData.append("medications", userData.medications);
// //       formData.append("medicalHistory", userData.medicalHistory);
// //       formData.append("hasAllergies", userData.hasAllergies);
// //       image && formData.append("image", image);

// //       const { data } = await axios.post(
// //         `${backendurl}/api/user/update-user-data`,
// //         formData,
// //         {
// //           headers: { token },
// //         }
// //       );

// //       if (data.success) {
// //         toast.success(data.message, toastConfig);
// //         await loadUserData();
// //         setIsEdit(false);
// //         setImage(null);
// //       } else {
// //         toast.error(data.message, toastConfig);
// //       }
// //     } catch (error) {
// //       toast.error("Failed to connect. Please try again later.", toastConfig);
// //     } finally {
// //       setLoading(false); // Stop loader
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-6xl mx-auto shadow-lg rounded-lg bg-white">
// //       {/* Profile Header */}
// //       <div className="flex flex-col items-center mb-8">
// //         {/* Profile Picture */}
// //         <div className="relative mb-4">
// //           {isEdit ? (
// //             <label htmlFor="image">
// //               <div className="inline-block relative cursor-pointer">
// //                 <img
// //                   className="w-36 rounded opacity-60"
// //                   src={image ? URL.createObjectURL(image) : userData.image}
// //                   alt=""
// //                 />
// //                 <img
// //                   className="w-10 absolute bottom-12 right-12"
// //                   src={image ? "" : assets.upload_icon}
// //                   alt=""
// //                 />
// //               </div>
// //               <input
// //                 onChange={(e) => setImage(e.target.files[0])}
// //                 type="file"
// //                 id="image"
// //                 hidden
// //               />
// //             </label>
// //           ) : (
// //             <img className="w-36 rounded" src={userData.image} alt="" />
// //           )}
// //         </div>

// //         {isEdit ? (
// //           <input
// //             type="text"
// //             value={userData.name}
// //             className="text-xl font-semibold text-center border p-2 rounded w-full max-w-xs"
// //             onChange={(e) =>
// //               setUserData((prev) => ({ ...prev, name: e.target.value }))
// //             }
// //           />
// //         ) : (
// //           <h2 className="text-3xl font-semibold">{userData.name}</h2>
// //         )}
// //       </div>
// //       <hr className="bg-zinc-400 h-[1px] border-none mb-2" />

// //       {/* Profile Body */}
// //       <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
// //         {/* Left Column: Basic & Contact Information */}
// //         <div>
// //           {/* Contact Information */}
// //           <div className="mb-6">
// //             <p className="text-neutral-500 text-xl font-semibold underline mt-3">
// //               CONTACT INFORMATION
// //             </p>
// //             <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
// //               <p className="font-medium mr-2">Email id:</p>
// //               <p className="text-blue-500">{userData.email}</p>
// //               <p className="font-medium mr-2">Phone:</p>
// //               {isEdit ? (
// //                 <input
// //                   type="text"
// //                   value={userData.phone}
// //                   className="border bg-gray-100 rounded max-w-xs pl-2"
// //                   onChange={(e) =>
// //                     setUserData((prev) => ({
// //                       ...prev,
// //                       phone: e.target.value,
// //                     }))
// //                   }
// //                 />
// //               ) : (
// //                 <p className="text-blue-400">{userData.phone}</p>
// //               )}

// //               <p className="font-medium mr-2">Address:</p>
// //               {isEdit ? (
// //                 <input
// //                   type="text"
// //                   value={userData.address}
// //                   className="border bg-gray-100 rounded max-w-xs pl-2"
// //                   onChange={(e) =>
// //                     setUserData((prev) => ({
// //                       ...prev,
// //                       address: e.target.value,
// //                     }))
// //                   }
// //                 />
// //               ) : (
// //                 <p className="text-gray-900">{userData.address}</p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Basic Information */}
// //           <div className="mb-6">
// //             <p className="text-neutral-500 text-xl font-semibold underline mt-3">
// //               BASIC INFORMATION
// //             </p>
// //             <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
// //               <p className="font-medium mr-2">Gender:</p>
// //               {isEdit ? (
// //                 <select
// //                   value={userData.gender}
// //                   className="border bg-gray-100 rounded max-w-xs pl-2"
// //                   onChange={(e) =>
// //                     setUserData((prev) => ({
// //                       ...prev,
// //                       gender: e.target.value,
// //                     }))
// //                   }
// //                 >
// //                   <option value="Male">Male</option>
// //                   <option value="Female">Female</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               ) : (
// //                 <p className="text-gray-900">{userData.gender}</p>
// //               )}

// //               <p className="font-medium mr-2">Date of Birth:</p>
// //               {isEdit ? (
// //                 <input
// //                   type="date"
// //                   value={userData.dob}
// //                   className="border bg-gray-100 rounded max-w-xs pl-2"
// //                   onChange={(e) =>
// //                     setUserData((prev) => ({
// //                       ...prev,
// //                       dob: e.target.value,
// //                     }))
// //                   }
// //                 />
// //               ) : (
// //                 <p>{new Date(userData.dob).toLocaleDateString()}</p>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Column: Health Information */}
// //         <div>
// //           <p className="text-neutral-500 text-xl font-semibold underline mt-3">
// //             HEALTH INFORMATION
// //           </p>
// //           <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
// //             <p className="font-medium mr-2">Blood Group:</p>
// //             {isEdit ? (
// //               <select
// //                 value={userData.bloodGroup}
// //                 className="border bg-gray-100 rounded max-w-xs pl-2"
// //                 onChange={(e) =>
// //                   setUserData((prev) => ({
// //                     ...prev,
// //                     bloodGroup: e.target.value,
// //                   }))
// //                 }
// //               >
// //                 <option value="A+">A+</option>
// //                 <option value="A-">A-</option>
// //                 <option value="B+">B+</option>
// //                 <option value="B-">B-</option>
// //                 <option value="AB+">AB+</option>
// //                 <option value="AB-">AB-</option>
// //                 <option value="O+">O+</option>
// //                 <option value="O-">O-</option>
// //               </select>
// //             ) : (
// //               <p className="text-gray-900">{userData.bloodGroup}</p>
// //             )}
// //             <p className="font-medium mr-2">Blood Pressure:</p>
// //             {isEdit ? (
// //               <input
// //                 type="text"
// //                 value={userData.bloodPressure}
// //                 className="border bg-gray-100 rounded max-w-xs pl-2"
// //                 onChange={(e) =>
// //                   setUserData((prev) => ({
// //                     ...prev,
// //                     bloodPressure: e.target.value,
// //                   }))
// //                 }
// //               />
// //             ) : (
// //               <p className="text-gray-900">{userData.bloodPressure}</p>
// //             )}
// //             <p className="font-medium mr-2">Allergies:</p>
// //             {isEdit ? (
// //               <div className="flex flex-col gap-2">
// //                 <select
// //                   value={userData.hasAllergies}
// //                   className="border bg-gray-100 rounded max-w-xs"
// //                   onChange={(e) => {
// //                     const value = e.target.value;
// //                     setUserData((prev) => ({
// //                       ...prev,
// //                       hasAllergies: value,
// //                       allergies: value === "No" ? "None" : prev.allergies,
// //                     }));
// //                   }}
// //                 >
// //                   <option value="No">No</option>
// //                   <option value="Yes">Yes</option>
// //                 </select>
// //                 {userData.hasAllergies === "Yes" ? (
// //                   <input
// //                     type="text"
// //                     placeholder="Fill Details..."
// //                     value={userData.allergies}
// //                     className="border bg-gray-100 rounded max-w-xs pl-2"
// //                     onChange={(e) =>
// //                       setUserData((prev) => ({
// //                         ...prev,
// //                         allergies: e.target.value,
// //                       }))
// //                     }
// //                   />
// //                 ) : userData.hasAllergies === "No" ? (
// //                   <p>None</p>
// //                 ) : null}
// //               </div>
// //             ) : (
// //               <p className="text-gray-900">{userData.allergies}</p>
// //             )}
// //             <p className="font-medium mr-2">Medications:</p>
// //             {isEdit ? (
// //               <input
// //                 type="text"
// //                 value={userData.medications}
// //                 className="border bg-gray-100 rounded max-w-xs pl-2"
// //                 onChange={(e) =>
// //                   setUserData((prev) => ({
// //                     ...prev,
// //                     medications: e.target.value,
// //                   }))
// //                 }
// //               />
// //             ) : (
// //               <p className="text-gray-900">{userData.medications}</p>
// //             )}
// //             <p className="font-medium mr-2">Medical History:</p>
// //             {isEdit ? (
// //               <textarea
// //                 rows={5}
// //                 type="text"
// //                 value={userData.medicalHistory}
// //                 className="border bg-gray-100 rounded max-w-xs pl-2"
// //                 onChange={(e) =>
// //                   setUserData((prev) => ({
// //                     ...prev,
// //                     medicalHistory: e.target.value,
// //                   }))
// //                 }
// //               />
// //             ) : (
// //               <p className="text-gray-900">{userData.medicalHistory}</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Action Buttons */}
// //       <div className="mt-6 flex flex-col sm:flex-row justify-between">
// //         {isEdit ? (
// //           <button
// //             onClick={updateUserData}
// //             className="bg-green-500 text-white py-2 px-4 rounded"
// //             disabled={loading}
// //           >
// //             {loading ? "Saving..." : "Save Information"}
// //           </button>
// //         ) : (
// //           <button
// //             onClick={() => setIsEdit(true)} // Cancel and toggle off edit mode
// //             className="bg-blue-500 text-white py-2 px-4 rounded mb-2 sm:mb-0"
// //           >
// //             Edit
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyProfile;

// import React, { useContext, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const toastConfig = {
//   position: "top-right",
//   autoClose: 5000, // 5 seconds
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   theme: "colored",
// };

// const MyProfile = () => {
//   const { userData, setUserData, token, backendurl, loadUserData } =
//     useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false); // Loader state

//   const updateUserData = async () => {
//     setLoading(true); // Start loader
//     try {
//       const formData = new FormData();

//       formData.append("name", userData.name);
//       formData.append("phone", userData.phone);
//       formData.append("address", userData.address);
//       formData.append("dob", userData.dob);
//       formData.append("gender", userData.gender);
//       formData.append("bloodGroup", userData.bloodGroup);
//       formData.append("bloodPressure", userData.bloodPressure);
//       formData.append("allergies", userData.allergies);
//       formData.append("medications", userData.medications);
//       formData.append("medicalHistory", userData.medicalHistory);
//       formData.append("hasAllergies", userData.hasAllergies);
//       image && formData.append("image", image);

//       const { data } = await axios.post(
//         `${backendurl}/api/user/update-user-data`,
//         formData,
//         {
//           headers: { token },
//         }
//       );

//       if (data.success) {
//         toast.success(data.message, toastConfig);
//         await loadUserData();
//         setIsEdit(false);
//         setImage(null);
//       } else {
//         toast.error(data.message, toastConfig);
//       }
//     } catch (error) {
//       toast.error("Failed to connect. Please try again later.", toastConfig);
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto shadow-lg rounded-xl bg-white">
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-8">
//         {/* Profile Picture */}
//         <div className="relative mb-6">
//           {isEdit ? (
//             <label htmlFor="image">
//               <div className="relative cursor-pointer">
//                 <img
//                   className="w-36 h-36 rounded-full object-cover opacity-70"
//                   src={image ? URL.createObjectURL(image) : userData.image}
//                   alt="Profile"
//                 />
//                 <img
//                   className="absolute bottom-0 right-0 w-10 h-10 bg-gray-700 p-2 rounded-full text-white"
//                   src={image ? "" : assets.upload_icon}
//                   alt="Upload"
//                 />
//               </div>
//               <input
//                 onChange={(e) => setImage(e.target.files[0])}
//                 type="file"
//                 id="image"
//                 hidden
//               />
//             </label>
//           ) : (
//             <img
//               className="w-36 h-36 rounded-full object-cover"
//               src={userData.image}
//               alt="Profile"
//             />
//           )}
//         </div>

//         {isEdit ? (
//           <input
//             type="text"
//             value={userData.name}
//             className="text-2xl font-semibold text-center border-b-2 p-2 max-w-md w-full focus:outline-none"
//             onChange={(e) =>
//               setUserData((prev) => ({ ...prev, name: e.target.value }))
//             }
//           />
//         ) : (
//           <h2 className="text-3xl font-semibold">{userData.name}</h2>
//         )}
//       </div>
//       <hr className="bg-zinc-300 h-[1px] border-none mb-6" />

//       {/* Profile Body */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left Column: Basic & Contact Information */}
//         <div>
//           <div className="mb-6">
//             <p className="text-gray-600 font-semibold text-xl">
//               CONTACT INFORMATION
//             </p>
//             <div className="grid grid-cols-[1fr_3fr] gap-2 text-gray-700">
//               <p className="font-medium">Email id:</p>
//               <p className="text-blue-500">{userData.email}</p>

//               <p className="font-medium">Phone:</p>
//               {isEdit ? (
//                 <input
//                   type="text"
//                   value={userData.phone}
//                   className="border bg-gray-100 rounded max-w-xs pl-2"
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       phone: e.target.value,
//                     }))
//                   }
//                 />
//               ) : (
//                 <p className="text-gray-900">{userData.phone}</p>
//               )}

//               <p className="font-medium">Address:</p>
//               {isEdit ? (
//                 <input
//                   type="text"
//                   value={userData.address}
//                   className="border bg-gray-100 rounded max-w-xs pl-2"
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: e.target.value,
//                     }))
//                   }
//                 />
//               ) : (
//                 <p className="text-gray-900">{userData.address}</p>
//               )}
//             </div>
//           </div>

//           <div className="mb-6">
//             <p className="text-gray-600 font-semibold text-xl">
//               BASIC INFORMATION
//             </p>
//             <div className="grid grid-cols-[1fr_3fr] gap-2 text-gray-700 mt-4">
//               <p className="font-medium">Gender:</p>
//               {isEdit ? (
//                 <select
//                   value={userData.gender}
//                   className="border bg-gray-100 rounded max-w-xs pl-2"
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       gender: e.target.value,
//                     }))
//                   }
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               ) : (
//                 <p className="text-gray-900">{userData.gender}</p>
//               )}

//               <p className="font-medium">Date of Birth:</p>
//               {isEdit ? (
//                 <input
//                   type="date"
//                   value={userData.dob}
//                   className="border bg-gray-100 rounded max-w-xs pl-2"
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       dob: e.target.value,
//                     }))
//                   }
//                 />
//               ) : (
//                 <p>{new Date(userData.dob).toLocaleDateString()}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Health Information */}
//         <div>
//           <p className="text-gray-600 font-semibold text-xl">
//             HEALTH INFORMATION
//           </p>
//           <div className="grid grid-cols-[1fr_3fr] gap-2 text-gray-700 mt-4">
//             <p className="font-medium">Blood Group:</p>
//             {isEdit ? (
//               <select
//                 value={userData.bloodGroup}
//                 className="border bg-gray-100 rounded max-w-xs pl-2"
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     bloodGroup: e.target.value,
//                   }))
//                 }
//               >
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//               </select>
//             ) : (
//               <p className="text-gray-900">{userData.bloodGroup}</p>
//             )}

//             <p className="font-medium">Blood Pressure:</p>
//             {isEdit ? (
//               <input
//                 type="text"
//                 value={userData.bloodPressure}
//                 className="border bg-gray-100 rounded max-w-xs pl-2"
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     bloodPressure: e.target.value,
//                   }))
//                 }
//               />
//             ) : (
//               <p className="text-gray-900">{userData.bloodPressure}</p>
//             )}

//             <p className="font-medium">Allergies:</p>
//             {isEdit ? (
//               <div className="flex flex-col gap-2">
//                 <select
//                   value={userData.hasAllergies}
//                   className="border bg-gray-100 rounded max-w-xs"
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setUserData((prev) => ({
//                       ...prev,
//                       hasAllergies: value,
//                       allergies: value === "No" ? "None" : prev.allergies,
//                     }));
//                   }}
//                 >
//                   <option value="No">No</option>
//                   <option value="Yes">Yes</option>
//                 </select>
//                 {userData.hasAllergies === "Yes" ? (
//                   <input
//                     type="text"
//                     placeholder="Fill Details..."
//                     value={userData.allergies}
//                     className="border bg-gray-100 rounded max-w-xs pl-2"
//                     onChange={(e) =>
//                       setUserData((prev) => ({
//                         ...prev,
//                         allergies: e.target.value,
//                       }))
//                     }
//                   />
//                 ) : userData.hasAllergies === "No" ? (
//                   <p>None</p>
//                 ) : null}
//               </div>
//             ) : (
//               <p className="text-gray-900">{userData.allergies}</p>
//             )}

//             <p className="font-medium">Medications:</p>
//             {isEdit ? (
//               <input
//                 type="text"
//                 value={userData.medications}
//                 className="border bg-gray-100 rounded max-w-xs pl-2"
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     medications: e.target.value,
//                   }))
//                 }
//               />
//             ) : (
//               <p className="text-gray-900">{userData.medications}</p>
//             )}

//             <p className="font-medium">Medical History:</p>
//             {isEdit ? (
//               <textarea
//                 rows={5}
//                 value={userData.medicalHistory}
//                 className="border bg-gray-100 rounded max-w-xs pl-2"
//                 onChange={(e) =>
//                   setUserData((prev) => ({
//                     ...prev,
//                     medicalHistory: e.target.value,
//                   }))
//                 }
//               />
//             ) : (
//               <p className="text-gray-900">{userData.medicalHistory}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Save & Cancel Buttons */}
//       <div className="flex justify-end gap-4 mt-6">
//         {isEdit ? (
//           <div className="flex gap-6">
//             <button
//               onClick={() => setIsEdit(false)}
//               className="text-gray-500 hover:text-gray-700 font-semibold px-4 py-2 rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={updateUserData}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => setIsEdit(true)}
//             className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

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
