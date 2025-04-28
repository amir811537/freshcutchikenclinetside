// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaxMEcJz7RBJ91I8wx3vraibDS3o7K8pA",
  authDomain: "electronics-bazaar-auth.firebaseapp.com",
  projectId: "electronics-bazaar-auth",
  storageBucket: "electronics-bazaar-auth.appspot.com",
  messagingSenderId: "543067499985",
  appId: "1:543067499985:web:b343dc0d879a1232b644f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // optional
const storage = getStorage(app);     // Initialize storage once, using the app
const auth = getAuth(app);

// Named exports
export { app, auth, storage };

// Optionally, you can still have a default export (for `auth` or any other object):
export default auth;