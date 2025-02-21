// // // // import React, { useContext, useEffect, useState } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import { AppContext } from "../context/AppContext";
// // // // import { assets } from "../assets/assets";
// // // // import RelatedDoctors from "../components/RelatedDoctors";
// // // // import { toast } from "react-toastify";
// // // // import axios from "axios";

// // // // const Appointment = () => {
// // // //   const { docId } = useParams();
// // // //   const { doctors, currencySymbol, backendurl, token, getDoctorsData } =
// // // //     useContext(AppContext);
// // // //   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// // // //   const navigate = useNavigate();
// // // //   const [docInfo, setDocInfo] = useState(null);
// // // //   const [docSlots, setDocSlots] = useState([]);
// // // //   const [slotIndex, setSlotIndex] = useState(0);
// // // //   const [slotTime, setSlotTime] = useState("");
// // // //   const [todayMessage, setTodayMessage] = useState("");

// // // //   // Fetch doctor information
// // // //   const fetchDocInfo = async () => {
// // // //     const docInfo = doctors.find((doc) => doc._id === docId);
// // // //     setDocInfo(docInfo);
// // // //   };

// // // //   // Generate available slots
// // // //   // const getAvailableSlots = () => {
// // // //   //   const today = new Date();
// // // //   //   const slots = [];
// // // //   //   const endTimeToday = new Date(today);
// // // //   //   endTimeToday.setHours(21, 0, 0, 0); // Today's end time: 9 PM

// // // //   //   // Check if it's past 9 PM today
// // // //   //   if (today >= endTimeToday) {
// // // //   //     setTodayMessage(
// // // //   //       "Today there are no available slots. Please book for the next day."
// // // //   //     );
// // // //   //     today.setDate(today.getDate() + 1); // Move to the next day
// // // //   //   }

// // // //   //   for (let i = 0; i < 7; i++) {
// // // //   //     const currentDate = new Date(today);
// // // //   //     currentDate.setDate(today.getDate() + i);

// // // //   //     const timeSlots = [];
// // // //   //     const startOfDay = new Date(currentDate);
// // // //   //     startOfDay.setHours(10, 0, 0, 0); // Start at 10 AM
// // // //   //     const endOfDay = new Date(currentDate);
// // // //   //     endOfDay.setHours(21, 0, 0, 0); // End at 9 PM

// // // //   //     // Generate 30-minute slots for the day
// // // //   //     while (startOfDay < endOfDay) {
// // // //   //       timeSlots.push({
// // // //   //         dateTime: new Date(startOfDay),
// // // //   //         time: startOfDay.toLocaleTimeString([], {
// // // //   //           hour: "2-digit",
// // // //   //           minute: "2-digit",
// // // //   //         }),
// // // //   //       });
// // // //   //       startOfDay.setMinutes(startOfDay.getMinutes() + 30);
// // // //   //     }

// // // //   //     slots.push(timeSlots);
// // // //   //   }

// // // //   //   setDocSlots(slots);
// // // //   // };
// // // //   const getAvailableSlots = () => {
// // // //     const today = new Date();
// // // //     const slots = [];
// // // //     const endTimeToday = new Date(today);
// // // //     endTimeToday.setHours(21, 0, 0, 0); // Today's end time: 9 PM

// // // //     // Check if it's past 9 PM today
// // // //     if (today >= endTimeToday) {
// // // //       setTodayMessage(
// // // //         "Today there are no available slots. Please book for the next day."
// // // //       );
// // // //       today.setDate(today.getDate() + 1); // Move to the next day
// // // //     }

// // // //     for (let i = 0; i < 7; i++) {
// // // //       const currentDate = new Date(today);
// // // //       currentDate.setDate(today.getDate() + i);

// // // //       const timeSlots = [];
// // // //       const startOfDay = new Date(currentDate);
// // // //       startOfDay.setHours(10, 0, 0, 0); // Start at 10 AM
// // // //       const endOfDay = new Date(currentDate);
// // // //       endOfDay.setHours(21, 0, 0, 0); // End at 9 PM

// // // //       // Generate 30-minute slots for the day
// // // //       while (startOfDay < endOfDay) {
// // // //         const currentTime = new Date(); // Current time for comparison
// // // //         if (startOfDay > currentTime || i > 0) {
// // // //           timeSlots.push({
// // // //             dateTime: new Date(startOfDay),
// // // //             time: startOfDay.toLocaleTimeString([], {
// // // //               hour: "2-digit",
// // // //               minute: "2-digit",
// // // //             }),
// // // //           });
// // // //         }
// // // //         startOfDay.setMinutes(startOfDay.getMinutes() + 30);
// // // //       }

// // // //       slots.push(timeSlots);
// // // //     }

// // // //     setDocSlots(slots);
// // // //   };

// // // //   const bookAppointment = async () => {
// // // //     if (!token) {
// // // //       toast.warn("Login to book appointment");
// // // //       return navigate("/login");
// // // //     }
// // // //     try {
// // // //       const date = docSlots[slotIndex][0];

// // // //       let day = date.getDate();
// // // //       let month = date.getMonth() + 1;
// // // //       let year = date.getFullYear();

// // // //       const slotDate = day + "-" + month + "-" + year;

// // // //       const { data } = await axios.post(
// // // //         backendurl + "/api/user/book-appointment",
// // // //         { docId, slotDate, slotTime },
// // // //         { headers: { token } }
// // // //       );
// // // //       if (data.success) {
// // // //         toast.success("Appointment booked successfully");
// // // //         getDoctorsData();
// // // //         navigate("/my-appintments");
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Failed to book appointment");
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchDocInfo();
// // // //   }, [doctors, docId]);

// // // //   useEffect(() => {
// // // //     getAvailableSlots();
// // // //   }, [docInfo]);

