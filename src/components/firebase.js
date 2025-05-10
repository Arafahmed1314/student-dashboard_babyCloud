// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZij3fOwHGSrem705PRv9l1hGdavOJkxs",
    authDomain: "student-dashboard-49fc5.firebaseapp.com",
    projectId: "student-dashboard-49fc5",
    storageBucket: "student-dashboard-49fc5.firebasestorage.app",
    messagingSenderId: "684688082181",
    appId: "1:684688082181:web:4661808ce558f4a323236c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;