# Mini Social Media App

## Overview

Mini Social Media App is a backend-focused social networking application built using the MERN stack. The project demonstrates the implementation of core social media functionalities such as user authentication, profile management, post creation, likes, comments, user connections, and media uploads.

The primary objective of this project was to strengthen backend development skills by designing RESTful APIs, implementing authentication and authorization, managing user relationships, handling media uploads, and integrating MongoDB for persistent data storage.

---

## Features

### User Management

* User registration and login
* Secure password storage using bcrypt hashing
* User profile management
* Profile picture upload support
* View user profiles
* Update profile information
* Change account password

### Social Features

* Follow and unfollow users
* Followers and following system
* User timeline generation
* View posts created by users

### Post Management

* Create posts
* Upload media with posts
* Edit post captions
* Delete posts
* Like and unlike posts
* Comment on posts
* Delete comments

### Media Handling

* Image upload support
* Cloudinary integration for media storage
* Multer middleware for file handling

---

## Authentication & Authorization

### Authentication

The application authenticates users during login and maintains user identity through protected backend routes.

Authentication flow:

1. User registers an account.
2. Password is hashed using bcrypt before being stored.
3. User logs in with valid credentials.
4. The server establishes an authenticated session.
5. Protected routes verify the authenticated user before granting access.

### Authorization

Protected routes ensure that only authenticated users can:

* Create posts
* Delete posts
* Edit post content
* Like posts
* Comment on posts
* Follow or unfollow users
* Update their profiles

The authentication middleware validates requests before allowing access to secured resources.

---

## Security Features

### Password Hashing

Passwords are never stored in plain text. User passwords are hashed using bcrypt before being saved to the database.

### Protected Routes

Sensitive operations require authentication before access is granted.

### Secure File Upload Handling

Media uploads are processed through Multer middleware and stored using Cloudinary.

### Environment Variables

Sensitive configuration values such as:

* Database connection strings
* Cloudinary credentials
* Authentication secrets

are stored using environment variables.

---

## Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt
* Cloudinary
* Multer
* Express Session
* Cookie Parser

### Frontend

* React
* React Router
* React Bootstrap

### Development Tools

* Nodemon
* VS Code
* Git & GitHub

---

## Database Models

### User Model

Stores:

* Name
* Email
* Password
* Gender
* Profile Picture
* Followers
* Following
* User Posts

### Post Model

Stores:

* Caption
* Uploaded Media
* Post Type
* Owner
* Likes
* Comments
* Creation Date

---

## API Modules

### Authentication API

* Register User
* Login User
* Logout User

### User API

* Get Current User
* Get User Profile
* Update Profile
* Update Password
* Follow/Unfollow User
* Get All Users

### Post API

* Create Post
* Edit Caption
* Delete Post
* Like/Unlike Post
* Comment on Post
* Delete Comment
* Get Timeline Posts

---

## Installation Guide

### Prerequisites

Install the following software:

* Node.js
* MongoDB
* Git

Create a Cloudinary account for media uploads.

---

### Clone Repository

```bash
git clone <repository-url>
cd SocialMediaApp
```

---

### Install Dependencies

```bash
npm install
```

Frontend:

```bash
cd frontend
npm install
```

---

### Environment Variables

Create a `.env` file in the project root and configure:

```env
MONGO_URL=your_mongodb_connection_string

JWT_SEC=your_secret_key

Cloudinary_Cloud_Name=your_cloud_name
Cloudinary_Api=your_api_key
Cloudinary_Secret=your_api_secret

PORT=5000
```

---

### Run Backend

```bash
npm run dev
```

or

```bash
npm start
```

---

### Run Frontend

```bash
cd frontend
npm run dev
```

---

## User Manual

### Register

1. Open the application.
2. Create a new account.
3. Upload a profile picture.
4. Complete registration.

### Login

1. Enter email and password.
2. Access your account dashboard.

### Create a Post

1. Select media.
2. Add a caption.
3. Publish the post.

### Interact with Posts

* Like posts
* Comment on posts
* Delete your comments when applicable

### Connect with Users

* Search for users
* View profiles
* Follow or unfollow users

### Manage Account

* Update profile information
* Change profile picture
* Update password

---

## Project Notes

This project is primarily backend-focused and was developed to demonstrate backend architecture, API development, authentication, authorization, database design, and cloud media integration.

The backend functionality is the main focus of the project, while some frontend components were created primarily to support API testing and demonstrate feature integration.

---

## Future Improvements

* Real-time notifications
* Real-time messaging
* Role-based authorization
* Improved frontend UI/UX
* Infinite scrolling feed
* Story/Reels enhancements
* Deployment support

---

## Author

**Eiffa Tariq**

Software Engineering Graduate | MERN Stack Developer | ASP.NET Developer
