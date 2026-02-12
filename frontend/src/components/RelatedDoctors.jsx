import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { resolveImageUrl } from "../utils/imageUrl";

const RelatedDoctors = ({ speciality, docId, currentDocId }) => {
  const { doctors, backendurl } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);
  const selectedDocId = docId || currentDocId;

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== selectedDocId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, selectedDocId]);

  if (relDoc.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Related Specialists</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore other qualified professionals in the same field of expertise.
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
            className="premium-panel rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="relative h-48 bg-teal-50">
              <img
                src={resolveImageUrl(item.image, backendurl)}
                alt={`Dr. ${item.name}, ${item.speciality}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                <span className="text-sm font-medium text-slate-600">
                  {item.available ? "Available Now" : "Currently Unavailable"}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-1">{item.name}</h3>
              <p className="text-slate-600 text-sm mb-3">{item.speciality}</p>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">
                  {Number(item.totalReviews || 0) > 0
                    ? Number(item.averageRating || 0).toFixed(1)
                    : "New"}
                </span>
                <span className="mx-1">|</span>
                <span>{Number(item.totalReviews || 0)} reviews</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {relDoc.length > 4 && (
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/doctors")}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            View All Doctors
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedDoctors;
