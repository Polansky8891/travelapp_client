import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAXPImWCoc5kaxtMqbpYgyiWuqKhEwz7h8",
    authDomain: "mytinerary-6c5ec.firebaseapp.com",
    projectId: "mytinerary-6c5ec",
    storageBucket: "mytinerary-6c5ec.firebasestorage.app",
    messagingSenderId: "618421872653",
    appId: "1:618421872653:web:4aba6f3b242a93ed384d44"
  };

  export const firebase = initializeApp(firebaseConfig);
  export const auth = getAuth(firebase);
  const app = initializeApp(firebaseConfig);

  export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };

  export const firebaseSignOut = () => signOut(getAuth(firebase));