// // // //   return (
// // // //     docInfo && (
// // // //       <div>
// // // //         {/* Doctor Details */}
// // // //         <div className="flex flex-col sm:flex-row gap-4">
// // // //           <div>
// // // //             <img
// // // //               className="bg-green-100 w-full sm:max-w-72 rounded-lg"
// // // //               src={docInfo.image}
// // // //               alt=""
// // // //             />
// // // //           </div>

// // // //           <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 sm:mx-0 mt-[-80px] sm:mt-0 bg-blue-100">
// // // //             {/* Doctor Info */}
// // // //             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
// // // //               {docInfo.name}{" "}
// // // //               <img className="w-5" src={assets.verified_icon} alt="" />
// // // //             </p>
// // // //             <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
// // // //               <p>
// // // //                 {docInfo.degree} - {docInfo.speciality}
// // // //               </p>
// // // //               <button className="py-0.5 px-2 text-xs rounded-full bg-green-50 border">
// // // //                 {docInfo.experience}
// // // //               </button>
// // // //             </div>
// // // //             {/* Doctor About */}
// // // //             <div>
// // // //               <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
// // // //                 About <img className="w-3" src={assets.info_icon} alt="" />
// // // //               </p>
// // // //               <p className="text-sm text-gray-500 max-w-[700px] mt-1">
// // // //                 {docInfo.about}
// // // //               </p>
// // // //             </div>
// // // //             <p className="text-gray-500 font-medium mt-4">
// // // //               Appointment fee:{" "}
// // // //               <span className="text-black">
// // // //                 {currencySymbol}
// // // //                 {docInfo.fees}
// // // //               </span>
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         {/* Booking Slots */}
// // // //         <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
// // // //           <p>Booking slots</p>

// // // //           {/* Message for today */}
// // // //           {todayMessage && (
// // // //             <p className="text-red-500 font-medium mt-3">{todayMessage}</p>
// // // //           )}

// // // //           <div className="flex gap-4 items-center w-full overflow-x-scroll mt-4">
// // // //             {docSlots.length &&
// // // //               docSlots.map((item, index) => (
// // // //                 <div
// // // //                   onClick={() => setSlotIndex(index)}
// // // //                   className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
// // // //                     slotIndex === index
// // // //                       ? "bg-green-300 text-white hover:bg-green-400"
// // // //                       : "border border-gray-200 hover:border-gray-400"
// // // //                   }`}
// // // //                   key={index}
// // // //                 >
// // // //                   <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
// // // //                   <p>{item[0] && item[0].dateTime.getDate()}</p>
// // // //                 </div>
// // // //               ))}
// // // //           </div>

// // // //           <div className="flex items-center gap-3 overflow-x-scroll mt-4 w-full">
// // // //             {docSlots.length &&
// // // //               docSlots[slotIndex]?.map((item, index) => (
// // // //                 <p
// // // //                   onClick={() => setSlotTime(item.time)}
// // // //                   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
// // // //                     item.time === slotTime
// // // //                       ? "bg-green-300 text-white hover:bg-green-400"
// // // //                       : "text-gray-400 border border-gray-300 hover:border-gray-400"
// // // //                   }`}
// // // //                   key={index}
// // // //                 >
// // // //                   {item.time.toLowerCase()}
// // // //                 </p>
// // // //               ))}
// // // //           </div>
// // // //           <button
// // // //             onClick={bookAppointment}
// // // //             className="bg-green-300 text-white text-sm rounded-full my-6 px-10 py-3 hover:bg-green-400"
// // // //           >
// // // //             Book an appointment
// // // //           </button>
// // // //         </div>

// // // //         {/* Related Doctors */}
// // // //         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
// // // //       </div>
// // // //     )
// // // //   );
// // // // };

// // // // export default Appointment;

// // // // Generate available slots using useMemo
// // // // const getAvailableSlots = useMemo(() => {
// // // //   const today = new Date();
// // // //   const slots = [];
// // // //   const endTimeToday = new Date(today);
// // // //   endTimeToday.setHours(SLOT_END_HOUR, 0, 0, 0);

// // // //   if (today >= endTimeToday) {
// // // //     setTodayMessage(
// // // //       "Today there are no available slots. Please book for the next day."
// // // //     );
// // // //     today.setDate(today.getDate() + 1);
// // // //   }

// // // //   for (let i = 0; i < 7; i++) {
// // // //     const currentDate = new Date(today);
// // // //     currentDate.setDate(today.getDate() + i);

// // // //     const timeSlots = [];
// // // //     const startOfDay = new Date(currentDate);
// // // //     startOfDay.setHours(SLOT_START_HOUR, 0, 0, 0);
// // // //     const endOfDay = new Date(currentDate);
// // // //     endOfDay.setHours(SLOT_END_HOUR, 0, 0, 0);

// // // //     while (startOfDay < endOfDay) {
// // // //       const currentTime = new Date();
// // // //       if (startOfDay > currentTime || i > 0) {
// // // //         timeSlots.push({
// // // //           dateTime: new Date(startOfDay),
// // // //           time: startOfDay.toLocaleTimeString([], {
// // // //             hour: "2-digit",
// // // //             minute: "2-digit",
// // // //           }),
// // // //         });
// // // //       }
// // // //       startOfDay.setMinutes(startOfDay.getMinutes() + SLOT_INTERVAL_MINUTES);
// // // //     }

// // // //     let day = currentDate.getDate();
// // // //     let month = currentDate.getMonth() + 1;
// // // //     let year = currentDate.getFullYear();

// // // //     const slotDate = `${day}-${month}-${year}`;
// // // //     const slotTime = time;

// // // //     const isSlotAvailable =
// // // //       docInfo.slots_booked[slotDate] &&
// // // //       docInfo.slots_booked[slotDate].includes(slotTime)
// // // //         ? false
// // // //         : true;

