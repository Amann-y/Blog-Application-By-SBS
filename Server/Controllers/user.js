const { UserModel } = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const registerUser = async (req, res) => {
  try {
    const { fullName, password, email, recaptchaValue } = req.body;
    if (!fullName || !password || !email || !recaptchaValue) {
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

    const output = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`
    );

    if (output.data.success) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
        fullName,
        password: hashedPassword,
        email,
      });

      newUser.password = undefined;

      const token = await jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        newUser,
        token,
        userId: newUser._id,
        userName: newUser.fullName,
        userEmail: newUser.email,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "reCaptcha verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { password, email, recaptchaValue } = req.body;
    if (!password || !email || !recaptchaValue) {
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
      
      const output = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`
      );

      if (output.data.success) {
        const token = await jwt.sign(
          { userId: existingUser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        res.status(200).json({
          success: true,
          message: "User login successfully",
          token,
          userId: existingUser._id,
          userName: existingUser.fullName,
          userEmail: existingUser.email,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "reCaptcha verification failed" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loggedUserController = async (req, res) => {
  try {
    res.status(200).json({ user: req.user, success: true });
  } catch (error) {
    // console.log(error);
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { password, password_confirmation } = req.body;
    if (!password || !password_confirmation) {
      return res.send({ status: "failed", message: "All Fields Are Required" });
    } else {
      if (password === password_confirmation) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: hashedPassword },
        });
        return res.send({
          success: true,
          message: "Password Changed Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Credentials Don't Match",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await UserModel.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loggedUserController,
  changeUserPassword,
  deleteUser,
};
