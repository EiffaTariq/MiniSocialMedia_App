import { User } from "../models/userModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import jwt from 'jsonwebtoken';


export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, gender } = req.body;

  const file = req.file;

  if (!name || !email || !password || !gender || !file) {
    return res.status(400).json({
      message: "Please give all values",
    });
  }

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already Exist",
    });

  const fileUrl = getDataUrl(file);

  const hashPassword = await bcrypt.hash(password, 10);

  const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  user = await User.create({
    name,
    email,
    password: hashPassword,
    gender,
    profilePic: {
      id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  generateToken(user._id, res);

  res.status(201).json({
    message: "User Registered",
    user,
  });
});


// export const loginUser = TryCatch(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user)
//     return res.status(400).json({
//       message: "Invalid Credentials",
//     });

//   const comparePassword = await bcrypt.compare(password, user.password);

//   if (!comparePassword)
//     return res.status(400).json({
//       message: "Invalid Credentials",
//     });

//   generateToken(user._id, res);

//   res.json({
//     message: "User Logged in",
//     user,
//   });
// });


// export const loginUser = TryCatch(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user)
//     return res.status(400).json({
//       message: "Invalid Credentials",
//     });

//   const comparePassword = await bcrypt.compare(password, user.password);

//   if (!comparePassword)
//     return res.status(400).json({
//       message: "Invalid Credentials",
//     });

//   // Generate token
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
//     expiresIn: "15d",
//   });

//   // Set cookie too
//   res.cookie("token", token, {
//     maxAge: 15 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: "strict",
//   });

//   res.json({
//     message: "User Logged in",
//     token, 
//     user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     },
//   });
// });

//with express-session

// backend/controllers/authController.js

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     req.session.userId = user._id;

//     return res.status(200).json({
//       message: "Login successful",
//       user: { _id: user._id, email: user.email, username: user.username }
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



//last wala
// export const loginUser = TryCatch(async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  console.log("Gmail is " + req.body.email);
  console.log("Password is " + req.body.password);
  // Sets JWT as a cookie so isAuth works on protected routes
  generateToken(user._id, res);

  res.status(200).json({
    message: "Login successful",
    user,
  });
});


// export const logoutUser = TryCatch((req, res) => {
//   res.cookie("token", "", { maxAge: 0 });

//   res.json({
//     message: "Logged out successfully",
//   });
// });

//with express-session
export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // default session cookie name
    res.json({ message: "Logged out" });
  });
};