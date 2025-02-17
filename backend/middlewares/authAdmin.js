import jwt from "jsonwebtoken";

// admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { admintoken } = req.headers;
    if (!admintoken) {
      return res
        .status(401)
        .json({ success: false, message: "No Authorised Login Again" });
    }
    const toekn_decode = jwt.verify(admintoken, process.env.JWT_SECRET);
    if (toekn_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "No Authorised Login Again" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default authAdmin;
