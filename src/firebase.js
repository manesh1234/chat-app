import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC3KjvdIkRauWaoAfqyrnbpJ-KOAym8emo",
  authDomain: "chatapp-748f9.firebaseapp.com",
  projectId: "chatapp-748f9",
  storageBucket: "chatapp-748f9.appspot.com",
  messagingSenderId: "112841924754",
  appId: "1:112841924754:web:40c042305ca1a9e43b064b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);