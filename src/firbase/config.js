// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpn_XlstiI5fusrihERk26OYdA54PpahY",
  authDomain: "c4a-project-f7876.firebaseapp.com",
  projectId: "c4a-project-f7876",
  storageBucket: "c4a-project-f7876.appspot.com",
  messagingSenderId: "416219185520",
  appId: "1:416219185520:web:ca154c545162e5cdafcfb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export   const db = getFirestore(app);