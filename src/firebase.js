// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCarQtkSRapJMOcmSfXqHxm5_8gitA_hns",
  authDomain: "contact-book-6c24e.firebaseapp.com",
  projectId: "contact-book-6c24e",
  storageBucket: "contact-book-6c24e.firebasestorage.app",
  messagingSenderId: "1040476569455",
  appId: "1:1040476569455:web:0612378f69942cb10a329a",
  measurementId: "G-KKMFYNBFWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
