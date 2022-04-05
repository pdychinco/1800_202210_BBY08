var currentUser;
var state = true;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        // console.log(currentUser);

        // the following functions are always called when someone is logged in
        insertName();
        populateCardsDynamically7();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
    }
});

// Insert name function using the global variable "currentUser"
function insertName() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        // console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
    })
}

function spinImage() {
    console.log("running spin image");
    document.getElementById("roulette").classList.add("animate");
    setTimeout(redirect, 2100);
}

function redirect() {
    location.href = "../../rouletteresult.html";
}
