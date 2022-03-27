var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userPhone = userDoc.data().phone;
                    var userAddress = userDoc.data().address;
                    var userCity = userDoc.data().city;
                    var userFav = userDoc.data().favourite_cuisine;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userPhone != null) {
                        document.getElementById("phoneInput").value = userPhone;
                    }
                    if (userAddress != null) {
                        document.getElementById("addressInput").value = userAddress;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userFav != null) {
                        document.getElementById("userFav").value = userFav;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
    userEmail = document.getElementById('emailInput').value; //get the value of the field with id="schoolInput"
    userPhone = document.getElementById('phoneInput').value; //get the value of the field with id="phoneInput"
    userAddress = document.getElementById('addressInput').value; //get the value of the field with id="addressInput"
    userCity = document.getElementById('cityInput').value; //get the value of the field with id="cityInput"
    userFav = document.getElementById('userFav').value;
  
    currentUser.update({
        name: userName,
        email: userEmail,
        phone: userPhone,
        address: userAddress,
        city: userCity,
        favourite_cuisine: userFav
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
  
    document.getElementById('personalInfoFields').disabled = true;
  
  }