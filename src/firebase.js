
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCuqKnvc8-PYUtvJRcAdkfM6D_42aSo0rQ",
  authDomain: "project-chatapp-bc4af.firebaseapp.com",
  projectId: "project-chatapp-bc4af",
  storageBucket: "project-chatapp-bc4af.appspot.com",
  messagingSenderId: "644860655209",
  appId: "1:644860655209:web:266148361e0e7bf28114f8",
  measurementId: "G-4GYFN0LPHW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
