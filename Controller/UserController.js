const Home = (req, res, next) => {
  console.log("welcome to home page Himvedaa");
  return res.send("welcome to Himvedaa");
};

const Register = async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;

//   here All fields required Checking.
  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Every field is required to register",
    });
  }

//   const 
};

export { Home };
