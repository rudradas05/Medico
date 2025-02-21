// // // import React, { useContext, useState } from "react";
// // // import { assets } from "../assets/assets";
// // // import { NavLink, useNavigate } from "react-router-dom";
// // // import { CiMenuBurger } from "react-icons/ci";
// // // import { IoCloseCircleOutline } from "react-icons/io5";
// // // import { AppContext } from "../context/AppContext";

// // // const Navbar = () => {
// // //   const navigate = useNavigate();
// // //   const [showMenu, setShowMenu] = useState(false);

// // //   const { token, setToken, userData, backendurl, setIsLoggedin } =
// // //     useContext(AppContext);

// // //   const logout = () => {
// // //     setToken("");
// // //     localStorage.removeItem("token");
// // //     navigate("/");
// // //     setIsLoggedin(false);
// // //   };
// // //   return (
// // //     <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 sticky top-0 bg-white z-50">
// // //       <img
// // //         onClick={() => navigate("/")}
// // //         className="w-44 cursor-pointer"
// // //         src={assets.logo}
// // //         alt="logo"
// // //       />
// // //       <ul className="hidden md:flex items-start gap-5 font-medium">
// // //         <NavLink to="/">
// // //           <li className="py-1 scroll-smooth">Home</li>
// // //           <hr className="border-none outline-node h-0.5 bg-primary w-5/6 m-auto hidden" />
// // //         </NavLink>
// // //         <NavLink to="/doctors">
// // //           <li className="py-1 scroll-smooth">Find a Doctor</li>
// // //           <hr className="border-none outline-node h-0.5 bg-primary w-5/6 m-auto hidden" />
// // //         </NavLink>
// // //         <NavLink to="/about">
// // //           <li className="py-1">About</li>
// // //           <hr className="border-none outline-node h-0.5 bg-primary w-5/6 m-auto hidden" />
// // //         </NavLink>
// // //         <NavLink to="/services">
// // //           <li className="py-1">Services</li>
// // //           <hr className="border-none outline-node h-0.5 bg-primary w-5/6 m-auto hidden" />
// // //         </NavLink>
// // //         <NavLink to="/contact">
// // //           <li className="py-1">Contact</li>
// // //           <hr className="border-none outline-node h-0.5 bg-primary w-5/6 m-auto hidden" />
// // //         </NavLink>
// // //       </ul>
// // //       <div className="flex items-center gap-4">
// // //         {token && userData ? (
// // //           <div className="flex items-center gap-2 cursor-pointer group relative">
// // //             <img
// // //               className="w-8 rounded-full bg-gray-200"
// // //               src={userData.image}
// // //               alt=""
// // //             />
// // //             <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block  ">
// // //               <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
// // //                 <p
// // //                   onClick={() => navigate("/my-profile")}
// // //                   className="hover:text-black cursor-pointer"
// // //                 >
// // //                   My Profile
// // //                 </p>
// // //                 <p
// // //                   onClick={() => navigate("/my-appointments")}
// // //                   className="hover:text-black cursor-pointer"
// // //                 >
// // //                   My Appointments
// // //                 </p>
// // //                 <p
// // //                   onClick={() => logout()}
// // //                   className="hover:text-black cursor-pointer"
// // //                 >
// // //                   Logout
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <button
// // //             onClick={() => navigate("/login")}
// // //             className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block ransition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
// // //           >
// // //             Create Account
// // //           </button>
// // //         )}
// // //         {/* <img className="w-6 md:hidden" src={assets.menu_icon} alt="" /> */}
// // //         <CiMenuBurger
// // //           onClick={() => setShowMenu(true)}
// // //           className="w-6 md:hidden cursor-pointer"
// // //         />
// // //         <div
// // //           className={` ${
// // //             showMenu ? "fixed w-full" : "h-0 w-0"
// // //           } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
// // //         >
// // //           <div className="flex items-center justify-between px-5 py-6">
// // //             <img className="w-38" src={assets.logo} alt="" />
// // //             <IoCloseCircleOutline
// // //               onClick={() => setShowMenu(false)}
// // //               className="text-4xl cursor-pointer"
// // //             />
// // //           </div>
// // //           <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
// // //             <NavLink onClick={() => setShowMenu(false)} to="/">
// // //               <p className="px-4 py-2 rounded inline-block">Home</p>
// // //             </NavLink>
// // //             <NavLink onClick={() => setShowMenu(false)} to="/doctors">
// // //               <p className="px-4 py-2 rounded inline-block">Find a Doctor</p>
// // //             </NavLink>
// // //             <NavLink onClick={() => setShowMenu(false)} to="/about">
// // //               <p className="px-4 py-2 rounded inline-block">About</p>
// // //             </NavLink>
// // //             <NavLink onClick={() => setShowMenu(false)} to="/services">
// // //               <p className="px-4 py-2 rounded inline-block">Services</p>
// // //             </NavLink>
// // //             <NavLink onClick={() => setShowMenu(false)} to="/contact">
// // //               <p className="px-4 py-2 rounded inline-block">CONTACT</p>
// // //             </NavLink>
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Navbar;

