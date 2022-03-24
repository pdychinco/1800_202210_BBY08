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

function writeRestaurants() {
    //define a variable for the collection you want to create in Firestore to populate data
    var restaurantRef = db.collection("restaurants");

    restaurantRef.add({
        id: "RS01",
        name: "Suika",
        city: "Vancouver",
        details: "Japanese Izakaya restaurant in Vancouver, BC.",
        address: "1626 W Broadway, Vancouver, BC V6J 1X6",
        telephone: "604-730-1678",
        email: "info@suika-snackbar.com",
        price: 4,
        rating: 5,
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
    restaurantRef.add({
        id: "RS02",
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
        id: "RS03",
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

function populateCardsDynamically() {
    let restaurantCardTemplate = document.getElementById("restaurantCardTemplate");
    let restaurantCardGroup = document.getElementById("restaurantCardGroup");

    db.collection("restaurants")
        .orderBy("price") //sort by price and display 3
        .limit(3)
        .get()
        .then(allRestaurants => {
            //gets one doc
            allRestaurants.forEach(doc => {
                var restaurantName = doc.data().name; //gets the name field
                var restaurantID = doc.data().id; //gets the unique ID field
                // var hikeLength = doc.data().length; //gets the length field
                let testRestaurantCard = restaurantCardTemplate.content.cloneNode(true);
                testRestaurantCard.querySelector('.card-title').innerHTML = restaurantName;

                //NEW LINE: update to display length, duration, last updated
                testRestaurantCard.querySelector('.card-length').innerHTML =
                    doc.data().details + "<br>" +
                    "Telephone: " + doc.data().telephone + "<br>" +
                    "Email: " + doc.data().email + "<br>" + 
                    "Rating: " + doc.data().rating + "<br>" + 
                    "Price: " + doc.data().price;

                testRestaurantCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);

                //next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which hike to bookmark based on which hike was clicked
                testRestaurantCard.querySelector('i').id = 'save-' + restaurantID;
                // this line will call a function to save the hikes to the user's document             
                testRestaurantCard.querySelector('i').onclick = () => addFav(restaurantID);
                testRestaurantCard.querySelector('i').onclick = () => addLikes(restaurantID);
                testRestaurantCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                // testRestaurantCard.querySelector('.read-more').href = "eachHike.html?hikeName=" + hikeName + "&id=" + hikeID;
                restaurantCardGroup.appendChild(testRestaurantCard);
            })

        })
}
// populateCardsDynamically();

function setRestaurantData(id) {
    localStorage.setItem('restaurantID', id);
}

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