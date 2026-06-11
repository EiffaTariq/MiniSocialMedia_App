// import express from 'express';
// import dotenv from 'dotenv';
// import { connectDb } from './database/db.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 7000;


// console.log('PORT from env:', process.env.PORT);

// app.get('/', (req,res)=>{
//     res.send('Server is working');
// });

// connectDb();
// app.listen(PORT, () =>{
//     console.log(`App is running on port ${PORT}`);
   
// });



// import express from 'express';
// import dotenv from 'dotenv';

// import { connectDb } from './database/db.js';
//import cloudinary from 'cloudinary';

// dotenv.config();

// cloudinary.v2.config({
//     cloud_name: process.env.Cloudinary_Cloud_Name,
//     api_key: process.env.Cloudinary_Api,
//     api_secret: process.env.Cloudinary_Secret,
// });




// const app = express();


// //using middleware

// app.use(express.json());
// const PORT = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send('Server is working');
// });

// //importing routes
// import userRoutes from './routes/userRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import postRoutes from './routes/postRoutes.js';

// //using routes

// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/post', postRoutes);


// //dbconnection
// // connectDb()
// //   .then(() => {
// //     app.listen(PORT, () => {
// //       console.log(`App is running on port ${PORT}`);
// //     });
// //   })
// //   .catch((error) => {
// //     console.error('Failed to connect to DB', error);
// //   });


// //deepseek ai 


// // const startServer = async () => {
// //     try {
// //         await connectDb();
// //         console.log('MongoDB connected successfully');
        
// //         app.listen(PORT, '0.0.0.0', () => {
// //             console.log(`App is running on port ${PORT}`);
// //         });
// //     } catch (error) {
// //         console.error('Failed to start server:', error);
// //         process.exit(1);
// //     }
// // };

// // startServer();

// console.log('Mongo URL:', process.env.MONGO_URL);
// connectDb()
//   .then(() => {
//     console.log('DB connected, starting server...');
//     app.listen(PORT, () => {
//       console.log(`✅ Server started on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('❌ DB connection failed completely:', error);
//   });



// index.js

import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { isAuth } from './middleware/isAuth.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';


dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloudinary_Cloud_Name,
    api_key: process.env.Cloudinary_Api,
    api_secret: process.env.Cloudinary_Secret,
});

const app = express();

app.use(express.json());
app.use(cookieParser());



app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
// app.use(cors({
//   origin: 'http://127.0.0.1:5500', // or the URL where your frontend runs
//   credentials: true                // allow cookies to be sent
// }));

app.use(cors({
  origin: [   "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000"],
  credentials: true
}));


app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret", // keep safe in .env
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // ⚠️ true if https
    maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
  }
}));

const PORT = process.env.PORT || 7000;

//body parser for using body parameters
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

console.log('Eiffas server started');
app.get('/', (req, res) => {
  res.send('Server is working');
});


// app.get('api/user/all', isAuth, async (req,res)=>{
//   const users = await User.find();
//   res.json(users);
// });



app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);




connectDb()
  .then(() => {
    console.log('DB connected');
  })
  .catch((error) => {
    console.error('DB connection failed:', error);
  });

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});