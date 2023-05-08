import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCok1j3mtVCEHGbhDnuuROW-JEQ3chotNk",
    authDomain: "clone-app-8d4f2.firebaseapp.com",
    projectId: "clone-app-8d4f2",
    storageBucket: "clone-app-8d4f2.appspot.com",
    messagingSenderId: "859277153498",
    appId: "1:859277153498:web:d2377fd07c3627d0e401e3",
    measurementId: "G-EDM94F3KZ7"
  };


  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);
  export const auth = getAuth();
  export const storage = getStorage();
  export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });