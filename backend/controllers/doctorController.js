import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const attachRatingsToDoctors = async (doctors) => {
  if (!doctors?.length) return [];

  const ratingStats = await appointmentModel.aggregate([
    {
      $match: {
        isCompleted: true,
        cancelled: { $ne: true },
        doctorRating: { $gte: 1, $lte: 5 },
      },
    },
    {
      $group: {
        _id: "$docId",
        averageRating: { $avg: "$doctorRating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const statsMap = new Map(
    ratingStats.map((item) => [
      String(item._id),
      {
        averageRating: Number(item.averageRating.toFixed(1)),
        totalReviews: item.totalReviews,
      },
    ])
  );

  return doctors.map((doctor) => {
    const rating = statsMap.get(String(doctor._id));
    return {
      ...doctor,
      averageRating: rating?.averageRating || 0,
      totalReviews: rating?.totalReviews || 0,
    };
  });
};

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

    doctor.available = !doctor.available;
    await doctor.save();

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
    const doctors = await doctorModel
      .find({})
      .select(["-password", "-email"])
      .lean();
    const doctorsWithRatings = await attachRatingsToDoctors(doctors);

    res.json({
      success: true,
      message: "Doctors fetched successfully",
      doctors: doctorsWithRatings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed. Please try again." });
  }
};

const doctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching appointments" });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findByIdAndUpdate(
      appointmentId
    );
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      res.json({ success: true, message: "Appointment completed" });
    } else {
      res.json({ success: false, message: "Invalid appointment" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);

      if (doctorData && doctorData.slots_booked[slotDate]) {
        doctorData.slots_booked[slotDate] = doctorData.slots_booked[
          slotDate
        ].filter((e) => e !== slotTime);
        await doctorModel.findByIdAndUpdate(docId, {
          slots_booked: doctorData.slots_booked,
        });
      }

      res.json({ success: true, message: "Appointment cancelled" });
    } else {
      res.json({ success: false, message: "Invalid appointment" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let totalEarnings = 0;
    const patients = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        totalEarnings += item.amount;
      }
      patients.add(item.userId);
    });

    const dashData = {
      totalEarnings,
      appointments: appointments.length,
      patients: patients.size,
      latestAppointments: [...appointments].reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDoctorData = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID is required" });
    }

    const doctorData = await doctorModel.findById(docId).select("-password");

    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, doctorData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available, about } = req.body;
    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID is required" });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      available,

      about,
    });

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  changeAvailability,
  allDoctorsList,
  loginDoctor,
  doctorAppointments,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  getDoctorData,
  updateDoctorProfile,
};
