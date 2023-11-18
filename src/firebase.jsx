// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth"
import { getFirestore, doc, setDoc} from "firebase/firestore"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2unV2b7KNhrywMBFcqKXZPfNtO3jf7sA",
  authDomain: "financely-abb6d.firebaseapp.com",
  projectId: "financely-abb6d",
  storageBucket: "financely-abb6d.appspot.com",
  messagingSenderId: "3551513297",
  appId: "1:3551513297:web:f1a1416bbfcee2681813f0",
  measurementId: "G-X88QQZ3TLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export {db,auth,provider,doc,setDoc}
