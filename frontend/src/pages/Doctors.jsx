// // // // import React, { useContext, useEffect, useState } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import { AppContext } from "../context/AppContext";

// // // // const Doctors = () => {
// // // //   const { speciality } = useParams();
// // // //   const [filterDoc, setFilterDoc] = useState([]);
// // // //   const [showFilter, setShowFilter] = useState(false);
// // // //   const [search, setSearch] = useState("");

// // // //   const navigate = useNavigate();

// // // //   const { doctors } = useContext(AppContext);

// // // //   const applyFilter = () => {
// // // //     if (speciality) {
// // // //       setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
// // // //     } else {
// // // //       setFilterDoc(doctors);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     applyFilter();
// // // //   }, [doctors, speciality]);

// // // //   return (
// // // //     <>
// // // //       <div className="flex flex-col items-center justify-center h-40 mb-5 bg-yellow-50">
// // // //         {/* Title */}
// // // //         <h1 className="text-3xl font-bold mb-8">Find a Doctor</h1>

// // // //         {/* Search Input */}
// // // //         <div className="flex w-full max-w-2xl">
// // // //           <input
// // // //             value={search}
// // // //             onChange={(e) => {
// // // //               setSearch(e.target.value);
// // // //             }}
// // // //             type="text"
// // // //             placeholder="Search by doctor name or specialization"
// // // //             className="flex-grow p-4 text-gray-700 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //           />
// // // //           <button className="px-8 py-4 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 transition">
// // // //             Search
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //       <div>
// // // //         <p className="text-gray-600">Browse through the doctors specialist.</p>
// // // //         <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
// // // //           <button
// // // //             className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
// // // //               showFilter ? "bg-primary text-white" : ""
// // // //             }`}
// // // //             onClick={() => setShowFilter((prev) => !prev)}
// // // //           >
// // // //             Filters
// // // //           </button>
// // // //           <div
// // // //             className={`flex-col gap-4 text-sm text-gray-600 ${
// // // //               showFilter ? "flex" : "hidden sm:flex"
// // // //             }`}
// // // //           >
// // // //             <p
// // // //               onClick={() =>
// // // //                 speciality === "General physician"
// // // //                   ? navigate("/doctors")
// // // //                   : navigate("/doctors/General physician")
// // // //               }
// // // //               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
// // // //                 speciality === "General physician"
// // // //                   ? "bg-green-100 text-black"
// // // //                   : ""
// // // //               }`}
// // // //             >
// // // //               General physician
// // // //             </p>
// // // //             <p
// // // //               onClick={() =>
// // // //                 speciality === "Gynecologist"
// // // //                   ? navigate("/doctors")
// // // //                   : navigate("/doctors/Gynecologist")
// // // //               }
// // // //               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
// // // //                 speciality === "Gynecologist" ? "bg-green-100 text-black" : ""
// // // //               }`}
// // // //             >
// // // //               Gynecologist
// // // //             </p>
// // // //             <p
// // // //               onClick={() =>
// // // //                 speciality === "Dermatologist"
// // // //                   ? navigate("/doctors")
// // // //                   : navigate("/doctors/Dermatologist")
// // // //               }
// // // //               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
// // // //                 speciality === "Dermatologist" ? "bg-green-100 text-black" : ""
// // // //               }`}
// // // //             >
// // // //               Dermatologist
// // // //             </p>
// // // //             <p
// // // //               onClick={() =>
// // // //                 speciality === "Pediatricians"
// // // //                   ? navigate("/doctors")
// // // //                   : navigate("/doctors/Pediatricians")
// // // //               }
// // // //               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
// // // //                 speciality === "Pediatricians" ? "bg-green-100 text-black" : ""
// // // //               }`}
// // // //             >
// // // //               Pediatricians
// // // //             </p>
// // // //             <p
// // // //               onClick={() =>
// // // //                 speciality === "Neurologist"
// // // //                   ? navigate("/doctors")
// // // //                   : navigate("/doctors/Neurologist")
// // // //               }
// // // //               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
// // // //                 speciality === "Neurologist" ? "bg-green-100 text-black" : ""
// // // //               }`}
// // // //             >
// // // //               Neurologist
// // // //             </p>
// // // //             <p
// // // //               onClick={() =>
// // // //                 speciality === "Gastroenterologist"
// // // //                   ? navigate("/doctors")
// // // //                   : navigate("/doctors/Gastroenterologist")
// // // //               }
// // // //               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-full transition-all cursor-pointer ${
// // // //                 speciality === "Gastroenterologist"
// // // //                   ? "bg-green-100 text-black"
// // // //                   : ""
// // // //               }`}
// // // //             >
// // // //               Gastroenterologist
// // // //             </p>
// // // //           </div>
// // // //           <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
// // // //             {filterDoc.map((item, index) => (
// // // //               <div
// // // //                 onClick={() => navigate(`/appointment/${item._id}`)}
// // // //                 className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
// // // //                 key={index}
// // // //               >
// // // //                 <img className="bg-green-100" src={item.image} alt="" />
// // // //                 <div className="p-4">
// // // //                   <div className="flex items-center gap-2 text-sm text-center text-green-500">
// // // //                     <p className="w-2 h-2 bg-green-500 rounded-full"></p>
// // // //                     <p>Available</p>
// // // //                   </div>
// // // //                   <p className="text-gray-900 text-lg font-medium">
// // // //                     {item.name}
// // // //                   </p>
// // // //                   <p className="text-gray-600 text-sm">{item.speciality}</p>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Doctors;
// // // import React, { useContext, useEffect, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { AppContext } from "../context/AppContext";

