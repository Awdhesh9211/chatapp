
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "enter your key",
  authDomain: "project-chatapp-bc4af.firebaseapp.com",
  projectId: "project-chatapp-bc4af",
  storageBucket: "project-chatapp-bc4af.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
