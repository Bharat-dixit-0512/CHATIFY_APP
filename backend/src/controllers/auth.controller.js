import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";


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
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL,
        );
      } catch (error) {
        console.error("Error sending welcome email:", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in Signup Controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in Login Controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (_, res) => {
  // res.clearCookie("jwt", {
  //   httpOnly: true,
  //   sameSite: "strict",
  //   secure: process.env.NODE_ENV !== "development",
  // });
  res.cookie("jwt","",{maxAge:0});
  res.status(200).json({
    message: "Logged out successfully",
  });
};

export const updateProfile=async(req,res)=>{
  try {
    const {profilePic} =req.body
    if(!profilePic)return res.status(400).json({
      message:"Profile pic is required"
    })

    const userId=req.user._id

    const uploadResponse=await cloudinary.uploader.upload(profilePic)

    const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("Error in update profile:",error);
    res.status(500).json({
      message:"Internal server error"
    });
  }
}

export const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};