// // // const Doctors = () => {
// // //   const { speciality } = useParams();
// // //   const [filterDoc, setFilterDoc] = useState([]);
// // //   const [showFilter, setShowFilter] = useState(false);
// // //   const [search, setSearch] = useState("");

// // //   const navigate = useNavigate();
// // //   const { doctors } = useContext(AppContext);

// // //   const applyFilter = () => {
// // //     let filtered = speciality
// // //       ? doctors.filter((doc) => doc.speciality === speciality)
// // //       : doctors;

// // //     if (search.trim()) {
// // //       filtered = filtered.filter(
// // //         (doc) =>
// // //           doc.name.toLowerCase().includes(search.toLowerCase()) ||
// // //           doc.speciality.toLowerCase().includes(search.toLowerCase())
// // //       );
// // //     }

// // //     setFilterDoc(filtered);
// // //   };

// // //   useEffect(() => {
// // //     applyFilter();
// // //   }, [doctors, speciality, search]);

// // //   return (
// // //     <div className="p-5">
// // //       {/* Header Section */}
// // //       <div className="flex flex-col items-center justify-center h-40 mb-8 bg-yellow-50">
// // //         <h1 className="text-3xl font-bold mb-5 text-center">Find a Doctor</h1>
// // //         <div className="flex flex-col sm:flex-row w-full max-w-2xl gap-2">
// // //           <input
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //             type="text"
// // //             placeholder="Search by doctor name or specialization"
// // //             className="flex-grow p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
// // //           />
// // //           <button
// // //             onClick={applyFilter}
// // //             className="px-6 py-4 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition"
// // //           >
// // //             Search
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Filter Section */}
// // //       <div className="mb-8">
// // //         <p className="text-gray-600 mb-4 text-center sm:text-left">
// // //           Browse by specializations:
// // //         </p>
// // //         <button
// // //           className={`py-1 px-3  w-full border rounded text-sm transition-all sm:hidden ${
// // //             showFilter ? "bg-primary text-white" : ""
// // //           }`}
// // //           onClick={() => setShowFilter((prev) => !prev)}
// // //         >
// // //           Filters
// // //         </button>
// // //         <div
// // //           className={`flex flex-wrap justify-center sm:justify-start gap-3 mt-5 ${
// // //             showFilter ? "flex" : "hidden sm:flex"
// // //           }`}
// // //         >
// // //           {[
// // //             "General Physician",
// // //             // "Gynecologist",
// // //             "Gynocologist",
// // //             "Dermatologist",
// // //             "Pediatricians",
// // //             "Neurologist",
// // //             // "Gastroenterologist",
// // //             "Gastroentologist",
// // //           ].map((spec) => (
// // //             <button
// // //               key={spec}
// // //               onClick={() =>
// // //                 speciality === spec
// // //                   ? navigate("/doctors")
// // //                   : navigate(`/doctors/${spec}`)
// // //               }
// // //               className={`px-4 py-2 rounded-full border transition ${
// // //                 speciality === spec
// // //                   ? "bg-green-100 border-green-400 text-black"
// // //                   : "bg-white border-gray-300 hover:bg-gray-100"
// // //               }`}
// // //             >
// // //               {spec}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Doctors Grid */}
// // //       <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
// // //         {filterDoc.length > 0 ? (
// // //           filterDoc.map((item, index) => (
// // //             <div
// // //               key={index}
// // //               onClick={() => navigate(`/appointment/${item._id}`)}
// // //               className="border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
// // //             >
// // //               <img className=" bg-green-100" src={item.image} alt={item.name} />
// // //               <div className="p-4">
// // //                 <div className="flex items-center gap-2 text-sm text-green-500">
// // //                   <span className="w-2 h-2 bg-green-500 rounded-full"></span>
// // //                   <p>Available</p>
// // //                 </div>
// // //                 <p className="text-lg font-medium text-gray-900">{item.name}</p>
// // //                 <p className="text-sm text-gray-600">{item.speciality}</p>
// // //               </div>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <p className="text-gray-600 text-center col-span-full">
// // //             No doctors found matching your criteria.
// // //           </p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Doctors;

