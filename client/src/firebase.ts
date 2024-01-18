// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBy5YncCV6kHfbvTudcbn6TrCPIz7Q2M7A",
  authDomain: "edusync-refector.firebaseapp.com",
  projectId: "edusync-refector",
  storageBucket: "edusync-refector.appspot.com",
  messagingSenderId: "860527999064",
  appId: "1:860527999064:web:6d930ab20d53019197b22d",
  measurementId: "G-66KMX0V3M9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig); // 초기화 코드

export const db = getFirestore(app)
const analytics = getAnalytics(app);