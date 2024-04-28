// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_Firebase_apiKey,
  authDomain: process.env.NEXT_PUBLIC_Firebase_authDomain,
  projectId: process.env.NEXT_PUBLIC_Firebase_projectId,
  storageBucket: process.env.NEXT_PUBLIC_Firebase_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_Firebase_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_Firebase_appId,
  measurementId: process.env.NEXT_PUBLIC_Firebase_measurementId,
};

// Initialize Firebase
const firebasedb = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebasedb);

export default firebasedb;
