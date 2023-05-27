import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjCVdEE-IzqOyXX720t44YwtulJacazJM",
  authDomain: "auth-25112.firebaseapp.com",
  projectId: "auth-25112",
  storageBucket: "auth-25112.appspot.com",
  messagingSenderId: "453064694347",
  appId: "1:453064694347:web:467ec1c74807353f448bce",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const singInWithGoogle = (onSuccess) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);

      onSuccess();
    })
    .catch((error) => {
      console.log(error);
    });
};
