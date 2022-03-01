//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyD80tS_NCx8UlpLYtVIIzn_bzAZOJDpkb0",
  authDomain: "bby08---1800.firebaseapp.com",
  projectId: "bby08---1800",
  storageBucket: "bby08---1800.appspot.com",
  messagingSenderId: "440589533137",
  appId: "1:440589533137:web:f7f91c2fed0b2960ceeaf0",
  measurementId: "G-XP6CSYX86F"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();