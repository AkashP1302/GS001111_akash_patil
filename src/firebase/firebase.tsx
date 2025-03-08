import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "gs001111akashpatil.firebaseapp.com",
  projectId: "gs001111akashpatil",
  storageBucket: "gs001111akashpatil.firebasestorage.app",
  messagingSenderId: "596947863663",
  appId: "1:596947863663:web:6beaa5110c4cd16265259a",
  measurementId: "G-WLVNCM5JY7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
