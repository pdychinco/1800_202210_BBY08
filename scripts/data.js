function read_display_Recommendation() {
  //console.log("inside the function")

  //get into the right collection
  db.collection("recommendations").doc("japanese")
    .onSnapshot(function (japaneseDoc) {
      //console.log(tuesdayDoc.data());
      document.getElementById("recommendation-goes-here").innerHTML = japaneseDoc.data().name;
    })
}
read_display_Recommendation();

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

function writeRestaurants() {
  var restaurantRef = db.collection("restaurants");

  restaurantRef.add({
    rest_ID: "RS01",
    name: "Suika",
    city: "Vancouver",
    details: "Japanese Izakaya restaurant in Vancouver, BC.",
    address: "1626 W Broadway, Vancouver, BC V6J 1X6",
    telephone: "604-730-1678",
    email: "info@suika-snackbar.com",
    rating: 5,
    lastupdate: firebase.firestore.FieldValue.serverTimestamp()
  });

  restaurantRef.add({
    rest_ID: "RS02",
    name: "Kook Korean BBQ",
    details: "Korean BBQ restaurant in Vancouver, BC.",
    address: "2800 E1st Ave #211A Vancouver, BC V5M 4N8",
    telephone: "604-566-5665",
    email: "info@kookbbq.ca",
    price: 3,
    rating: 5,
    lastupdate: firebase.firestore.FieldValue.serverTimestamp()
  });

  restaurantRef.add({
    rest_ID: "RS03",
    name: "Medina Cafe",
    details: "Mediterranean Brunch Cafe in Vancouver, BC.",
    address: "780 Richards St. Vancouver, BC V6B 3A4",
    telephone: "604-879-3114",
    email: "info@medinacafe.com",
    price: 2,
    rating: 5,
    lastupdate: firebase.firestore.FieldValue.serverTimestamp()
  });
}

//writeRestaurants();

function displayRestaurants() {
  let restaurantCardTemplate = document.getElementById("restaurantCardTemplate");
  let restaurantCardGroup = document.getElementById("restaurantCardGroup");
  
  db.collection("restaurants").get()
      .then(allRestaurants => {
          allRestaurants.forEach(doc => {
              var restaurantName = doc.data().name; //gets the name field
              var restaurantID = doc.data().rest_ID; //gets the unique ID field
              var restaurantDetails = doc.data().details;


              let testRestaurantCard = restaurantCardTemplate.content.cloneNode(true);
              testRestaurantCard.querySelector('.card-title').innerHTML = restaurantName;
              testRestaurantCard.querySelector('.card-length').innerHTML = restaurantDetails;
              testRestaurantCard.querySelector('a').onclick = () => setRestaurantData(rest_ID);
              //this is the line added so that it makes the icon clickable and call another function
              testRestaurantCard.querySelector('i').onclick = () => addLikes(restaurantID);
              testRestaurantCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
              restaurantCardGroup.appendChild(testRestaurantCard);
              
          })

      })
}
displayRestaurants();

function addLikes(restID) {  
  console.log("inside");
  const currUserId = firebase.auth().currentUser.uid;
  const userDoc = firebase.firestore().collection("users").doc(currUserId);
  console.log("Adding " + restID + " to your favorites");
  db.collection("restaurants").where("rest_ID", "==", restID)
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
          userDoc.update({
            favorites: firebase.firestore.FieldValue.arrayUnion(restID)
          })
      } else {
          console.log("Query has more than one data")
      }
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
}