import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeL6CRJMcW1GWmSak8nyqgddi6KTi6inc",
  authDomain: "campus-share-project.firebaseapp.com",
  projectId: "campus-share-project",
  storageBucket: "campus-share-project.firebasestorage.app",
  messagingSenderId: "837773325785",
  appId: "1:837773325785:web:0d019488262335746655c8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;