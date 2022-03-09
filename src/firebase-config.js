import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-Qbn49fvGtG8spENtyU1JPRTYzLxPAOw",
    authDomain: "react-seating-chart.firebaseapp.com",
    projectId: "react-seating-chart",
    storageBucket: "react-seating-chart.appspot.com",
    messagingSenderId: "624547233732",
    appId: "1:624547233732:web:d814775067ac3e34a7ae91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