// // // //     if (isSlotAvailable) {
// // // //       slots.push(timeSlots);
// // // //     }
// // // //   }
// // // //   return slots;
// // // // }, [docInfo]);

// // // import React, { useContext, useEffect, useState, useMemo } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { AppContext } from "../context/AppContext";
// // // import { assets } from "../assets/assets";
// // // import RelatedDoctors from "../components/RelatedDoctors";
// // // import { toast } from "react-toastify";
// // // import axios from "axios";

// // // const Appointment = () => {
// // //   const { docId } = useParams();
// // //   const { doctors, currencySymbol, backendurl, token, getDoctorsData } =
// // //     useContext(AppContext);
// // //   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// // //   const navigate = useNavigate();

// // //   const [docInfo, setDocInfo] = useState(null);
// // //   const [docSlots, setDocSlots] = useState([]);
// // //   const [slotIndex, setSlotIndex] = useState(-1); // Default to no selection
// // //   const [slotTime, setSlotTime] = useState("");
// // //   const [todayMessage, setTodayMessage] = useState("");

// // //   const SLOT_START_HOUR = 10; // Start time: 10 AM
// // //   const SLOT_END_HOUR = 21; // End time: 9 PM
// // //   const SLOT_INTERVAL_MINUTES = 30; // Slot duration: 30 minutes

// // //   // Fetch doctor information
// // //   const loadDoctorInfo = async () => {
// // //     const doc = doctors.find((doc) => doc._id === docId);
// // //     if (doc) {
// // //       setDocInfo(doc);
// // //     } else {
// // //       toast.error("Doctor not found");
// // //       navigate("/");
// // //     }
// // //   };

// // //   // const getAvailableSlots = useMemo(() => {
// // //   //   if (!docInfo || !docInfo.slots_booked) return []; // Ensure docInfo and slots_booked exist

// // //   //   const today = new Date();
// // //   //   const slots = [];
// // //   //   const endTimeToday = new Date(today);
// // //   //   endTimeToday.setHours(SLOT_END_HOUR, 0, 0, 0);

// // //   //   if (today >= endTimeToday) {
// // //   //     setTodayMessage(
// // //   //       "Today there are no available slots. Please book for the next day."
// // //   //     );
// // //   //     today.setDate(today.getDate() + 1);
// // //   //   }

// // //   //   for (let i = 0; i < 7; i++) {
// // //   //     const currentDate = new Date(today);
// // //   //     currentDate.setDate(today.getDate() + i);

// // //   //     const timeSlots = [];
// // //   //     const startOfDay = new Date(currentDate);
// // //   //     startOfDay.setHours(SLOT_START_HOUR, 0, 0, 0);
// // //   //     const endOfDay = new Date(currentDate);
// // //   //     endOfDay.setHours(SLOT_END_HOUR, 0, 0, 0);

// // //   //     while (startOfDay < endOfDay) {
// // //   //       const currentTime = new Date();

// // //   //       const slotDateTime = new Date(startOfDay);
// // //   //       const slotTime = slotDateTime.toLocaleTimeString([], {
// // //   //         hour: "2-digit",
// // //   //         minute: "2-digit",
// // //   //       });

// // //   //       // Format slotDate as DD-MM-YYYY
// // //   //       const day = slotDateTime.getDate();
// // //   //       const month = slotDateTime.getMonth() + 1;
// // //   //       const year = slotDateTime.getFullYear();
// // //   //       const slotDate = `${day}-${month}-${year}`;

// // //   //       // Check if the slot is booked
// // //   //       const isSlotBooked = docInfo.slots_booked[slotDate]?.includes(slotTime);

// // //   //       if ((slotDateTime > currentTime || i > 0) && !isSlotBooked) {
// // //   //         timeSlots.push({
// // //   //           dateTime: slotDateTime,
// // //   //           time: slotTime,
// // //   //         });
// // //   //       }

// // //   //       startOfDay.setMinutes(startOfDay.getMinutes() + SLOT_INTERVAL_MINUTES);
// // //   //     }

// // //   //     slots.push(timeSlots);
// // //   //   }
// // //   //   return slots;
// // //   // }, [docInfo]);

// // //   const getAvailableSlots = useMemo(() => {
// // //     if (!docInfo || !docInfo.slots_booked) return []; // Ensure docInfo and slots_booked exist

// // //     const today = new Date();
// // //     const slots = [];
// // //     const endTimeToday = new Date(today);
// // //     endTimeToday.setHours(SLOT_END_HOUR, 0, 0, 0);

// // //     // If the time is after 8:30 PM today, show message and move to next day
// // //     if (
// // //       today.getHours() > 20 ||
// // //       (today.getHours() === 20 && today.getMinutes() > 30)
// // //     ) {
// // //       setTodayMessage(`Today there are no available slots..`);
// // //       today.setDate(today.getDate() + 1); // Move to the next day
// // //     }

// // //     for (let i = 0; i < 7; i++) {
// // //       const currentDate = new Date(today);
// // //       currentDate.setDate(today.getDate() + i);

// // //       const timeSlots = [];
// // //       const startOfDay = new Date(currentDate);
// // //       startOfDay.setHours(SLOT_START_HOUR, 0, 0, 0);
// // //       const endOfDay = new Date(currentDate);
// // //       endOfDay.setHours(SLOT_END_HOUR, 0, 0, 0);

// // //       while (startOfDay < endOfDay) {
// // //         const currentTime = new Date();

// // //         const slotDateTime = new Date(startOfDay);
// // //         const slotTime = slotDateTime.toLocaleTimeString([], {
// // //           hour: "2-digit",
// // //           minute: "2-digit",
// // //         });

// // //         // Format slotDate as DD-MM-YYYY
// // //         const day = slotDateTime.getDate();
// // //         const month = slotDateTime.getMonth() + 1;
// // //         const year = slotDateTime.getFullYear();
// // //         const slotDate = `${day}-${month < 10 ? "0" + month : month}-${year}`;