// // import React, { useContext, useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { AppContext } from "../context/AppContext";

// // const Doctors = () => {
// //   const { speciality } = useParams();
// //   const [filterDoc, setFilterDoc] = useState([]);
// //   const [showFilter, setShowFilter] = useState(false);
// //   const [search, setSearch] = useState("");

// //   const navigate = useNavigate();
// //   const { doctors } = useContext(AppContext);

// //   const applyFilter = () => {
// //     let filtered = speciality
// //       ? doctors.filter((doc) => doc.speciality === speciality)
// //       : doctors;

// //     if (search.trim()) {
// //       filtered = filtered.filter(
// //         (doc) =>
// //           doc.name.toLowerCase().includes(search.toLowerCase()) ||
// //           doc.speciality.toLowerCase().includes(search.toLowerCase())
// //       );
// //     }

// //     setFilterDoc(filtered);
// //   };

// //   useEffect(() => {
// //     applyFilter();
// //   }, [doctors, speciality, search]);

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-12">
// //       {/* Header Section */}
// //       <div className="container mx-auto px-4 md:px-8 mb-10">
// //         <h1 className="text-4xl font-extrabold text-center text-teal-700 mb-6">
// //           Find a Doctor
// //         </h1>
// //         <div className="flex justify-center gap-4 sm:gap-6">
// //           <input
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             type="text"
// //             placeholder="Search by doctor name or specialization"
// //             className="w-full sm:w-96 p-4 text-gray-700 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //           />
// //           <button
// //             onClick={applyFilter}
// //             className="px-6 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {/* Filter Section */}
// //       <div className="container mx-auto px-4 md:px-8 mb-8">
// //         <p className="text-gray-600 text-center sm:text-left text-lg font-medium mb-6">
// //           Browse by Specializations:
// //         </p>
// //         <button
// //           className={`w-full sm:w-auto py-3 px-4 text-sm border rounded-full bg-teal-100 hover:bg-teal-200 transition-all sm:hidden ${
// //             showFilter ? "text-teal-700" : "text-gray-700"
// //           }`}
// //           onClick={() => setShowFilter((prev) => !prev)}
// //         >
// //           {showFilter ? "Hide Filters" : "Show Filters"}
// //         </button>
// //         <div
// //           className={`flex flex-wrap justify-center sm:justify-start gap-3 mt-5 ${
// //             showFilter ? "block" : "hidden sm:block"
// //           }`}
// //         >
// //           {[
// //             "General Physician",
// //             "Gynecologist",
// //             "Dermatologist",
// //             "Pediatricians",
// //             "Neurologist",
// //             "Gastroenterologist",
// //           ].map((spec) => (
// //             <button
// //               key={spec}
// //               onClick={() =>
// //                 speciality === spec
// //                   ? navigate("/doctors")
// //                   : navigate(`/doctors/${spec}`)
// //               }
// //               className={`px-6 py-2 rounded-full border transition-all text-sm font-medium ${
// //                 speciality === spec
// //                   ? "bg-teal-500 text-white border-teal-600"
// //                   : "bg-white text-teal-600 border-teal-200 hover:bg-teal-50"
// //               }`}
// //             >
// //               {spec}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Doctors Grid */}
// //       <div className="container mx-auto px-4 md:px-8">
// //         {filterDoc.length > 0 ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
// //             {filterDoc.map((item, index) => (
// //               <div
// //                 key={index}
// //                 onClick={() => navigate(`/appointment/${item._id}`)}
// //                 className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all cursor-pointer"
// //               >
// //                 <img
// //                   className="w-full object-cover object-center bg-green-100"
// //                   src={item.image}
// //                   alt={item.name}
// //                 />
// //                 <div className="p-5">
// //                   <div className="flex items-center gap-2 text-sm text-green-500 mb-3">
// //                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
// //                     <p>Available</p>
// //                   </div>
// //                   <p className="text-xl font-semibold text-gray-900">
// //                     {item.name}
// //                   </p>
// //                   <p className="text-sm text-gray-600">{item.speciality}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-600 text-center col-span-full">
// //             No doctors found matching your criteria.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Doctors;

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { FiSearch, FiStar, FiZap, FiClock, FiDollarSign } from "react-icons/fi";
// import { motion } from "framer-motion";

