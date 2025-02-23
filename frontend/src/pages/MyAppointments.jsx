// // // import React, { useContext, useEffect, useState } from "react";
// // // import { AppContext } from "../context/AppContext";
// // // import axios from "axios";
// // // import { toast } from "react-toastify";

// // // const MyAppointments = () => {
// // //   const { backendurl, token } = useContext(AppContext);
// // //   const [appointments, setAppointments] = useState([]);
// // //   const months = [
// // //     "",
// // //     "Jan",
// // //     "Feb",
// // //     "Mar",
// // //     "Apr",
// // //     "May",
// // //     "Jun",
// // //     "Jul",
// // //     "Aug",
// // //     "Sep",
// // //     "Oct",
// // //     "Nov",
// // //     "Dec",
// // //   ];
// // //   const slotDateFormat = (slotDate) => {
// // //     const dateArray = slotDate.split("-");
// // //     return (
// // //       dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
// // //     );
// // //   };
// // //   const getUserAppointments = async () => {
// // //     try {
// // //       const { data } = await axios.get(backendurl + "/api/user/appointment", {
// // //         headers: { token },
// // //       });
// // //       if (data.success) {
// // //         setAppointments(data.appointment.reverse());
// // //         console.log(data.appointment);
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error(error.message);
// // //     }
// // //   };
// // //   useEffect(() => {
// // //     if (token) {
// // //       getUserAppointments();
// // //     }
// // //   }, [token]);

// // //   return (
// // //     <div>
// // //       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
// // //         My Appointments
// // //       </p>
// // //       <div>
// // //         {appointments.map((item, index) => (
// // //           <div
// // //             className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
// // //             key={index}
// // //           >
// // //             <div>
// // //               <img
// // //                 className="w-32 bg-indigo-50"
// // //                 src={item.docData.image}
// // //                 alt=""
// // //               />
// // //             </div>
// // //             <div className="flex-1 text-sm text-zinc-600 ">
// // //               <p className="text-neutral-800 font-semibold">
// // //                 {item.docData.name}
// // //               </p>
// // //               <p>{item.docData.speciality}</p>
// // //               <p className="text-zinc-700 font-medium mt-1">Address:</p>
// // //               <p className="text-xs">{item.docData.address.line1}</p>
// // //               <p className="text-xs">{item.docData.address.line2}</p>
// // //               <p className="text-sm mt-1">
// // //                 <span className="text-sm text-neutral-700 font-medium">
// // //                   Date & Time:
// // //                 </span>
// // //                 {slotDateFormat(item.slotDate)} | {item.slotTime}
// // //               </p>
// // //             </div>
// // //             <div></div>
// // //             <div className="flex flex-col gap-2 justify-end">
// // //               <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 rounded">
// // //                 Pay Online
// // //               </button>
// // //               <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-red-600 hover:text-white transition-all duration-300 rounded">
// // //                 Cancel appointement
// // //               </button>
// // //             </div>
// // //             <div></div>
// // //             {/* <div>
// // //                     <button>Pay Online</button>
// // //                     <button> Cancel appointement</button>
// // //                 </div> */}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MyAppointments;

// // import React, { useContext, useEffect, useState } from "react";
// // import { AppContext } from "../context/AppContext";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import LoadingSpinner from "../components/LoadingSpinner"; // Assume you have a spinner component

// // const MyAppointments = () => {
// //   const { backendurl, token, logout } = useContext(AppContext);
// //   const [appointments, setAppointments] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [cancelingId, setCancelingId] = useState(null);

// //   const months = [
// //     "Jan",
// //     "Feb",
// //     "Mar",
// //     "Apr",
// //     "May",
// //     "Jun",
// //     "Jul",
// //     "Aug",
// //     "Sep",
// //     "Oct",
// //     "Nov",
// //     "Dec",
// //   ];

// //   const formatAppointmentDate = (dateString) => {
// //     try {
// //       const date = new Date(dateString);
// //       if (isNaN(date)) throw new Error("Invalid date");
// //       return `${date.getDate()} ${
// //         months[date.getMonth()]
// //       } ${date.getFullYear()}`;
// //     } catch (error) {
// //       console.error("Date formatting error:", error);
// //       return "Invalid date";
// //     }
// //   };