// // //         // Check if the slot is booked
// // //         const isSlotBooked = docInfo.slots_booked[slotDate]?.includes(slotTime);

// // //         if ((slotDateTime > currentTime || i > 0) && !isSlotBooked) {
// // //           timeSlots.push({
// // //             dateTime: slotDateTime,
// // //             time: slotTime,
// // //           });
// // //         }

// // //         startOfDay.setMinutes(startOfDay.getMinutes() + SLOT_INTERVAL_MINUTES);
// // //       }

// // //       slots.push(timeSlots);
// // //     }

// // //     return slots;
// // //   }, [docInfo]);

// // //   const bookAppointment = async () => {
// // //     if (!token) {
// // //       toast.warn("Login to book appointment");
// // //       return navigate("/login");
// // //     }

// // //     try {
// // //       if (slotIndex === -1 || !slotTime) {
// // //         toast.error("Please select a valid slot");
// // //         return;
// // //       }

// // //       const selectedSlot = docSlots[slotIndex][0]?.dateTime;
// // //       if (!selectedSlot) {
// // //         toast.error("Invalid slot selection");
// // //         return;
// // //       }

// // //       const day = selectedSlot.getDate();
// // //       const month = selectedSlot.getMonth() + 1;
// // //       const year = selectedSlot.getFullYear();

// // //       const slotDate = `${day}-${month}-${year}`;

// // //       const { data } = await axios.post(
// // //         `${backendurl}/api/user/book-appointment`,
// // //         { docId, slotDate, slotTime },
// // //         { headers: { token } }
// // //       );

// // //       if (data.success) {
// // //         toast.success("Appointment booked successfully");
// // //         getDoctorsData();
// // //         navigate("/my-appointments");
// // //       } else {
// // //         toast.error(data.message);
// // //       }
// // //     } catch (error) {
// // //       toast.error(error.message || "Failed to book appointment");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     loadDoctorInfo();
// // //   }, [doctors, docId]);

// // //   useEffect(() => {
// // //     setDocSlots(getAvailableSlots);
// // //   }, [getAvailableSlots]);

// // //   return (
// // //     docInfo && (
// // //       <div>
// // //         {/* Doctor Details */}
// // //         <div className="flex flex-col sm:flex-row gap-4">
// // //           <div>
// // //             <img
// // //               className="bg-green-100 w-full sm:max-w-72 rounded-lg"
// // //               src={docInfo.image}
// // //               alt={docInfo.name}
// // //             />
// // //           </div>

// // //           <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 sm:mx-0 mt-[-80px] sm:mt-0 bg-blue-100">
// // //             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
// // //               {docInfo.name}
// // //               <img className="w-5" src={assets.verified_icon} alt="Verified" />
// // //             </p>
// // //             <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
// // //               <p>
// // //                 {docInfo.degree} - {docInfo.speciality}
// // //               </p>
// // //               <button className="py-0.5 px-2 text-xs rounded-full bg-green-50 border">
// // //                 {docInfo.experience}
// // //               </button>
// // //             </div>
// // //             <div>
// // //               <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
// // //                 About <img className="w-3" src={assets.info_icon} alt="Info" />
// // //               </p>
// // //               <p className="text-sm text-gray-500 max-w-[700px] mt-1">
// // //                 {docInfo.about}
// // //               </p>
// // //             </div>
// // //             <p className="text-gray-500 font-medium mt-4">
// // //               Appointment fee:
// // //               <span className="text-black">
// // //                 {currencySymbol}
// // //                 {docInfo.fees}
// // //               </span>
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* Booking Slots */}
// // //         <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
// // //           <p>Booking slots</p>

// // //           {todayMessage && (
// // //             <p className="text-red-500 font-medium mt-3">{todayMessage}</p>
// // //           )}

// // //           <div className="flex gap-4 items-center w-full overflow-x-scroll mt-4">
// // //             {docSlots?.length > 0 &&
// // //               docSlots.map((item, index) => (
// // //                 <div
// // //                   onClick={() => setSlotIndex(index)}
// // //                   className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
// // //                     slotIndex === index
// // //                       ? "bg-green-300 text-white hover:bg-green-400"
// // //                       : "border border-gray-200 hover:border-gray-400"
// // //                   }`}
// // //                   key={index}
// // //                   role="button"
// // //                   aria-label={`Day ${daysOfWeek[item[0]?.dateTime.getDay()]}`}
// // //                 >
// // //                   <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
// // //                   <p>{item[0] && item[0].dateTime.getDate()}</p>
// // //                 </div>
// // //               ))}
// // //           </div>

// // //           <div className="flex items-center gap-3 overflow-x-scroll mt-4 w-full">
// // //             {docSlots?.length > 0 &&
// // //               docSlots[slotIndex]?.map((item, index) => (
// // //                 <p
// // //                   onClick={() => setSlotTime(item.time)}
// // //                   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
// // //                     item.time === slotTime
// // //                       ? "bg-green-300 text-white hover:bg-green-400"
// // //                       : "text-gray-400 border border-gray-300 hover:border-gray-400"
// // //                   }`}
// // //                   key={index}
// // //                   role="button"
// // //                   aria-label={`Slot at ${item.time}`}
// // //                 >
// // //                   {item.time.toLowerCase()}
// // //                 </p>
// // //               ))}
// // //           </div>

// // //           <button
// // //             onClick={bookAppointment}
// // //             className="bg-green-300 text-white text-sm rounded-full my-6 px-10 py-3 hover:bg-green-400"
// // //           >
// // //             Book an appointment
// // //           </button>
// // //         </div>

// // //         {/* Related Doctors */}
// // //         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
// // //       </div>
// // //     )
// // //   );
// // // };

// // // export default Appointment;

