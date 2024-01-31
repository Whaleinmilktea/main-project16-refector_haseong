// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const metaEnv = import.meta.env

const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY,
  authDomain: metaEnv.VITE_AUTH_DOMAIN,
  projectId: "edusync-refector",
  storageBucket: metaEnv.VITE_STORAGE_BUCKET,
  messagingSenderId: metaEnv.VITE_MESSAGING_SENDER_ID,
  appId: metaEnv.VITE_APP_ID,
  measurementId: metaEnv.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // 초기화 코드
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()