// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLSZEkgTrCRxU08YLW3YZMPAdwquejJS4",
  authDomain: "desismart-1bc2a.firebaseapp.com",
  databaseURL: "https://desismart-1bc2a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "desismart-1bc2a",
  storageBucket: "desismart-1bc2a.appspot.com",
  messagingSenderId: "442021861305",
  appId: "1:442021861305:web:2a6273f5f9327ca4dc4868",
  measurementId: "G-H4N8FE5NRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);