// // import React, { useContext, useEffect, useState, useMemo } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { AppContext } from "../context/AppContext";
// // import { assets } from "../assets/assets";
// // import RelatedDoctors from "../components/RelatedDoctors";
// // import { toast } from "react-toastify";
// // import axios from "axios";

// // const Appointment = () => {
// //   const { docId } = useParams();
// //   const { doctors, currencySymbol, backendurl, token, getDoctorsData } =
// //     useContext(AppContext);
// //   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// //   const navigate = useNavigate();

// //   const [docInfo, setDocInfo] = useState(null);
// //   const [docSlots, setDocSlots] = useState([]);
// //   const [slotIndex, setSlotIndex] = useState(-1); // Default to no selection
// //   const [slotTime, setSlotTime] = useState("");
// //   const [todayMessage, setTodayMessage] = useState("");

// //   const SLOT_START_HOUR = 10; // Start time: 10 AM
// //   const SLOT_END_HOUR = 21; // End time: 9 PM
// //   const SLOT_INTERVAL_MINUTES = 30; // Slot duration: 30 minutes

// //   // Fetch doctor information
// //   const loadDoctorInfo = async () => {
// //     const doc = doctors.find((doc) => doc._id === docId);
// //     if (doc) {
// //       setDocInfo(doc);
// //     } else {
// //       toast.error("Doctor not found");
// //       navigate("/doctors");
// //     }
// //   };

// //   const getAvailableSlots = useMemo(() => {
// //     if (!docInfo || !docInfo.slots_booked) return []; // Ensure docInfo and slots_booked exist

// //     const today = new Date();
// //     const slots = [];
// //     const endTimeToday = new Date(today);
// //     endTimeToday.setHours(SLOT_END_HOUR, 0, 0, 0);

// //     // If the time is after 8:30 PM today, show message and move to next day
// //     if (
// //       today.getHours() > 20 ||
// //       (today.getHours() === 20 && today.getMinutes() > 30)
// //     ) {
// //       setTodayMessage(`Today there are no available slots..`);
// //       today.setDate(today.getDate() + 1); // Move to the next day
// //     }

// //     for (let i = 0; i < 7; i++) {
// //       const currentDate = new Date(today);
// //       currentDate.setDate(today.getDate() + i);

// //       const timeSlots = [];
// //       const startOfDay = new Date(currentDate);
// //       startOfDay.setHours(SLOT_START_HOUR, 0, 0, 0);
// //       const endOfDay = new Date(currentDate);
// //       endOfDay.setHours(SLOT_END_HOUR, 0, 0, 0);

// //       while (startOfDay < endOfDay) {
// //         const currentTime = new Date();

// //         const slotDateTime = new Date(startOfDay);
// //         const slotTime = slotDateTime.toLocaleTimeString([], {
// //           hour: "2-digit",
// //           minute: "2-digit",
// //         });

// //         // Format slotDate as DD-MM-YYYY
// //         const day = slotDateTime.getDate();
// //         const month = slotDateTime.getMonth() + 1;
// //         const year = slotDateTime.getFullYear();
// //         const slotDate = `${day}-${month < 10 ? "0" + month : month}-${year}`;

// //         // Check if the slot is booked
// //         const isSlotBooked = docInfo.slots_booked[slotDate]?.includes(slotTime);

// //         if ((slotDateTime > currentTime || i > 0) && !isSlotBooked) {
// //           timeSlots.push({
// //             dateTime: slotDateTime,
// //             time: slotTime,
// //           });
// //         }

// //         startOfDay.setMinutes(startOfDay.getMinutes() + SLOT_INTERVAL_MINUTES);
// //       }

// //       slots.push(timeSlots);
// //     }

// //     return slots;
// //   }, [docInfo]);

// //   const bookAppointment = async () => {
// //     if (!token) {
// //       toast.warn("Login to book appointment");
// //       return navigate("/login");
// //     }

// //     try {
// //       if (slotIndex === -1 || !slotTime) {
// //         toast.error("Please select a valid slot");
// //         return;
// //       }

// //       const selectedSlot = docSlots[slotIndex][0]?.dateTime;
// //       if (!selectedSlot) {
// //         toast.error("Invalid slot selection");
// //         return;
// //       }

// //       const day = selectedSlot.getDate();
// //       const month = selectedSlot.getMonth() + 1;
// //       const year = selectedSlot.getFullYear();

// //       const slotDate = `${day}-${month}-${year}`;

// //       const { data } = await axios.post(
// //         `${backendurl}/api/user/book-appointment`,
// //         { docId, slotDate, slotTime },
// //         { headers: { token } }
// //       );

// //       if (data.success) {
// //         toast.success("Appointment booked successfully");
// //         getDoctorsData();
// //         navigate("/my-appointments");
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error.message || "Failed to book appointment");
// //     }
// //   };

// //   useEffect(() => {
// //     loadDoctorInfo();
// //   }, [doctors, docId]);

// //   useEffect(() => {
// //     setDocSlots(getAvailableSlots);
// //   }, [getAvailableSlots]);

// //   return (
// //     docInfo && (
// //       <div className="max-w-4xl mx-auto px-4 py-8">
// //         {/* Doctor Details */}
// //         <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-8">
// //           <div className="w-full sm:w-1/3">
// //             <img
// //               className="w-full rounded-lg shadow-lg"
// //               src={docInfo.image}
// //               alt={docInfo.name}
// //             />
// //           </div>

