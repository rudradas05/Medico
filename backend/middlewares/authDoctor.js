import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { doctortoken } = req.headers;
    if (!doctortoken) {
      return res
        .status(401)
        .json({ success: false, message: "No Authorised Login Again" });
    }
    const toekn_decode = jwt.verify(doctortoken, process.env.JWT_SECRET);
    req.body.docId = toekn_decode.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default authDoctor;
