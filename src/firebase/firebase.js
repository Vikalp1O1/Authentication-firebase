// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU8Fm0gO60WiVtIzWFUr6j11C7IVkR8IY",
  authDomain: "authentication-7b516.firebaseapp.com",
  projectId: "authentication-7b516",
  storageBucket: "authentication-7b516.firebasestorage.app",
  messagingSenderId: "974000652620",
  appId: "1:974000652620:web:f7e2d869e2134900cb8fe9",
  measurementId: "G-T0R7XF1R98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };