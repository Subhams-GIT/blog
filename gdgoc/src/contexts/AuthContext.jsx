import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import Loading from "../components/layout/Loading";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  };

  const githubSignIn = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    return auth.signInWithPopup(provider);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleSignIn,
    githubSignIn,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loading />}
    </AuthContext.Provider>
  );
};
