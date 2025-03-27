// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADu0RsPXDza1IOYq2kuSrB2WqH7zW-HRQ",
    authDomain: "stockseer-eb4a6.firebaseapp.com",
    projectId: "stockseer-eb4a6",
    storageBucket: "stockseer-eb4a6.appspot.com",
    messagingSenderId: "891162257416",
    appId: "1:891162257416:web:6e16604262d7fce0f109bd"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
