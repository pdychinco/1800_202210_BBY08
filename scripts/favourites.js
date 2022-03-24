var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        read_display_Recommendation();
        insertName();
        populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function read_display_Recommendation() {
    db.collection("recommendations").doc("korean")
        .onSnapshot(function (koreanDoc) {
            document.getElementById("recommendation-goes-here").innerHTML = koreanDoc.data().name;
        })
}


// Insert name function using the global variable "currentUser"
function insertName() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
    })
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
      getFav(user)
  } else {
      console.log("No user is signed in");
  }
});


function getFav(user) {
  db.collection("users").doc(user.uid).get()
      .then(userDoc => {
          var favourites = userDoc.data().favourites;
          console.log(favourites);

          let CardTemplate = document.getElementById("CardTemplate");
          favourites.forEach(thisRestaurantID => {
              console.log(thisRestaurantID);
              db.collection("restaurants").where("id", "==", thisRestaurantID).get().then(snap => {
                  size = snap.size;
                  queryData = snap.docs;
                  
                  if (size == 1) {
                      var doc = queryData[0].data();
                      var restaurantName = doc.name; //gets the name field
                      var restaurantID = doc.id; //gets the unique ID field
                      var restaurantDetails = doc.details; //gets the length field
                      var restaurantAddress = doc.address;
                      let newCard = CardTemplate.content.cloneNode(true);
                      newCard.querySelector('.card-title').innerHTML = restaurantName;
                      newCard.querySelector('.card-length').innerHTML = restaurantDetails;
                      newCard.querySelector('.card-text').innerHTML = restaurantAddress;
                      newCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);
                      newCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                      restaurantCardGroup.appendChild(newCard);
                  } else {
                      console.log("Query has more than one data")
                  }

              })

          });
      })
}