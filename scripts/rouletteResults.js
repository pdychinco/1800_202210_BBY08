var currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        // console.log(currentUser);

        // the following functions are always called when someone is logged in
        insertName();
        populateCardsDynamically6(user);
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        // window.location.href = "login.html";
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


function setRestaurantData(id) {
  localStorage.setItem('restaurantID', id);
}


function populateCardsDynamically6(user) {
  // let limit = db.collection("restaurants").length;
  let limit = Math.floor(Math.random() * 8)
  let restaurantCardTemplate = document.getElementById("restaurantCardTemplate6");
  let restaurantCardGroup = document.getElementById("restaurantCardGroup6");
  let rouletteResult = db.collection("restaurants").where("id", "==", "RS0" + limit );

  rouletteResult.get()
    .then(doc => {
      // print out timestamp and array of ids
      console.log(doc.docs[0].data());
      let queryData = doc.docs[0].data()
        db.collection("restaurants").where("id","==", queryData.id).get()
        .then(snap => {
          size = snap.size;
          queryData = snap.docs;
          
          if (size == 1) {
            var doc = queryData[0].data();
            var restaurantName = doc.name; //gets the name field
            var restaurantID = doc.id; //gets the unique ID field
            var restaurantDetails = doc.details; //gets the length field
            var restaurantAddress = doc.address;
            let newCard = restaurantCardTemplate.content.cloneNode(true);
            newCard.querySelector('.card-title').innerHTML = restaurantName;
            newCard.querySelector('.card-length').innerHTML = restaurantDetails;
            newCard.querySelector('.card-text').innerHTML = restaurantAddress;
            newCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);
            newCard.querySelector("#getdetails").onclick = () => setRestaurantData(restaurantID);
            newCard.querySelector('i').id = 'save-' + restaurantID;
            // this line will call a function to save the hikes to the user's document             
            newCard.querySelector('i').onclick = () => addFav(restaurantID);
            newCard.querySelector('i').onclick = () => addLikes(restaurantID);
            // newCard.querySelector('i').id = 'save-' + restaurantID;
            // // this line will call a function to save the hikes to the user's document       
            // newCard.querySelector('i').onclick = () => removeFav(restaurantID);
            newCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
            restaurantCardGroup.appendChild(newCard);
          } else {
            console.log("Query has more than one data");
          }
        })
    });
}