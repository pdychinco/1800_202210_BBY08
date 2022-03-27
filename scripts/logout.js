//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  console.log("logging out user");
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      window.location.assign("index.html"); 
    }).catch((error) => {
      // An error happened.
    });
}