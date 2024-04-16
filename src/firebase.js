// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA4Ewx-LQm1JSYhasy9_bm_xcGw26y5fTw',
  authDomain: 'photo-social-app-26ca4.firebaseapp.com',
  projectId: 'photo-social-app-26ca4',
  storageBucket: 'photo-social-app-26ca4.appspot.com',
  messagingSenderId: '881584823816',
  appId: '1:881584823816:web:062373102c41bbebb5fbbd',
  measurementId: 'G-PYN33W3VM8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
