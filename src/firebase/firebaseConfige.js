// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZTAWnACiqx2x6MI0ozINgVqI5KcfNPxc",
  authDomain: "second-email-password-au-45c7d.firebaseapp.com",
  projectId: "second-email-password-au-45c7d",
  storageBucket: "second-email-password-au-45c7d.firebasestorage.app",
  messagingSenderId: "4674893609",
  appId: "1:4674893609:web:cc2eaf8b505868dc47e938"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);