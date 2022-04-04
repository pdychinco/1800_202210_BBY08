var currentUser

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // Do something for the user here. 
    } else {
        // No user is signed in.
    }
});

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
    userEmail = document.getElementById('emailInput').value; //get the value of the field with id="emailInput"
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

function showUploadedPicture() {
    const fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        var blob = URL.createObjectURL(e.target.files[0]);

        //change the DOM img element source to point to this file
        image.src = blob; //assign the "src" property of the "img" tag
    })
}
showUploadedPicture();

function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("mypic-input"); // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob; // display this image

            //store using this name
            var storageRef = firebase.storage().ref("images/" + user.uid + ".jpg");

            //upload the picked file
            storageRef.put(file)
                .then(function () {
                    console.log('Uploaded to Cloud Storage.');
                    //get the URL of stored file
                    storageRef.getDownloadURL()
                        .then(function (url) { // Get URL of the uploaded file
                            console.log(url); // Save the URL into users collection
                            db.collection("users").doc(user.uid).update({
                                    "profilePic": url
                                })
                                .then(function () {
                                    console.log('Added Profile Pic URL to Firestore.');
                                })
                        })
                })

        })
    })
}
uploadUserProfilePic();

function displayUserProfilePic() {
    console.log("DISPLAYING PIC");
    firebase.auth().onAuthStateChanged(function (user) { //get user object
        db.collection("users").doc(user.uid) //use user's uid
            .get() //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().profilePic; //extract pic url

                // use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")

                // use this line if "mypic-goes-here" is an "img" 
                $("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();