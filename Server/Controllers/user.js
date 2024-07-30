const { UserModel } = require("../Models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { fullName, password, email } = req.body;
    if (!fullName || !password || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      fullName,
      password: hashedPassword,
      email,
    });

    newUser.password = undefined;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const passwordChecking = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordChecking) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "User login successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser,loginUser};