// //           <div className="w-full sm:w-2/3 flex flex-col justify-between">
// //             <h2 className="text-3xl font-semibold text-gray-800">
// //               {docInfo.name}
// //             </h2>
// //             <p className="text-lg text-gray-600">
// //               {docInfo.degree} - {docInfo.speciality}
// //             </p>
// //             <p className="text-sm text-gray-500 mt-2">{docInfo.about}</p>
// //             <p className="mt-4 text-xl text-gray-900">
// //               Appointment Fee: {currencySymbol}
// //               {docInfo.fees}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Booking Slots */}
// //         <div className="mt-8">
// //           <p className="text-lg font-medium text-gray-700">
// //             Available Booking Slots
// //           </p>
// //           {todayMessage && (
// //             <p className="mt-2 text-red-600 font-medium">{todayMessage}</p>
// //           )}

// //           <div className="flex gap-4 items-center w-full overflow-x-scroll mt-4">
// //             {docSlots?.length > 0 &&
// //               docSlots.map((item, index) => (
// //                 <div
// //                   onClick={() => setSlotIndex(index)}
// //                   className={`text-center py-3 min-w-16 rounded-lg cursor-pointer ${
// //                     slotIndex === index
// //                       ? "bg-green-300 text-white hover:bg-green-400"
// //                       : "border border-gray-200 hover:border-gray-400"
// //                   }`}
// //                   key={index}
// //                   role="button"
// //                   aria-label={`Day ${daysOfWeek[item[0]?.dateTime.getDay()]}`}
// //                 >
// //                   <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
// //                   <p>{item[0] && item[0].dateTime.getDate()}</p>
// //                 </div>
// //               ))}
// //           </div>

// //           <div className="flex items-center gap-3 overflow-x-scroll mt-4 w-full">
// //             {docSlots?.length > 0 &&
// //               docSlots[slotIndex]?.map((item, index) => (
// //                 <p
// //                   onClick={() => setSlotTime(item.time)}
// //                   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
// //                     item.time === slotTime
// //                       ? "bg-green-300 text-white hover:bg-green-400"
// //                       : "text-gray-400 border border-gray-300 hover:border-gray-400"
// //                   }`}
// //                   key={index}
// //                   role="button"
// //                   aria-label={`Slot at ${item.time}`}
// //                 >
// //                   {item.time.toLowerCase()}
// //                 </p>
// //               ))}{" "}
// //           </div>

// //           <button
// //             onClick={bookAppointment}
// //             className="mt-6 bg-green-500 text-white text-lg py-3 px-6 rounded-full hover:bg-green-600"
// //           >
// //             Confirm Booking
// //           </button>
// //         </div>

// //         {/* Related Doctors */}
// //         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
// //       </div>
// //     )
// //   );
// // };

// // export default Appointment;

// import React, {
//   useContext,
//   useEffect,
//   useState,
//   useMemo,
//   useCallback,
// } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import RelatedDoctors from "../components/RelatedDoctors";
// import { toast } from "react-toastify";
// import axios from "axios";
// import {
//   format,
//   addDays,
//   isToday,
//   setHours,
//   setMinutes,
//   isAfter,
// } from "date-fns";

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, currencySymbol, backendurl, token, getDoctorsData } =
//     useContext(AppContext);
//   const navigate = useNavigate();

//   const [doctor, setDoctor] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedDayIndex, setSelectedDayIndex] = useState(-1);
//   const [selectedTime, setSelectedTime] = useState("");
//   const [loading, setLoading] = useState(false);

//   const SLOT_CONFIG = {
//     START_HOUR: 10,
//     END_HOUR: 21,
//     INTERVAL: 30,
//     LAST_BOOKING_HOUR: 20,
//     LAST_BOOKING_MINUTE: 30,
//   };

//   const loadDoctorInfo = async () => {
//     const doc = doctors.find((doc) => doc._id === docId);
//     if (doc) {
//       setDocInfo(doc);
//     } else {
//       toast.error("Doctor not found");
//       navigate("/doctors");
//     }
//   };

//   // Memoized doctor data loader
//   const currentDoctor = useMemo(
//     () => doctors.find((doc) => doc._id === docId),
//     [doctors, docId]
//   );

//   // Generate time slots for a given date
//   const generateSlotsForDate = useCallback(
//     (date) => {
//       const slots = [];
//       const startTime = setHours(setMinutes(date, 0), SLOT_CONFIG.START_HOUR);
//       const endTime = setHours(setMinutes(date, 0), SLOT_CONFIG.END_HOUR);

//       let currentSlot = new Date(startTime);

//       while (currentSlot <= endTime) {
//         const formattedTime = format(currentSlot, "hh:mm a");
//         const slotDate = format(currentSlot, "dd-MM-yyyy");

//         // const isBooked =
//         //   currentDoctor?.slots_booked?.[slotDate]?.includes(formattedTime);
//         // const isPast = isToday(date) && isAfter(new Date(), currentSlot);

//         const isBooked =
//           docInfo.slots_booked[slotDate] &&
//           docInfo.slots_booked[slotDate].includes(slotTime)
//             ? false
//             : true;

//         if (isBooked) {
//           slots.push({
//             time: formattedTime,
//             dateTime: new Date(currentSlot),
//             isoDate: format(currentSlot, "yyyy-MM-dd"),
//           });
//         }

//         currentSlot = new Date(
//           currentSlot.setMinutes(
//             currentSlot.getMinutes() + SLOT_CONFIG.INTERVAL
//           )
//         );
//       }

//       return slots;
//     },
//     [currentDoctor, docInfo]
//   );

//   // Generate slots for next 7 days
//   const generateAvailableSlots = useCallback(() => {
//     if (!currentDoctor) return [];

//     const today = new Date();
//     const slots = [];

//     for (let i = 0; i < 7; i++) {
//       const date = addDays(today, i);
//       const dailySlots = generateSlotsForDate(date);

//       if (dailySlots.length > 0) {
//         slots.push(dailySlots);
//       }
//     }

//     return slots;
//   }, [currentDoctor, generateSlotsForDate]);

//   // Handle appointment booking
//   const handleBooking = async () => {
//     if (!token) {
//       toast.info("Please login to book an appointment");
//       return navigate("/login");
//     }

