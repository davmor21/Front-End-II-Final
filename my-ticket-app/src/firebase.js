// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCPsTEeJeb60z9AUWZ8AHeeZ23ZyfUEeRI",
  authDomain: "front-end-ii-firebase.firebaseapp.com",
  projectId: "front-end-ii-firebase",
  storageBucket: "front-end-ii-firebase.firebasestorage.app",
  messagingSenderId: "213793119145",
  appId: "1:213793119145:web:d9a31a866b468f231d82b8",
  measurementId: "G-TEZW3K6MKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};