import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./context/UserContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./commons/PrivateRoute";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/signup" Component={SignUp} />
          <Route path="/login" Component={Login} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </UserProvider>
  );
};

export default App;
