import User from "../DBSchema/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Home = (req, res, next) => {
  console.log("welcome to home page Himvedaa");
  return res.send("welcome to Himvedaa");
};

const Register = async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;

  // Basic validation (outside try-catch)
  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Every field is required to register",
    });
  }

  try {
    // Example database logic (you should replace this with your actual DB operations)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // here we are hashing the password okay.
    const HashPassword = await bcrypt.hash(password, 12);

    // console.log("hash",HashPassword)

    // here we are insert the haspassword to password.
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: HashPassword,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Registration fail",
      });
    }

    // Continue with user creation, hashing, etc.
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Input validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // 2. Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Compare password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Both email and password is incorrect",
      });
    }

    // 4. Create token
    const token = jwt.sign({ id: user._id }, "Vijay@123", { expiresIn: "7d" });

    // Debug log for token
    console.log("Here is your token (cookie value):", token);

    // 5. Send token in cookie
    res.cookie("tokennn", token, {
      httpOnly: true,
      secure: false, // true if using HTTPS
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    user.password = undefined;

    // 6. Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// user Profile
const Profile = async (req, res) => {
  try {
    const user = req.user; // ✅ comes from middleware

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please login first",
      });
    }

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User profile",
      user,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: `Fail to fetch the profile data: ${e.message}`,
    });
  }
};


const LogOut = async (req, res, next) => {
  console.log("Welcome brother in Logout page ");

  res.cookie("tokennn", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged Out successfully",
  });
};

export { Home, Register, loginUser, Profile, LogOut }; 
