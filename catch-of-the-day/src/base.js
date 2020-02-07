import Rebase from "re-base";
import firebase from "firebase";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCdB-dItOACwJZDcm61_lfsiJRTZIWVPr4",
  authDomain: "catch-of-the-day-kbighorse.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-kbighorse.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a default export
export default base;