// // // import React, { useContext, useState } from "react";
// // // import { assets } from "../assets/assets";
// // // import { NavLink, useNavigate } from "react-router-dom";
// // // import { CiMenuBurger } from "react-icons/ci";
// // // import { IoCloseCircleOutline } from "react-icons/io5";
// // // import { AppContext } from "../context/AppContext";

// // // const Navbar = () => {
// // //   const navigate = useNavigate();
// // //   const [showMenu, setShowMenu] = useState(false);

// // //   const { token, setToken, userData, setIsLoggedin } = useContext(AppContext);

// // //   const logout = () => {
// // //     setToken("");
// // //     localStorage.removeItem("token");
// // //     navigate("/");
// // //     setIsLoggedin(false);
// // //   };

// // //   return (
// // //     <div className="sticky top-0 bg-white z-50 shadow-sm">
// // //       <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
// // //         {/* Logo */}
// // //         <img
// // //           onClick={() => navigate("/")}
// // //           className="w-36 cursor-pointer"
// // //           src={assets.logo}
// // //           alt="logo"
// // //         />

// // //         {/* Desktop Menu */}
// // //         <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
// // //           <NavLink to="/" className="hover:text-blue-600 transition">
// // //             Home
// // //           </NavLink>
// // //           <NavLink to="/doctors" className="hover:text-blue-600 transition">
// // //             Find a Doctor
// // //           </NavLink>
// // //           <NavLink to="/about" className="hover:text-blue-600 transition">
// // //             About
// // //           </NavLink>
// // //           <NavLink to="/services" className="hover:text-blue-600 transition">
// // //             Services
// // //           </NavLink>
// // //           <NavLink to="/contact" className="hover:text-blue-600 transition">
// // //             Contact
// // //           </NavLink>
// // //         </ul>

// // //         {/* User Section */}
// // //         <div className="flex items-center gap-4">
// // //           {token && userData ? (
// // //             <div className="relative group">
// // //               <img
// // //                 className="w-10 h-10 rounded-full cursor-pointer"
// // //                 src={userData.image}
// // //                 alt="User"
// // //               />
// // //               <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 w-40 hidden group-hover:block">
// // //                 <p
// // //                   onClick={() => navigate("/my-profile")}
// // //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
// // //                 >
// // //                   My Profile
// // //                 </p>
// // //                 <p
// // //                   onClick={() => navigate("/my-appointments")}
// // //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
// // //                 >
// // //                   My Appointments
// // //                 </p>
// // //                 <p
// // //                   onClick={logout}
// // //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
// // //                 >
// // //                   Logout
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           ) : (
// // //             <button
// // //               onClick={() => navigate("/login")}
// // //               className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
// // //             >
// // //               Create Account
// // //             </button>
// // //           )}

// // //           {/* Mobile Menu Icon */}
// // //           <CiMenuBurger
// // //             onClick={() => setShowMenu(true)}
// // //             className="text-2xl cursor-pointer md:hidden"
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Mobile Menu */}
// // //       <div
// // //         className={`fixed inset-0 bg-white z-40 transform ${
// // //           showMenu ? "translate-x-0" : "translate-x-full"
// // //         } transition-transform`}
// // //       >
// // //         <div className="flex items-center justify-between px-6 py-4 border-b">
// // //           <img className="w-32" src={assets.logo} alt="Logo" />
// // //           <IoCloseCircleOutline
// // //             onClick={() => setShowMenu(false)}
// // //             className="text-3xl cursor-pointer"
// // //           />
// // //         </div>
// // //         <ul className="flex flex-col items-center gap-6 mt-8 text-lg font-medium">
// // //           <NavLink
// // //             to="/"
// // //             onClick={() => setShowMenu(false)}
// // //             className="hover:text-blue-600 transition"
// // //           >
// // //             Home
// // //           </NavLink>
// // //           <NavLink
// // //             to="/doctors"
// // //             onClick={() => setShowMenu(false)}
// // //             className="hover:text-blue-600 transition"
// // //           >
// // //             Find a Doctor
// // //           </NavLink>
// // //           <NavLink
// // //             to="/about"
// // //             onClick={() => setShowMenu(false)}
// // //             className="hover:text-blue-600 transition"
// // //           >
// // //             About
// // //           </NavLink>
// // //           <NavLink
// // //             to="/services"
// // //             onClick={() => setShowMenu(false)}
// // //             className="hover:text-blue-600 transition"
// // //           >
// // //             Services
// // //           </NavLink>
// // //           <NavLink
// // //             to="/contact"
// // //             onClick={() => setShowMenu(false)}
// // //             className="hover:text-blue-600 transition"
// // //           >
// // //             Contact
// // //           </NavLink>
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Navbar;