// const Doctors = () => {
//   const { speciality } = useParams();
//   const [filterDoc, setFilterDoc] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();
//   const { doctors, currencySymbol } = useContext(AppContext);

//   const specialities = [
//     "General Physician",
//     "Gynecologist",
//     "Dermatologist",
//     "Pediatricians",
//     "Neurologist",
//     "Gastroenterologist",
//   ];

//   const applyFilter = () => {
//     let filtered = speciality
//       ? doctors.filter((doc) => doc.speciality === speciality)
//       : doctors;

//     if (search.trim()) {
//       filtered = filtered.filter(
//         (doc) =>
//           doc.name.toLowerCase().includes(search.toLowerCase()) ||
//           doc.speciality.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     setFilterDoc(filtered);
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [doctors, speciality, search]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       {/* Header Section */}
//       <div className="container mx-auto px-4 md:px-8 mb-10">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl font-bold text-center text-gray-900 mb-8"
//         >
//           Find Your Specialist
//         </motion.h1>

//         {/* Search Bar */}
//         <div className="max-w-3xl mx-auto relative mb-12">
//           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//             <FiSearch className="h-6 w-6 text-gray-400" />
//           </div>
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             type="text"
//             placeholder="Search doctors by name or specialization..."
//             className="w-full pl-12 pr-32 py-4 text-lg rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//           />
//           <button
//             onClick={applyFilter}
//             className="absolute right-2 top-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2"
//           >
//             Search
//           </button>
//         </div>

//         {/* Filter Section */}
//         <div className="mb-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Specializations
//             </h2>
//             <button
//               className="sm:hidden text-teal-600 hover:text-teal-700 flex items-center gap-2"
//               onClick={() => setShowFilter(!showFilter)}
//             >
//               {showFilter ? "Hide Filters" : "Show Filters"}
//             </button>
//           </div>

//           <div
//             className={`grid grid-cols-2 sm:flex gap-3 transition-all duration-300 ${
//               showFilter ? "max-h-96" : "max-h-0 sm:max-h-none"
//             } overflow-hidden sm:overflow-visible`}
//           >
//             {specialities.map((spec) => (
//               <motion.button
//                 key={spec}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() =>
//                   speciality === spec
//                     ? navigate("/doctors")
//                     : navigate(`/doctors/${spec}`)
//                 }
//                 className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
//                   speciality === spec
//                     ? "bg-teal-600 text-white shadow-md"
//                     : "bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:bg-teal-50"
//                 }`}
//               >
//                 {spec}
//               </motion.button>
//             ))}
//           </div>
//         </div>

//         {/* Doctors Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filterDoc.length > 0 ? (
//             filterDoc.map((doctor, index) => (
//               <motion.div
//                 key={doctor._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 onClick={() => navigate(`/appointment/${doctor._id}`)}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden"
//               >
//                 <div className="relative h-48 bg-gray-100 overflow-hidden">
//                   <img
//                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
//                     src={doctor.image}
//                     alt={doctor.name}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40" />
//                 </div>