//     if (selectedDayIndex === -1 || !selectedTime) {
//       toast.error("Please select a time slot");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await axios.post(
//         `${backendurl}/api/user/book-appointment`,
//         {
//           docId,
//           slotDate: availableSlots[selectedDayIndex][0].isoDate,
//           slotTime: selectedTime,
//         },
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success("Appointment booked successfully!");
//         await getDoctorsData();
//         navigate("/my-appointments");
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Booking failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!currentDoctor) {
//       toast.error("Doctor not found");
//       navigate("/doctors");
//     } else {
//       setDoctor(currentDoctor);
//       setAvailableSlots(generateAvailableSlots());
//     }
//   }, [currentDoctor, navigate, generateAvailableSlots]);

//   if (!doctor)
//     return <div className="text-center py-8">Loading doctor details...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Doctor Profile Section */}
//       <section className="flex flex-col md:flex-row gap-8 mb-12">
//         <img
//           src={doctor.image}
//           alt={doctor.name}
//           className="w-full md:w-1/3 rounded-xl shadow-lg object-cover"
//         />

//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
//           <p className="text-lg text-gray-600">
//             {doctor.degree} - {doctor.speciality}
//           </p>
//           <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
//           <p className="text-xl font-semibold text-primary">
//             {currencySymbol}
//             {doctor.fees} consultation fee
//           </p>
//         </div>
//       </section>

//       {/* Booking Interface */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//           Select Appointment Time
//         </h2>

//         {/* Day Selection */}
//         <div className="flex gap-4 overflow-x-auto pb-4">
//           {availableSlots.map((daySlots, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setSelectedDayIndex(index);
//                 setSelectedTime("");
//               }}
//               className={`min-w-[120px] p-4 rounded-lg text-center transition-all ${
//                 selectedDayIndex === index
//                   ? "bg-primary text-white"
//                   : "bg-gray-100 hover:bg-gray-200"
//               }`}
//             >
//               <p className="font-medium">
//                 {format(daySlots[0].dateTime, "EEE")}
//               </p>
//               <p className="text-lg">{format(daySlots[0].dateTime, "dd")}</p>
//             </button>
//           ))}
//         </div>

//         {/* Time Slot Selection */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
//           {availableSlots[selectedDayIndex]?.map((slot, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedTime(slot.time)}
//               className={`p-3 rounded-md text-sm font-medium transition-all ${
//                 selectedTime === slot.time
//                   ? "bg-green-500 text-white"
//                   : "bg-gray-100 hover:bg-green-100"
//               }`}
//             >
//               {slot.time.toLowerCase()}
//             </button>
//           ))}
//         </div>

//         {/* Booking Action */}
//         <button
//           onClick={handleBooking}
//           disabled={loading || !selectedTime}
//           className={`mt-8 w-full py-3 rounded-lg font-semibold text-white transition-all ${
//             loading ? "bg-gray-400" : "bg-primary hover:bg-primary-dark"
//           }`}
//         >
//           {loading ? "Processing..." : "Confirm Appointment"}
//         </button>
//       </section>

//       {/* Related Doctors */}
//       <RelatedDoctors currentDocId={docId} speciality={doctor.speciality} />
//     </div>
//   );
// };

// export default Appointment;

import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { format, addDays, setHours, setMinutes, addMinutes } from "date-fns";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendurl, token, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [todayMessage, setTodayMessage] = useState("");

  const SLOT_CONFIG = {
    START_HOUR: 10,
    END_HOUR: 21,
    INTERVAL: 30,
  };

  // Memoized doctor data
  const currentDoctor = useMemo(
    () => doctors.find((doc) => doc._id === docId),
    [doctors, docId]
  );

  const generateSlotsForDate = useCallback(
    (date) => {
      if (!doctor) return [];

      const slots = [];
      const now = new Date();

      let startTime = setHours(setMinutes(date, 0), SLOT_CONFIG.START_HOUR);
      let endTime = setHours(setMinutes(date, 0), SLOT_CONFIG.END_HOUR);

      // If generating for today, skip past-time slots
      if (format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")) {
        if (now.getHours() >= SLOT_CONFIG.END_HOUR) return []; // No slots available after 9 PM

        if (now.getHours() >= SLOT_CONFIG.START_HOUR) {
          // Round to the next nearest 30-minute slot
          const currentMinutes = now.getMinutes();
          const roundedMinutes = currentMinutes < 30 ? 30 : 60;
          startTime = setMinutes(now, roundedMinutes);
        }
      }

      while (startTime <= endTime) {
        const formattedTime = format(startTime, "hh:mm a");
        const slotDate = format(startTime, "yyyy-MM-dd");

        // Check if the slot is booked
        const isBooked =
          doctor.slots_booked?.[slotDate]?.includes(formattedTime) ?? false;

        if (!isBooked) {
          slots.push({
            time: formattedTime,
            isoDate: slotDate,
          });
        }

        startTime = addMinutes(startTime, SLOT_CONFIG.INTERVAL);
      }

      return slots;
    },
    [doctor]
  );

  // useEffect(() => {
  //   if (doctor) {
  //     const today = new Date();
  //     const slots = [];

  //     for (let i = 0; i < 7; i++) {
  //       const date = addDays(today, i);

  //       // Skip today’s slots if it's past 9 PM
  //       if (i === 0 && today.getHours() >= 21) {
  //         setTodayMessage("Today there are no available slots.");
  //         continue;
  //       }

  //       let dailySlots = generateSlotsForDate(date);

  //       // If today, filter out past slots
  //       if (i === 0) {
  //         const now = new Date();
  //         dailySlots = dailySlots.filter((slot) => {
  //           const slotTime = new Date(`${slot.isoDate} ${slot.time}`);
  //           return slotTime > now; // Only keep future slots
  //         });

  //         if (dailySlots.length === 0) {
  //           setTodayMessage("No available slots remaining for today.");
  //         }
  //       }

  //       if (dailySlots.length > 0) slots.push(dailySlots);
  //     }

  //     setAvailableSlots(slots);
  //   }
  // }, [doctor, generateSlotsForDate]);

  // Handle appointment booking

  useEffect(() => {
    if (doctor) {
      const today = new Date();
      const slots = [];
      let isTodayAvailable = true; // Flag for today's slots

      for (let i = 0; i < 7; i++) {
        const date = addDays(today, i);
        let dailySlots = generateSlotsForDate(date);

        if (i === 0) {
          const now = new Date();

          // If it's today and past 9 PM, show message but keep day visible
          if (now.getHours() >= 21) {
            setTodayMessage("Today there are no available slots.");
            isTodayAvailable = false;
          } else {
            dailySlots = dailySlots.filter((slot) => {
              const slotTime = new Date(`${slot.isoDate} ${slot.time}`);
              return slotTime > now; // Only keep future slots
            });

            if (dailySlots.length === 0) {
              setTodayMessage("No available slots remaining for today.");
              isTodayAvailable = false;
            }
          }
        }

        slots.push(dailySlots);
      }

      setAvailableSlots(slots);
    }
  }, [doctor, generateSlotsForDate]);

  const handleBooking = async () => {
    if (!token) {
      toast.info("Please login to book an appointment");
      return navigate("/login");
    }

    if (selectedDayIndex === -1 || !selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    const selectedSlot = availableSlots[selectedDayIndex].find(
      (slot) => slot.time === selectedTime
    );

    if (!selectedSlot) {
      toast.error("This slot is already booked. Please choose another.");
      return;
    }

    setLoading(true);
    try {
      const slotDate = availableSlots[selectedDayIndex][0].isoDate;

      const { data } = await axios.post(
        `${backendurl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: selectedTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment booked successfully!");
        await getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!currentDoctor) {
  //     toast.error("Doctor not found");
  //     navigate("/doctors");
  //   } else {
  //     setDoctor(currentDoctor);
  //   }
  // }, [currentDoctor, navigate]);

  useEffect(() => {
    if (!doctors.length) return; // Wait until doctors data is available

    if (!currentDoctor) {
      toast.error("Doctor not found");
      navigate("/doctors");
    } else if (!doctor) {
      setDoctor(currentDoctor);
    }
  }, [currentDoctor, navigate, doctors.length]); // Added doctors.length to dependency array

  if (!doctor)
    return <div className="text-center py-8">Loading doctor details...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Doctor Profile Section */}
      <section className="flex flex-col md:flex-row gap-8 mb-12">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full md:w-1/3 rounded-xl shadow-lg object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
          <p className="text-lg text-gray-600">
            {doctor.degree} - {doctor.speciality}
          </p>
          <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
          <p className="text-xl font-semibold text-primary">
            {currencySymbol}
            {doctor.fees} consultation fee
          </p>
        </div>
      </section>

      {/* Booking Interface */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Select Appointment Time
        </h2>

        {/* Day Selection */}
        {/* <div className="flex gap-4 overflow-x-auto pb-4">
          {availableSlots.map((daySlots, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDayIndex(index);
                setSelectedTime("");
              }}
              className={`min-w-[120px] p-4 rounded-lg text-center transition-all ${
                selectedDayIndex === index
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <p className="font-medium">
                {format(new Date(daySlots[0].isoDate), "EEE")}
              </p>
              <p className="text-lg">
                {format(new Date(daySlots[0].isoDate), "dd")}
              </p>
            </button>
          ))}
        </div> */}
        {/* Day Selection */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {availableSlots.length > 0 &&
            availableSlots.map((daySlots, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedDayIndex(index);
                  setSelectedTime("");
                }}
                className={`min-w-[120px] p-4 rounded-lg text-center transition-all ${
                  selectedDayIndex === index
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {daySlots.length > 0 ? (
                  <>
                    <p className="font-medium">
                      {format(new Date(daySlots[0].isoDate), "EEE")}
                    </p>
                    <p className="text-lg">
                      {format(new Date(daySlots[0].isoDate), "dd")}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">No Slots</p>
                )}
              </button>
            ))}
        </div>

        {/* Time Slot Selection */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
          {availableSlots[selectedDayIndex]?.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSelectedTime(slot.time)}
              className={`p-3 rounded-md text-sm font-medium transition-all ${
                selectedTime === slot.time
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              {slot.time.toLowerCase()}
            </button>
          ))}
        </div> */}

        {/* Time Slot Selection */}
        {/* Time Slot Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
          {selectedDayIndex !== -1 &&
          availableSlots[selectedDayIndex]?.length > 0 ? (
            availableSlots[selectedDayIndex].map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(slot.time)}
                className={`p-3 rounded-md text-sm font-medium transition-all ${
                  selectedTime === slot.time
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-green-100"
                }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))
          ) : selectedDayIndex === -1 ? (
            <p className="text-gray-500 col-span-full text-center">
              Please select a date to view available slots
            </p>
          ) : selectedDayIndex === 0 && todayMessage ? (
            <p className="text-gray-500 col-span-full text-center">
              {todayMessage}
            </p>
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No available slots
            </p>
          )}
        </div>

        {/* Booking Action */}
        <button
          onClick={handleBooking}
          disabled={loading || !selectedTime}
          className={`mt-8 w-full py-3 rounded-lg font-semibold text-white transition-all ${
            loading ? "bg-gray-400" : "bg-primary hover:bg-primary-dark"
          }`}
        >
          {loading ? "Processing..." : "Confirm Appointment"}
        </button>
      </section>

      {/* Related Doctors */}
      <RelatedDoctors currentDocId={docId} speciality={doctor.speciality} />
    </div>
  );
};

export default Appointment;