// // import React, { useContext, useState } from "react";
// // import { assets } from "../assets/assets";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import { CiMenuBurger } from "react-icons/ci";
// // import { IoCloseCircleOutline } from "react-icons/io5";
// // import { AppContext } from "../context/AppContext";

// // const Navbar = () => {
// //   const navigate = useNavigate();
// //   const [showMenu, setShowMenu] = useState(false);

// //   const { token, setToken, userData, setIsLoggedin } = useContext(AppContext);

// //   const logout = () => {
// //     setToken("");
// //     localStorage.removeItem("token");
// //     navigate("/");
// //     setIsLoggedin(false);
// //   };

// //   return (
// //     <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-teal-500 z-50 ">
// //       <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
// //         {/* Logo */}
// //         <img
// //           onClick={() => navigate("/")}
// //           className="w-36 cursor-pointer"
// //           src=""
// //           alt="logo"
// //         />

// //         {/* Desktop Menu */}
// //         <ul className="hidden md:flex items-center gap-10 text-white font-medium text-lg">
// //           <NavLink
// //             to="/"
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             Home
// //           </NavLink>
// //           <NavLink
// //             to="/doctors"
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             Find a Doctor
// //           </NavLink>
// //           <NavLink
// //             to="/about"
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             About
// //           </NavLink>
// //           <NavLink
// //             to="/services"
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             Services
// //           </NavLink>
// //           <NavLink
// //             to="/contact"
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             Contact
// //           </NavLink>
// //         </ul>

// //         {/* User Section */}
// //         <div className="flex items-center gap-6">
// //           {token && userData ? (
// //             <div className="relative group">
// //               <img
// //                 className="w-12 h-12 rounded-full cursor-pointer ring-2 ring-white"
// //                 src={userData.image}
// //                 alt="User"
// //               />
// //               <div className="absolute top-13 right-0 bg-white shadow-lg rounded-lg py-2 w-48 hidden group-hover:block cursor-wait ">
// //                 <p
// //                   onClick={() => navigate("/my-profile")}
// //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
// //                 >
// //                   My Profile
// //                 </p>
// //                 <p
// //                   onClick={() => navigate("/my-appointments")}
// //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
// //                 >
// //                   My Appointments
// //                 </p>
// //                 <p
// //                   onClick={logout}
// //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
// //                 >
// //                   Logout
// //                 </p>
// //               </div>
// //             </div>
// //           ) : (
// //             <button
// //               onClick={() => navigate("/login")}
// //               className="bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition-none"
// //             >
// //               Create Account
// //             </button>
// //           )}

// //           {/* Mobile Menu Icon */}
// //           <CiMenuBurger
// //             onClick={() => setShowMenu(true)}
// //             className="text-3xl cursor-pointer md:hidden text-white"
// //           />
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       <div
// //         className={`fixed inset-0 bg-teal-700 z-40 transform ${
// //           showMenu ? "translate-x-0" : "translate-x-full"
// //         } transition-transform ease-in-out`}
// //       >
// //         <div className="flex items-center justify-between px-6 py-4 border-b border-teal-500">
// //           <img className="w-32" src={assets.logo} alt="Logo" />
// //           <IoCloseCircleOutline
// //             onClick={() => setShowMenu(false)}
// //             className="text-3xl text-white cursor-pointer"
// //           />
// //         </div>
// //         <ul className="flex flex-col items-center gap-6 mt-8 text-lg font-medium text-white">
// //           <NavLink
// //             to="/"
// //             onClick={() => setShowMenu(false)}
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             Home
// //           </NavLink>
// //           <NavLink
// //             to="/doctors"
// //             onClick={() => setShowMenu(false)}
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             Find a Doctor
// //           </NavLink>
// //           <NavLink
// //             to="/about"
// //             onClick={() => setShowMenu(false)}
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             About
// //           </NavLink>
// //           <NavLink
// //             to="/services"
// //             onClick={() => setShowMenu(false)}
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             Services
// //           </NavLink>
// //           <NavLink
// //             to="/contact"
// //             onClick={() => setShowMenu(false)}
// //             className={({ isActive }) =>
// //               `hover:text-teal-200 transition-none ${
// //                 isActive ? "text-red-200" : ""
// //               }`
// //             }
// //           >
// //             Contact
// //           </NavLink>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;

