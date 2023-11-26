// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5hYE-hAqB4NkI2RepBEEj3tC8p1ZSgHE",
  authDomain: "todo-app-64889.firebaseapp.com",
  projectId: "todo-app-64889",
  storageBucket: "todo-app-64889.appspot.com",
  messagingSenderId: "830607917685",
  appId: "1:830607917685:web:5f6d523a4b262c2cb6ee3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, auth, provider };
