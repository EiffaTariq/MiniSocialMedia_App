// import jwt from 'jsonwebtoken'
// import { User } from '../models/userModel.js'

// export const isAuth = async(req,res, next)=>{
//     try{
//         const token = req.cookies.token;
//         if(!token)
//         {
//             return res.status(403).json({
//                 message: "Unauthorized"
//             })
//         }
//         const decodedData = jwt.verify(token, process.env.JWT_SEC);

//         if(!decodedData){
//             return res.status(400).json({
//                 message: "Token expired"
//             })
//         }
//         req.user = await User.findById(decodedData.id);


//         next();
//     }
//     catch(error){
//         res.status(500).json({
//             message: "Please login"
//         })
//     }
// };



//with jwt token
// import jwt from "jsonwebtoken";
// import { User } from "../models/userModel.js";

// export const isAuth = async (req, res, next) => {
//   try {
//     // 1️⃣ Try cookie first
//     let token = req.cookies.token;

//     // 2️⃣ If no cookie, try Authorization header
//     if (!token && req.headers.authorization) {
//       if (req.headers.authorization.startsWith("Bearer ")) {
//         token = req.headers.authorization.split(" ")[1];
//       }
//     }

//     if (!token) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     // 3️⃣ Verify token
//     const decodedData = jwt.verify(token, process.env.JWT_SEC);

//     if (!decodedData) {
//       return res.status(400).json({ message: "Token expired" });
//     }

//     // 4️⃣ Attach user to request
//     req.user = await User.findById(decodedData.id);
//     if (!req.user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     res.status(500).json({ message: "Please login" });
//   }
// };


// export const isAuth = async (req, res, next) => {
//   try {
//     let token = req.cookies.token;

//     if (!token && req.headers.authorization?.startsWith("Bearer ")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: No token" });
//     }

//     const decodedData = jwt.verify(token, process.env.JWT_SEC);
//     req.user = await User.findById(decodedData.id);

//     if (!req.user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
//   }
// };


//with express-session

// export const isAuth = async (req, res, next) => {
//   try {
//     const userId = req.cookies.userId;

//     if (!userId) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(500).json({ message: "Please login" });
//   }
// };


//with id based

// import { User } from "../models/userModel.js";

// export const isAuth = async (req, res, next) => {
//   try {
//     // ✅ Get userId from request (body, query, or headers)
//     const userId = req.body.userId || req.query.userId || req.headers["x-user-id"];

//     if (!userId) {
//       return res.status(403).json({ message: "Unauthorized - User ID required" });
//     }

    
//     // ✅ Validate user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ✅ Attach user to request for controllers
//     req.user = user;

//     next();
//   } catch (error) {
//     console.error("isAuth error:", error.message);
//     res.status(500).json({ message: "Please login" });
//   }
// };


// export const isAuth = (req, res, next) => {
//   try {
//     console.log("Incoming body in isAuth:", req.body);

//     // ✅ Make sure req.body exists first
//     if (!req.body || !req.body.userId) {
//       return res.status(401).json({ message: "Unauthorized: userId missing" });
//     }

//     req.userId = req.body.userId;
//     next();
//   } catch (error) {
//     console.error("isAuth error:", error.message);
//     res.status(500).json({ message: "Auth error", error: error.message });
//   }
// };


import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};