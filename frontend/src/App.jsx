// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React from "react";
import AddPost from "../components/AddPost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserData } from "../context/UserContext";
import Account from "../pages/Account";
import NavigationBar from "../components/NavigationBar";
import NotFound from "../components/NotFound";
import Reels from "../pages/Reels";
import { Loading } from "../components/Loading";
import UserAccount from "../pages/UserAccount";
import Search from "../pages/Search";

const App = () => {
  const { loading, isAuth, user } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
          <Route path="/addpost" element={isAuth ? <AddPost /> : <Login />} />
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/reels" element={isAuth ? <Reels /> : <Login />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route
              path="/user/:id"
              element={isAuth ? <UserAccount user={user} /> : <Login />}
            />
            <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
            <Route
              path="/register"
              element={!isAuth ? <Register /> : <Home />}
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/register"
              element={!isAuth ? <Register /> : <Home />}
            />
            <Route path="/search" element={isAuth ? <Search /> : <Login />} />
            
          </Routes>
          {isAuth && <NavigationBar />}
        </BrowserRouter>
      )}
    </>
  );
};

export default App;