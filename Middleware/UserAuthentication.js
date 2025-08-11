import jwt from "jsonwebtoken";
import User from "../DBSchema/UserSchema.js";

const UserAuthentication = async (req, res, next) => {
  try {
    const { tokennn } = req.cookies;

    console.log(tokennn)

    if (!tokennn) {
      return res.status(401).json({
        success: false,
        message: "PLease Login sir",
      });
    }

    // Verify token
    const decoded = jwt.verify(tokennn, "Vijay@123");
    console.log(decoded)

    // Find user by decoded ID
    const user = await User.findById(decoded.id); // Use decoded.id not _id if that's what you stored

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or user not found",
      });
    }

    // Attach user to request so next() has access
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token is expired or invalid",
    });
  }
};

export default UserAuthentication;
