import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 Characters",
      });
    }

    //check if email valid regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedFullName = fullName.trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: normalizedFullName,
      email: normalizedEmail,
      password: hashedPassword,
    });
    
    if (newUser) {
      generateToken(newUser._id, res);
      const savedUser = await newUser.save();

      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });

      try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
      } catch (error) {
        console.error("Error sending welcome email:", error);
      }
    }

    else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in Signup Controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
