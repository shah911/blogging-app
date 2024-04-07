// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-67c97.firebaseapp.com",
  projectId: "blog-67c97",
  storageBucket: "blog-67c97.appspot.com",
  messagingSenderId: "273431407738",
  appId: "1:273431407738:web:093cff4bdbe5a85a1b9fc3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
