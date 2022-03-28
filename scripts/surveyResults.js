var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

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
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
    })
}


function populateCardsDynamically6(user) {
  let restaurantCardTemplate = document.getElementById("restaurantCardTemplate6");
  let restaurantCardGroup = document.getElementById("restaurantCardGroup6");
  db.collection("users").doc(user.uid).get()
    .then(userDoc => {
      let results = userDoc.data().surveyResult;
      console.log(results);
      console.log("size of results is: " + results.length);
      if(results.length == 0) {
        let testRestaurantCard = restaurantCardTemplate.content.cloneNode(true);
        testRestaurantCard.querySelector('.card-title').innerHTML = "No matches! Try again";
        restaurantCardGroup.appendChild(testRestaurantCard);
      } else if (results.length < 3) {
        results.forEach(thisRestaurantID => {
          console.log(thisRestaurantID);
          db.collection("restaurants").where("id","==", thisRestaurantID).get()
            .then(snap => {
              size = snap.size;
              console.log("size of query is : " + size);
              queryData = snap.docs;
              console.log("query data is: " + queryData[0].data().name);
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

                newCard.querySelector('i').id = 'save-' + restaurantID;
                // this line will call a function to save the hikes to the user's document       
                newCard.querySelector('i').onclick = () => removeFav(restaurantID);
                newCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                restaurantCardGroup.appendChild(newCard);
              } else {
                console.log("Query has more than one data");
              }
            })
        })
      }
      // }else {
        results.orderBy("name").limit(3).forEach(thisRestaurantID => {
          console.log(thisRestaurantID);
          db.collection("restaurants").where("id","==", thisRestaurantID).get()
            .then(snap => {
              size = snap.size;
              console.log("size of query is : " + size);
              queryData = snap.docs;
              console.log("query data is: " + queryData[0].data().name);
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

                newCard.querySelector('i').id = 'save-' + restaurantID;
                // this line will call a function to save the hikes to the user's document       
                newCard.querySelector('i').onclick = () => removeFav(restaurantID);
                newCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                restaurantCardGroup.appendChild(newCard);
              } else {
                console.log("Query has more than one data");
              }
            })
        })
    });
}
populateCardsDynamically6();


function addLikes(restaurantID) {
  db.collection("restaurants").where("id", "==", restaurantID)
      .get()
      .then(queryRestaurant => {
          //see how many results you have got from the query
          size = queryRestaurant.size;
          // get the documents of query
          Restaurants = queryRestaurant.docs;
          if (size = 1) {
              id = Restaurants[0].id;
              console.log(id);
              //update method will add to the specified field in database, if that field does not exist, it will create that.
              db.collection("restaurants").doc(id).update({
                  //Firebase documentation has this method for incrementation.
                  scores: firebase.firestore.FieldValue.increment(1),
              })
              currentUser.set({
                      favourites: firebase.firestore.FieldValue.arrayUnion(restaurantID)
                  }, {
                      merge: true
                  })
                  .then(function () {
                      console.log("restaurant has been favourited for: " + currentUser);
                      var iconID = 'save-' + restaurantID;
                      //console.log(iconID);
                      document.getElementById(iconID).innerText = 'favorite';
                  });
          } else {
              console.log("Query has more than one data")
          }
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
}

function setRestaurantData(id) {
    localStorage.setItem('restaurantID', id);
}