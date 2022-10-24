import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeknKO49AzjBwfZ6gEcScOYSf_fFufUMQ",
  authDomain: "reservation-toyproject.firebaseapp.com",
  projectId: "reservation-toyproject",
  storageBucket: "reservation-toyproject.appspot.com",
  messagingSenderId: "932163105100",
  appId: "1:932163105100:web:a9e9c0634ea6706ae11fe9",
  measurementId: "G-TVML444L4D",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
