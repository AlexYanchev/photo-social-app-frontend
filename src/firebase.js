// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.REACT_APP_FIREBASE_APP_ID),
  measurementId: String(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID),
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const authUser = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider(authUser);

export { db, authUser, storage, createUserWithEmailAndPassword };