// import React, { useContext, useEffect, useRef, useState } from "react";
// import { assets } from "../assets/assets";
// import { NavLink, useNavigate } from "react-router-dom";
// import { CiMenuBurger } from "react-icons/ci";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { AppContext } from "../context/AppContext";
// import { RiLoginCircleFill } from "react-icons/ri";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const { token, setToken, userData, setIsLoggedin, logoutUser } =
//     useContext(AppContext);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     if (showDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showDropdown]); // Only run when dropdown state changes

//   // const logout = () => {
//   //   setToken("");
//   //   localStorage.removeItem("token");
//   //   navigate("/");
//   //   setIsLoggedin(false);
//   // };

//   return (
//     <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-teal-500 z-50 shadow-lg">
//       <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
//         {/* Logo */}
//         <img
//           onClick={() => {
//             navigate("/");
//             scrollTo(0, 0);
//           }}
//           className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
//           // src={assets.logo} // Replace with your logo path
//           alt="logo"
//         />

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex items-center gap-10 text-white font-medium text-lg">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/doctors"
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             Find a Doctor
//           </NavLink>
//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             About
//           </NavLink>
//           <NavLink
//             to="/services"
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             Services
//           </NavLink>
//           <NavLink
//             to="/contact"
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             Contact
//           </NavLink>
//         </ul>

//         {/* User Section */}
//         <div className="hidden md:flex items-center gap-6">
//           {token && userData ? (
//             <div className="relative" ref={dropdownRef}>
//               <img
//                 className="w-12 h-12 rounded-full cursor-pointer ring-2 ring-white hover:ring-teal-200 transition-all"
//                 src={userData.image}
//                 alt="User"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               />
//               <div
//                 className={`absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 w-48 ${
//                   showDropdown ? "block" : "hidden"
//                 } transition-opacity duration-200`}
//               >
//                 <p
//                   onClick={() => {
//                     navigate("/my-profile");
//                     setShowDropdown(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   My Profile
//                 </p>
//                 <p
//                   onClick={() => {
//                     navigate("/my-appointments");
//                     setShowDropdown(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   My Appointments
//                 </p>
//                 <p
//                   onClick={() => {
//                     logoutUser();
//                     setShowDropdown(false); // Close dropdown after logout
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   Logout
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
//             >
//               Create Account
//             </button>
//           )}

