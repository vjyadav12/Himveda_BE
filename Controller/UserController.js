
import User from '../DBSchema/UserSchema.js'
import bcrypt from 'bcrypt'

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
    const HashPassword = await bcrypt.hash(password,12) 

    // console.log("hash",HashPassword)

    // here we are insert the haspassword to password.
    const user = await User.create({
      name,email,phoneNumber,password:HashPassword
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

// const Login = async(req,res,next)=>{
//   const{email,password}= req.body;

//   // if both the fields is not coming.
//   if(!email || !password){
//     return res.status(400).json({
//       success:"false",
//       message:"Both Email and password is required to login"
//     })
//   }

//   // 
// }
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

    // 3. Compare plain passwords
    // if (user.password !== password) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid password",
    //   });
    // }

    if(!(await bcrypt.compare(password,user.password))){
      return res.status(400).json({
        success:false,
        message:"Both email and password is incorrect"
      })
    }

    user.password = undefined;

    // 4. Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};


export { Home,Register,loginUser };