//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-bold text-gray-900">
//                       {doctor.name}
//                     </h3>
//                     <p className="text-sm text-gray-600">{doctor.speciality}</p>
//                     <div className="flex items-center gap-1 text-amber-500">
//                       <FiStar className="w-5 h-5" />
//                       <span className="font-medium">4.8</span>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-3 mb-4">
//                     <div className="flex items-center gap-2 text-sm bg-teal-50 px-3 py-1.5 rounded-full">
//                       <FiZap className="w-4 h-4 text-teal-600" />
//                       <span className="text-teal-700 font-medium">
//                         {doctor.experience || "5"} Years Experience
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm bg-purple-50 px-3 py-1.5 rounded-full">
//                       <FiClock className="w-4 h-4 text-purple-600" />
//                       <span className="text-purple-700 font-medium">
//                         Available Today
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between mt-4">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <FiDollarSign className="w-5 h-5" />

//                       <span className="font-medium">
//                         {currencySymbol} {doctor.fees || "120"} Consultation
//                       </span>
//                     </div>
//                     <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-20">
//               <div className="max-w-md mx-auto">
//                 <div className="text-6xl mb-4 text-gray-300">😕</div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   No Doctors Found
//                 </h3>
//                 <p className="text-gray-600">
//                   Try adjusting your search filters or browse other
//                   specializations.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FiSearch, FiStar, FiZap, FiClock, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";

const Doctors = () => {
  const { speciality, docId } = useParams();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors = [], currencySymbol = "$" } = useContext(AppContext);

  // Memoized specialities list from doctors data
  const specialities = useMemo(() => {
    const uniqueSpecialities = new Set(doctors.map((doc) => doc.speciality));
    return Array.from(uniqueSpecialities).sort();
  }, [doctors]);

  // Memoized filtered doctors
  const filteredDoctors = useMemo(() => {
    if (!Array.isArray(doctors)) return [];

    return doctors.filter((doctor) => {
      const matchesSpeciality = !speciality || doctor.speciality === speciality;
      const matchesSearch =
        !search.trim() ||
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(search.toLowerCase());

      return matchesSpeciality && matchesSearch;
    });
  }, [doctors, speciality, search]);

  // Doctor card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8 mb-10">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Specialist
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with experienced healthcare professionals from the comfort
            of your home
          </p>
        </motion.header>

        {/* Search and Filters Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-8">
            <FiSearch className="absolute top-4 left-4 text-gray-400 text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctors by name or specialty..."
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Specialization Filters */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Specializations
              </h2>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="sm:hidden text-teal-600 hover:text-teal-700"
              >
                {showFilter ? "Hide" : "Show"} Filters
              </button>
            </div>

            <div
              className={`grid grid-cols-2 sm:flex gap-2 ${
                showFilter ? "block" : "hidden sm:flex"
              }`}
            >
              {specialities.map((spec) => (
                <motion.button
                  key={spec}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full text-sm ${
                    speciality === spec
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-600 border hover:border-teal-300"
                  }`}
                  onClick={() =>
                    navigate(
                      speciality === spec ? "/doctors" : `/doctors/${spec}`
                    )
                  }
                >
                  {spec}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
        >
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <motion.article
                key={doctor._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigate(`/appointment/${doctor._id}`)}
              >
                {/* Doctor Image */}
                <div className="relative  bg-gray-100">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name}, ${doctor.speciality}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30" />
                </div>

                {/* Doctor Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {doctor.name}
                    </h3>
                    <p className="text-teal-600 font-medium">
                      {doctor.speciality}
                    </p>
                  </div>

                  {/* Doctor Metadata */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <FiStar className="text-amber-500" />
                      <span className="font-medium">4.9 Rating</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiZap className="text-teal-600" />
                      <span>{doctor.experience || "5"} Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiClock className="text-purple-600" />
                      <div className="flex items-center gap-2 text-sm">
                        {doctor.available ? (
                          <span className="text-green-600 font-medium">
                            ✅ Available
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            ❌ Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {currencySymbol}
                        {doctor.fees || "120"}
                      </span>
                    </div>
                    <button
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/appointment/${doctor._id}`);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-20 space-y-4">
              <div className="text-6xl">👩⚕️</div>
              <h3 className="text-xl font-semibold text-gray-800">
                No Doctors Found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Doctors;
