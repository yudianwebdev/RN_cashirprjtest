import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAqnJ7NO8HzpF9dIKJ_9s_lxz4dMi8ygAA",
  authDomain: "soplogin-812d6.firebaseapp.com",
  projectId: "soplogin-812d6",
  storageBucket: "soplogin-812d6.appspot.com",
  messagingSenderId: "35038064996",
  appId: "1:35038064996:web:40aa73ac108052e0318a71",
  measurementId: "G-QFZQV22CQ3",
};

const init = initializeApp(firebaseConfig);
export const authfb = init;
export const googleProvider = new GoogleAuthProvider();
