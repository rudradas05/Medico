// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const RelatedDoctors = ({ speciality, docId }) => {
//   const { doctors } = useContext(AppContext);
//   const navigate = useNavigate();

//   const [relDoc, setRelDocs] = useState([]);

//   useEffect(() => {
//     if (doctors.length > 0 && speciality) {
//       const doctorsData = doctors.filter(
//         (doc) => doc.speciality === speciality && doc._id !== docId
//       );
//       setRelDocs(doctorsData);
//     }
//   }, [doctors, speciality, docId]);

//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
//       <h1 className="text-3xl font-medium">Related Doctors</h1>
//       <p className="text-sm w-1/3 text-center">
//         Simply browse through our extensive list of trusted doctors.
//       </p>
//       <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {relDoc.slice(0, 5).map((item, index) => (
//           <div
//             onClick={() => {
//               navigate(`/appointment/${item._id}`);
//               scrollTo(0, 0);
//             }}
//             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
//             key={index}
//           >
//             <img className="bg-green-100" src={item.image} alt="" />
//             <div className="p-4">
//               <div className="flex items-center gap-2 text-sm text-center text-green-500">
//                 <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                 <p>Available</p>
//               </div>
//               <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//               <p className="text-gray-600 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={() => {
//           navigate("/doctors");
//           scrollTo(0, 0);
//         }}
//         className="bg-green-100 text-black px-12 py-3 rounded-full mt-10 font-medium"
//       >
//         more
//       </button>
//     </div>
//   );
// };

// export default RelatedDoctors;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  if (relDoc.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Related Specialists
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore other qualified professionals in the same field of expertise
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {relDoc.slice(0, 4).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            // role="button"
            // tabIndex={0}
            // onKeyDown={(e) => {
            //   e.key === "Enter" && navigate(`/appointment/${item._id}`);
            //   scrollTo(0, 0);
            // }}
          >
            <div className="relative h-48 bg-gray-100">
              <img
                src={item.image}
                alt={`Dr. ${item.name}, ${item.speciality}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50" />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-400" : "bg-red-500"
                  }`}
                />
                <span className="text-sm font-medium text-gray-600">
                  {item.available ? "Available Now" : "Currently Unavailable"}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{item.speciality}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">4.8</span>
                <span className="mx-1">•</span>
                <span>15+ Years Exp</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {relDoc.length > 4 && (
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/doctors")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            View All Doctors →
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedDoctors;
