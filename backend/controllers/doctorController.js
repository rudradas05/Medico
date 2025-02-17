import doctorModel from "../models/doctorModel.js";

// const changeAvailability = async (req, res) => {
//   try {
//     const { docId } = req.body;
//     const docData = await doctorModel.findById(docId);
//     await doctorModel.findByIdAndUpdate(docId, {
//       available: !docData.available,
//     });
//     res.json({ success: true, message: "Availability changed" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }

// const changeAvailability = async (req, res) => {
//   try {
//     const { docId } = req.body;

//     if (!docId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Doctor ID is required" });
//     }

//     const docData = await doctorModel.findById(docId);
//     if (!docData) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Doctor not found" });
//     }

//     // Update availability
//     docData.available = !docData.available;
//     await docData.save();

//     res.json({
//       success: true,
//       message: "Availability changed successfully",
//       doctor: docData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID is required" });
    }

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Toggle the 'available' field
    doctor.available = !doctor.available;
    await doctor.save(); // Save the updated doctor document

    res.json({
      success: true,
      message: "Availability updated successfully",
      doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const allDoctorsList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({
      success: true,
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    console.error(error);
  }
};
export { changeAvailability, allDoctorsList };