// //   const fetchAppointments = async () => {
// //     setIsLoading(true);
// //     try {
// //       const { data } = await axios.get(`${backendurl}/api/user/appointment`, {
// //         headers: { token },
// //       });
// //       if (data.success) {
// //         setAppointments(data.appointment.reverse());
// //       }
// //     } catch (error) {
// //       console.error("Appointment fetch error:", error);
// //       const message = error.response?.data?.message || error.message;
// //       toast.error(`Failed to load appointments: ${message}`);

// //       if (error.response?.status === 401) {
// //         logout();
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleCancelAppointment = async (appointmentId) => {
// //     if (!window.confirm("Are you sure you want to cancel this appointment?"))
// //       return;

// //     setCancelingId(appointmentId);
// //     try {
// //       const { data } = await axios.post(
// //         `${backendurl}/api/user/cancel-appointment`,
// //         { appointmentId },
// //         { headers: { token } }
// //       );

// //       if (data.success) {
// //         setAppointments((prev) =>
// //           prev.filter((app) => app._id !== appointmentId)
// //         );
// //         toast.success("Appointment canceled successfully");
// //         fetchAppointments();
// //       }
// //     } catch (error) {
// //       console.error("Cancel error:", error);
// //       const message = error.response?.data?.message || error.message;
// //       toast.error(`Cancel failed: ${message}`);
// //     } finally {
// //       setCancelingId(null);
// //     }
// //   };

// //   useEffect(() => {
// //     if (token) fetchAppointments();
// //   }, [token]);

// //   if (isLoading) return <LoadingSpinner />;

// //   return (
// //     <div className="max-w-4xl mx-auto p-4">
// //       <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
// //         My Appointments
// //       </h2>

// //       {appointments.length === 0 ? (
// //         <div className="text-center py-8 text-gray-500">
// //           No appointments found
// //         </div>
// //       ) : (
// //         <div className="space-y-4">
// //           {appointments.map((appointment) => (
// //             <div
// //               key={appointment._id}
// //               className="bg-white rounded-lg shadow-sm p-4 border transition-all hover:shadow-md"
// //             >
// //               <div className="flex flex-col sm:flex-row gap-4">
// //                 <div className="flex-shrink-0">
// //                   <img
// //                     className="w-32 h-32 object-cover rounded-lg bg-gray-100"
// //                     src={appointment.docData.image}
// //                     alt={`Dr. ${appointment.docData.name}`}
// //                     onError={(e) => {
// //                       e.target.src = "/default-doctor.jpg"; // Add fallback image
// //                     }}
// //                   />
// //                 </div>

// //                 <div className="flex-grow">
// //                   <h3 className="text-lg font-semibold text-gray-800">
// //                     {appointment.docData.name}
// //                   </h3>
// //                   <p className="text-sm text-gray-600 mb-2">
// //                     {appointment.docData.speciality}
// //                   </p>

// //                   <div className="text-sm text-gray-600 space-y-1">
// //                     <p>
// //                       <span className="font-medium">Address:</span>{" "}
// //                       {appointment.docData.address.line1},{" "}
// //                       {appointment.docData.address.line2}
// //                     </p>
// //                     <p>
// //                       <span className="font-medium">Date & Time:</span>{" "}
// //                       {formatAppointmentDate(appointment.slotDate)} |{" "}
// //                       {appointment.slotTime}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="sm:self-end space-y-2 w-full sm:w-auto">
// //                   <button
// //                     className="w-full sm:w-40 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
// //                     onClick={() =>
// //                       toast.info("Payment integration coming soon")
// //                     }
// //                   >
// //                     Pay Online
// //                   </button>
// //                   <button
// //                     className="w-full sm:w-40  py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
// //                     onClick={() => handleCancelAppointment(appointment._id)}
// //                     disabled={cancelingId === appointment._id}
// //                   >
// //                     {cancelingId === appointment._id
// //                       ? "Canceling..."
// //                       : "Cancel Appointment"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyAppointments;

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import LoadingSpinner from "../components/LoadingSpinner";

// const MyAppointments = () => {
//   const { backendurl, token, logout } = useContext(AppContext);
//   const [appointments, setAppointments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [cancelingId, setCancelingId] = useState(null);

//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const formatAppointmentDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date)) throw new Error("Invalid date");
//       return `${date.getDate()} ${
//         months[date.getMonth()]
//       } ${date.getFullYear()}`;
//     } catch (error) {
//       console.error("Date formatting error:", error);
//       return "Invalid date";
//     }
//   };

//   const fetchAppointments = async () => {
//     if (!token) return;
//     setIsLoading(true);
//     try {
//       const { data } = await axios.get(`${backendurl}/api/user/appointment`, {
//         headers: { token },
//       });

//       if (data.success && Array.isArray(data.appointment)) {
//         setAppointments(data.appointment.reverse());
//       } else {
//         setAppointments([]);
//       }
//     } catch (error) {
//       console.error("Appointment fetch error:", error);
//       const message = error.response?.data?.message || "Something went wrong!";
//       toast.error(`Failed to load appointments: ${message}`);

//       if (error.response?.status === 401) {
//         logout();
//         setAppointments([]); // Clear stale data
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         `${backendurl}/api/user/cancel-appointment`,
//         { appointmentId },
//         { headers: { token } }
//       );

//       if (data.success) {
//         setAppointments((prev) =>
//           prev.filter((app) => app._id !== appointmentId)
//         );
//         toast.success("Appointment canceled successfully");
//       }
//     } catch (error) {
//       console.error("Cancel error:", error);
//       const message =
//         error.response?.data?.message || "Failed to cancel appointment.";
//       toast.error(`Cancel failed: ${message}`);
//     } finally {
//       setCancelingId(null);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, [token]);

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
//         My Appointments
//       </h2>

//       {appointments.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No appointments found
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {appointments.map((appointment) => (
//             <div
//               key={appointment._id}
//               className="bg-white rounded-lg shadow-sm p-4 border transition-all hover:shadow-md"
//             >
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex-shrink-0">
//                   <img
//                     className="w-32 h-32 object-cover rounded-lg bg-gray-100"
//                     src={appointment.docData.image}
//                     alt={`Dr. ${appointment.docData.name}`}
//                     onError={(e) => {
//                       e.target.src = "/default-doctor.jpg";
//                     }}
//                   />
//                 </div>

//                 <div className="flex-grow">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {appointment.docData.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-2">
//                     {appointment.docData.speciality}
//                   </p>

//                   <div className="text-sm text-gray-600 space-y-1">
//                     <p>
//                       <span className="font-medium">Address:</span>{" "}
//                       {appointment.docData.address?.line1},{" "}
//                       {appointment.docData.address?.line2}
//                     </p>
//                     <p>
//                       <span className="font-medium">Date & Time:</span>{" "}
//                       {formatAppointmentDate(appointment.slotDate)} |{" "}
//                       {appointment.slotTime}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="sm:self-end   w-full sm:w-auto ">
//                   {!appointment.cancelled && (
//                     <button
//                       className="w-full sm:w-40 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//                       onClick={() =>
//                         toast.info("Payment integration coming soon")
//                       }
//                     >
//                       Pay Online
//                     </button>
//                   )}
//                   {!appointment.cancelled && (
//                     <button
//                       className="w-full sm:w-40 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
//                       onClick={() => handleCancelAppointment(appointment._id)}
//                     >
//                       {cancelingId === appointment._id
//                         ? "Canceling..."
//                         : "Cancel Appointment"}
//                     </button>
//                   )}
//                   {appointment.cancelled && (
//                     <button className="w-full sm:w-40 py-2 bg-red-600 text-white rounded-md">
//                       Appointment Cancelled
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAppointments;

import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const MyAppointments = () => {
  const { backendurl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  const [payingId, setPayingId] = useState(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatAppointmentDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  // const fetchAppointments = useCallback(async () => {
  //   if (!token) return;
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get(`${backendurl}/api/user/appointment`, {
  //       headers: { token },
  //     });
  //     if (data.success && Array.isArray(data.appointment)) {
  //       setAppointments(data.appointment.reverse());
  //     } else {
  //       setAppointments([]);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Appointment fetch error:",
  //       error.response?.status,
  //       error.message
  //     );
  //     toast.error(
  //       `Failed to load appointments: ${
  //         error.response?.data?.message || "Something went wrong!"
  //       }`
  //     );

  //     if (error.response?.status === 401) {
  //       logout();
  //       setAppointments([]); // Clear stale data
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [backendurl, token]);

  const fetchAppointments = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendurl}/api/user/appointment`, {
        headers: { token },
      });
      if (data.success && Array.isArray(data.appointment)) {
        const sortedAppointments = data.appointment.sort(
          (a, b) => new Date(b.slotDate) - new Date(a.slotDate) // Descending (Newest First)
          // Change to `new Date(a.slotDate) - new Date(b.slotDate)` for Ascending (Oldest First)
        );
        setAppointments(sortedAppointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error(
        "Appointment fetch error:",
        error.response?.status,
        error.message
      );
      toast.error(
        `Failed to load appointments: ${
          error.response?.data?.message || "Something went wrong!"
        }`
      );

      if (error.response?.status === 401) {
        logout();
        setAppointments([]); // Clear stale data
      }
    } finally {
      setIsLoading(false);
    }
  }, [backendurl, token]);

  const handleCancelAppointment = async (appointmentId) => {
    setCancelingId(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        setAppointments((prev) =>
          prev.filter((app) => app._id !== appointmentId)
        );
        toast.success("Appointment canceled successfully");
        fetchAppointments();
        getDoctorsData();
      }
    } catch (error) {
      console.error("Cancel error:", error.response?.status, error.message);
      toast.error(
        `Cancel failed: ${
          error.response?.data?.message || "Failed to cancel appointment."
        }`
      );
    } finally {
      setCancelingId(null);
    }
  };

  const appoinmentStripepay = async (appointmentId) => {
    setPayingId(appointmentId);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/create-checkout-session`,
        { appointmentId },
        { headers: { token } }
      );

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No appointments found
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-sm p-4 border transition-all hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Doctor's Image */}
                <div className="flex-shrink-0">
                  <img
                    className="w-32 h-32 object-cover rounded-lg bg-gray-100"
                    src={appointment.docData.image}
                    alt={`Dr. ${appointment.docData.name}`}
                    onError={(e) => (e.target.src = "/default-doctor.jpg")}
                  />
                </div>

                {/* Doctor's Info */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {appointment.docData.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {appointment.docData.speciality}
                  </p>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {appointment.docData.address?.line1},{" "}
                      {appointment.docData.address?.line2}
                    </p>
                    <p>
                      <span className="font-medium">Date & Time:</span>{" "}
                      {formatAppointmentDate(appointment.slotDate)} |{" "}
                      {appointment.slotTime}
                    </p>
                  </div>
                </div>

                {/* Buttons Section */}
                {/* Buttons Section */}
                {/* <div className="flex flex-col gap-2 sm:items-end sm:justify-end">
                  {appointment.cancelled ? (
                    <button className="w-full sm:w-full px-4 py-2 bg-gray-500 text-white rounded-md cursor-not-allowed">
                      Appointment Cancelled
                    </button>
                  ) : (
                    <>
                      {appointment.payment ? (
                        <button className="w-full sm:w-full px-4 py-2 bg-green-600 text-white rounded-md">
                          Paid
                        </button>
                      ) : (
                        <button
                          className="w-full sm:w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                          onClick={() => appoinmentStripepay(appointment._id)}
                          disabled={payingId === appointment._id}
                        >
                          {payingId === appointment._id
                            ? "Processing"
                            : "Pay Online"}
                        </button>
                      )}

                      <button
                        className="w-full sm:w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                        onClick={() => handleCancelAppointment(appointment._id)}
                        disabled={cancelingId === appointment._id}
                      >
                        {cancelingId === appointment._id
                          ? "Canceling..."
                          : "Cancel Appointment"}
                      </button>
                    </>
                  )}
                </div> */}
                <div className="flex flex-col gap-2 sm:items-end sm:justify-end">
                  {appointment.cancelled ? (
                    <button className="w-full sm:w-full px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
                      Appointment Cancelled
                    </button>
                  ) : appointment.isCompleted ? (
                    <button className="w-full sm:w-full px-4 py-2 bg-teal-600 text-white rounded-md cursor-not-allowed">
                      Appointment Completed
                    </button>
                  ) : (
                    <>
                      {appointment.payment ? (
                        <button className="w-full sm:w-full px-4 py-2 bg-green-700 text-white rounded-md">
                          Paid
                        </button>
                      ) : (
                        <button
                          className="w-full sm:w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                          onClick={() => appoinmentStripepay(appointment._id)}
                          disabled={payingId === appointment._id}
                        >
                          {payingId === appointment._id
                            ? "Processing"
                            : "Pay Online"}
                        </button>
                      )}

                      <button
                        className="w-full sm:w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                        onClick={() => handleCancelAppointment(appointment._id)}
                        disabled={cancelingId === appointment._id}
                      >
                        {cancelingId === appointment._id
                          ? "Canceling..."
                          : "Cancel Appointment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
