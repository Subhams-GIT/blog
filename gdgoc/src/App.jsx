import React from "react";
import { Route } from "react-router-dom";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import PrivateRoute from "./components/authentication/PrivateRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";

// Home routes
import Dashboard from "./components/home/Dashboard";
import WriteArticle from "./components/home/WriteArticle";
import MyArticles from "./components/home/MyArticles";
import ViewArticle from "./components/home/ViewArticle";
import EditArticle from "./components/home/EditArticle";
import SuggestedArticles from "./components/home/RecentArticles";
import { AuthProvider } from "./contexts/AuthContext";
import { FirebaseProvider } from "./contexts/FirebaseContext";

import { BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <AuthProvider>
        <FirebaseProvider>
          <Routes>
            {/* Home routes */}
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/suggested-articles" element={<SuggestedArticles />} />
            <Route exact path="/write" element={
              <PrivateRoute>
                <WriteArticle />
              </PrivateRoute>
            } />

            <Route exact path="/my-articles" element={
              <PrivateRoute>
                <MyArticles />
              </PrivateRoute>
            } />
            <Route exact path="/article/:articleID" element={
              <PrivateRoute>
                <ViewArticle />
              </PrivateRoute>
            } />

            <Route exact path="/edit-article/:articleID" element={
              <PrivateRoute>
                <EditArticle />
              </PrivateRoute>
            } />

            {/* Authentication routes */}
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </FirebaseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
