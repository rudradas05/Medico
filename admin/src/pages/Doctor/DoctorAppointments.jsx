import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { BiXCircle, BiCheckCircle } from "react-icons/bi";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

const DoctorAppointments = () => {
  const {
    doctortoken,
    appointments,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
    savePrescription,
  } = useContext(DoctorContext);

  const { calculateAge, formatAppointmentDate, currencySymbol } =
    useContext(AppContext);

  const [loadingAction, setLoadingAction] = useState(null);
  const [savingPrescription, setSavingPrescription] = useState(false);
  const [prescriptionModal, setPrescriptionModal] = useState({
    open: false,
    appointment: null,
  });
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState([]);

  const createEmptyMedicine = () => ({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  useEffect(() => {
    if (doctortoken) {
      getDoctorAppointments();
    }
  }, [doctortoken]);

  const handleAction = async (action, id) => {
    setLoadingAction(id);
    try {
      if (action === "complete") {
        await completeAppointment(id);
      } else {
        await cancelAppointment(id);
      }
      getDoctorAppointments();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingAction(null);
    }
  };

  const openPrescriptionModal = (appointment) => {
    const currentPrescription = appointment.prescription || {};

    setPrescriptionModal({ open: true, appointment });
    setDiagnosis(currentPrescription.diagnosis || "");
    setNotes(currentPrescription.notes || "");

    if (
      Array.isArray(currentPrescription.medicines) &&
      currentPrescription.medicines.length > 0
    ) {
      setMedicines(
        currentPrescription.medicines.map((medicine) => ({
          name: medicine.name || "",
          dosage: medicine.dosage || "",
          frequency: medicine.frequency || "",
          duration: medicine.duration || "",
          instructions: medicine.instructions || "",
        })),
      );
    } else {
      setMedicines([createEmptyMedicine()]);
    }
  };

  const closePrescriptionModal = () => {
    if (savingPrescription) return;
    setPrescriptionModal({ open: false, appointment: null });
    setDiagnosis("");
    setNotes("");
    setMedicines([]);
  };

  const updateMedicine = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addMedicineRow = () => {
    setMedicines((prev) => [...prev, createEmptyMedicine()]);
  };

  const removeMedicineRow = (index) => {
    setMedicines((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, itemIndex) => itemIndex !== index);
    });
  };

  const handleSavePrescription = async () => {
    const appointmentId = prescriptionModal.appointment?._id;
    if (!appointmentId) return;

    const normalizedMedicines = medicines
      .map((item) => ({
        name: item.name.trim(),
        dosage: item.dosage.trim(),
        frequency: item.frequency.trim(),
        duration: item.duration.trim(),
        instructions: item.instructions.trim(),
      }))
      .filter((item) => item.name);

    if (!diagnosis.trim() && !notes.trim() && normalizedMedicines.length === 0) {
      toast.error("Add diagnosis, notes, or at least one medicine.");
      return;
    }

    setSavingPrescription(true);

    const result = await savePrescription({
      appointmentId,
      diagnosis: diagnosis.trim(),
      notes: notes.trim(),
      medicines: normalizedMedicines,
    });

    setSavingPrescription(false);

    if (result?.success) {
      closePrescriptionModal();
    }
  };

  return (
    <div className="w-full max-w-6xl">
      <p className="mb-4 text-lg font-semibold text-slate-800">
        All Appointments
      </p>
      <div className="admin-card max-h-[80vh] min-h-[50vh] overflow-y-scroll rounded-2xl text-sm">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 border-b border-teal-100 bg-teal-50/70 px-4 py-3 font-semibold text-slate-700">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {[...appointments].reverse().map((item, index) => (
          <div
            key={item._id || index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center gap-1 border-b border-slate-100 px-4 py-3"
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="Patient"
                className="h-8 w-8 rounded-full border border-teal-100 object-cover"
                onError={(event) => (event.target.src = "/default_profile.png")}
              />
              <p>{item.userData.name}</p>
            </div>
            <p>{item.payment ? "Online" : "Cash"}</p>
            <p>
              {item.userData?.dob
                ? calculateAge?.(item.userData.dob) || "N/A"
                : "N/A"}
            </p>
            <p>
              {formatAppointmentDate(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currencySymbol}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-500">Cancelled</p>
            ) : item.isCompleted ? (
              <div className="flex flex-col items-start gap-1">
                <p className="text-green-500">Completed</p>
                <button
                  onClick={() => openPrescriptionModal(item)}
                  className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700 transition hover:bg-indigo-200"
                >
                  {item.prescription ? "Edit Rx" : "Add Rx"}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction("cancel", item._id)}
                  className="cursor-pointer text-2xl text-red-500 hover:text-red-700 disabled:opacity-50"
                  title="Cancel Appointment"
                  disabled={loadingAction === item._id}
                >
                  {loadingAction === item._id ? (
                    <ImSpinner2 className="animate-spin" />
                  ) : (
                    <BiXCircle />
                  )}
                </button>
                <button
                  onClick={() => handleAction("complete", item._id)}
                  className="cursor-pointer text-2xl text-emerald-500 hover:text-emerald-700 disabled:opacity-50"
                  title="Complete Appointment"
                  disabled={loadingAction === item._id}
                >
                  {loadingAction === item._id ? (
                    <ImSpinner2 className="animate-spin" />
                  ) : (
                    <BiCheckCircle />
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {prescriptionModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {prescriptionModal.appointment?.prescription
                ? "Edit Prescription"
                : "Add Prescription"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {prescriptionModal.appointment?.userData?.name} |{" "}
              {formatAppointmentDate(prescriptionModal.appointment?.slotDate)},{" "}
              {prescriptionModal.appointment?.slotTime}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Diagnosis
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(event) => setDiagnosis(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
                  placeholder="Primary diagnosis"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100"
                  placeholder="Clinical notes and care plan"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">Medicines</p>
                <button
                  type="button"
                  onClick={addMedicineRow}
                  className="inline-flex items-center gap-1 rounded-md bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-700 transition hover:bg-teal-200"
                >
                  <FiPlus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {medicines.map((medicine, index) => (
                  <div
                    key={`${index}-${medicine.name}`}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Medicine {index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeMedicineRow(index)}
                        className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 transition hover:bg-red-200"
                        disabled={medicines.length === 1}
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <input
                        type="text"
                        value={medicine.name}
                        onChange={(event) =>
                          updateMedicine(index, "name", event.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-teal-100"
                        placeholder="Medicine name"
                      />
                      <input
                        type="text"
                        value={medicine.dosage}
                        onChange={(event) =>
                          updateMedicine(index, "dosage", event.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-teal-100"
                        placeholder="Dosage (e.g. 500mg)"
                      />
                      <input
                        type="text"
                        value={medicine.frequency}
                        onChange={(event) =>
                          updateMedicine(index, "frequency", event.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-teal-100"
                        placeholder="Frequency (e.g. twice daily)"
                      />
                      <input
                        type="text"
                        value={medicine.duration}
                        onChange={(event) =>
                          updateMedicine(index, "duration", event.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-teal-100"
                        placeholder="Duration (e.g. 5 days)"
                      />
                      <input
                        type="text"
                        value={medicine.instructions}
                        onChange={(event) =>
                          updateMedicine(index, "instructions", event.target.value)
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-teal-100 sm:col-span-2"
                        placeholder="Instructions (e.g. after food)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={closePrescriptionModal}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                disabled={savingPrescription}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePrescription}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
                  savingPrescription
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-primary hover:bg-teal-600"
                }`}
                disabled={savingPrescription}
              >
                {savingPrescription ? "Saving..." : "Save Prescription"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
