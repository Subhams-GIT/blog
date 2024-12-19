import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDf2HpdHPtoI0zN613qv4wUJp7X8WyrBW4",
  authDomain: "gdgsu-oc.firebaseapp.com",
  projectId: "gdgsu-oc",
  storageBucket: "gdgsu-oc.firebasestorage.app",
  messagingSenderId: "192844766746",  
  appId: "1:192844766746:web:1fe000072355791719fba3",
  measurementId: "G-6CJL5XB11X"
});

export const database = firebase.firestore();
export const auth = app.auth();
export default app;
