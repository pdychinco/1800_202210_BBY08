//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyAEs69O8IIyjH08j9oG5uHVSrMtECRVGXA",
  authDomain: "comp1800-bby08-33ae1.firebaseapp.com",
  projectId: "comp1800-bby08-33ae1",
  storageBucket: "comp1800-bby08-33ae1.appspot.com",
  messagingSenderId: "1055165643126",
  appId: "1:1055165643126:web:6298ce5151d571b328a257"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();