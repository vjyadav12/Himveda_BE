
import User from '../DBSchema/UserSchema.js'

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

    const user = await User.create({
      name,email,phoneNumber,password
    })

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User Registration fail"
      })
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


export { Home,Register };
