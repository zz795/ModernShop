import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0jPOdeRlPnUEn5DtHzdZ78xNV3lka_wo",
  authDomain: "modernshop-e1f37.firebaseapp.com",
  projectId: "modernshop-e1f37",
  storageBucket: "modernshop-e1f37.appspot.com",
  messagingSenderId: "743391068924",
  appId: "1:743391068924:web:4055251d541173c6488d79",
};

// init Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);

export { projectFirestore, projectAuth };
