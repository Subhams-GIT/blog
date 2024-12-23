import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBEiIKrS7Raxv-73DyTjv_7xHkPKCyTKoo",
  authDomain: "gssoc-issue-solve.firebaseapp.com",
  databaseURL: "https://gssoc-issue-solve-default-rtdb.firebaseio.com",
  projectId: "gssoc-issue-solve",
  storageBucket: "gssoc-issue-solve.firebasestorage.app",
  messagingSenderId: "897320160719",
  appId: "1:897320160719:web:7cb31eed6e903af62bd6ba"
});

export const database = firebase.firestore();
export const auth = app.auth();
export default app;
