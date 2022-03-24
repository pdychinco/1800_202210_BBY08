function insertName() {
  // to check if the user is logged in:
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          console.log(user.uid); // let me to know who is the user that logged in to get the UID
          currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
          currentUser.get().then(userDoc => {
              //get the user name
              var user_Name = userDoc.data().name;
              console.log(user_Name);
              $("#name-goes-here").text(user_Name); //jquery
              // document.getElementByID("name-goes-here").innetText=user_Name;
          })
      }

  })
}
insertName();
