import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDeVK4Ry0JmrZ2I2WFTDojYUw95CIeNL04",
  authDomain: "dahls-tech.firebaseapp.com",
  databaseURL: "https://dahls-tech.firebaseio.com",
  projectId: "dahls-tech",
  storageBucket: "dahls-tech.appspot.com",
  messagingSenderId: "457693107267",
  appId: "1:457693107267:web:28ed20bdab468f1b14b0f6",
  measurementId: "G-BXJZC60K15",
});

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