//           {/* Mobile Menu Icon */}
//         </div>
//         <div className="md:hidden flex items-center gap-2">
//           <CiMenuBurger
//             onClick={() => setShowMenu(true)}
//             className="text-3xl cursor-pointer md:hidden text-white hover:text-teal-200 transition-colors"
//           />
//           {token && userData ? (
//             <div className="relative" ref={dropdownRef}>
//               <img
//                 className="w-12 h-12 rounded-full cursor-pointer ring-2 ring-white hover:ring-teal-200 transition-all"
//                 src={userData.image}
//                 alt="User"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               />
//               <div
//                 className={`absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 w-48 ${
//                   showDropdown ? "block" : "hidden"
//                 } transition-opacity duration-200`}
//               >
//                 <p
//                   onClick={() => {
//                     navigate("/my-profile");
//                     setShowDropdown(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   My Profile
//                 </p>
//                 <p
//                   onClick={() => {
//                     navigate("/my-appointments");
//                     setShowDropdown(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   My Appointments
//                 </p>
//                 <p
//                   onClick={() => {
//                     logoutUser();
//                     setShowDropdown(false); // Close dropdown after logout
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                 >
//                   Logout
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-teal-600 text-white px-3 py-3 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
//             >
//               <RiLoginCircleFill />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed inset-0 bg-teal-700/95 backdrop-blur-sm z-40 transform ${
//           showMenu ? "translate-x-0" : "translate-x-full"
//         } transition-transform ease-in-out duration-300`}
//       >
//         <div className="flex items-center justify-between px-6 py-4 border-b border-teal-500">
//           <img className="w-32" src={assets.logo} alt="Logo" />
//           <IoCloseCircleOutline
//             onClick={() => setShowMenu(false)}
//             className="text-3xl text-white cursor-pointer hover:text-teal-200 transition-colors"
//           />
//         </div>
//         <ul className="flex flex-col items-center gap-6 mt-8 text-lg font-medium text-white">
//           <NavLink
//             to="/"
//             onClick={() => setShowMenu(false)}
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/doctors"
//             onClick={() => setShowMenu(false)}
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             Find a Doctor
//           </NavLink>
//           <NavLink
//             to="/about"
//             onClick={() => setShowMenu(false)}
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             About
//           </NavLink>
//           <NavLink
//             to="/services"
//             onClick={() => setShowMenu(false)}
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             Services
//           </NavLink>
//           <NavLink
//             to="/contact"
//             onClick={() => setShowMenu(false)}
//             className={({ isActive }) =>
//               `hover:text-teal-200 transition-colors duration-200 ${
//                 isActive ? "text-teal-200 font-semibold" : ""
//               }`
//             }
//           >
//             Contact
//           </NavLink>

//           {!token && (
//             <button
//               onClick={() => {
//                 navigate("/login");
//                 setShowMenu(false);
//               }}
//               className="bg-blue-600 text-white px-6 py-3 rounded-full mt-4 hover:bg-blue-700 transition-colors duration-200 font-medium"
//             >
//               Create Account
//             </button>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiLoginCircleFill } from "react-icons/ri";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { token, userData, logoutUser } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-teal-500 z-50 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          className="w-36 cursor-pointer hover:opacity-80 transition-opacity"
          src="/logo.png" // Replace with actual logo path
          alt="Medico Logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-white font-medium text-lg">
          {["Home", "Find a Doctor", "About", "Services", "Contact"].map(
            (item, index) => (
              <NavLink
                key={index}
                to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `hover:text-teal-200 transition-colors duration-200 ${
                    isActive ? "text-teal-200 font-semibold" : ""
                  }`
                }
              >
                {item}
              </NavLink>
            )
          )}
        </ul>

        {/* User Section */}
        <div className="hidden md:flex items-center gap-6">
          {token && userData ? (
            <div className="relative" ref={dropdownRef}>
              <img
                className="w-12 h-12 rounded-full cursor-pointer ring-2 ring-white hover:ring-teal-200 transition-all"
                src={userData.image || "/default-user.png"} // Fallback image
                alt="User Avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 w-48 transition-opacity duration-200">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      logoutUser();
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <CiMenuBurger
            onClick={() => setShowMenu(true)}
            className="text-3xl cursor-pointer text-white hover:text-teal-200 transition-colors"
          />
          {token && userData ? (
            <div className="relative" ref={dropdownRef}>
              <img
                className="w-12 h-12 rounded-full cursor-pointer ring-2 ring-white hover:ring-teal-200 transition-all"
                src={userData.image || "/default-user.png"}
                alt="User Avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 w-48">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      logoutUser();
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-teal-600 text-white px-1 py-1 rounded-full hover:bg-teal-700 transition-colors duration-200 font-medium"
            >
              <RiLoginCircleFill className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {showMenu && (
        <div className="fixed inset-0 bg-teal-700/95 backdrop-blur-sm z-40 transition-transform ease-in-out duration-300">
          <div className="flex items-center justify-between px-6 py-4 border-b border-teal-500">
            <img className="w-32" src="/logo.png" alt="Logo" />
            <IoCloseCircleOutline
              onClick={() => setShowMenu(false)}
              className="text-3xl text-white cursor-pointer hover:text-teal-200 transition-colors"
            />
          </div>
          <ul className="flex flex-col items-center gap-6 mt-8 text-lg font-medium text-white">
            {["Home", "Find a Doctor", "About", "Services", "Contact"].map(
              (item, index) => (
                <NavLink
                  key={index}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `hover:text-teal-200 transition-colors duration-200 ${
                      isActive ? "text-teal-200 font-semibold" : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              )
            )}
            {!token && (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-full mt-4 hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
