// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAwwoShEtiezXLLi-dX7xPhfleaSKdRQK4",
  authDomain: "lic-help-giving.firebaseapp.com",
  projectId: "lic-help-giving",
  storageBucket: "lic-help-giving.appspot.com",
  messagingSenderId: "560692781496",
  appId: "1:560692781496:web:c1d3c70579b5771aa62f4d",
  measurementId: "G-EF3J8R27GW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)