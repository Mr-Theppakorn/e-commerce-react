import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBw7H8f0WBgwlHo2j7JH83Tug4C8cDgk5M",
    authDomain: "fastfood-1b190.firebaseapp.com",
    databaseURL: "https://fastfood-1b190-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fastfood-1b190",
    storageBucket: "fastfood-1b190.appspot.com",
    messagingSenderId: "558204747786",
    appId: "1:558204747786:web:4be4df91ba16e411575ff3",
    measurementId: "G-GYQ6Y3GCKM"
};

firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 