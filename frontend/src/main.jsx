// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from '../context/UserContext.jsx';
import { PostContextProvider } from '../context/PostContext.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <PostContextProvider>
      <App />
      </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);