import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA4VqFO6AnIr7B8t3blZ29laIucbDIUseA",
    authDomain: "app-performance-7655d.firebaseapp.com",
    projectId: "app-performance-7655d",
    storageBucket: "app-performance-7655d.firebasestorage.app",
    messagingSenderId: "717357066708",
    appId: "1:717357066708:web:21555c2e75f162e2910e41",
    measurementId: "G-BPWK37XE8H"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
