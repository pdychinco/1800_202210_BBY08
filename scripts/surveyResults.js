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
  let restaurantCardTemplate = document.getElementById("restaurantCardTemplate6");
  let restaurantCardGroup = document.getElementById("restaurantCardGroup6");
  let surveyCollection = db.collection("users").doc(user.uid).collection("surveyResults").orderBy("timestamp", "desc");

  surveyCollection.limit(1).get()
    .then(allResults => {
      allResults.forEach(doc => {
        // print out timestamp and array of ids
        console.log(doc.data().timestamp.toDate());
        console.log(doc.data().array);
        arrayOfRestID = doc.data().array;
        for (let i = 0; i < arrayOfRestID.length; i++) {
          db.collection("restaurants").where("id", "==", arrayOfRestID[i]).get()
            .then(snap => {
              size = snap.size;
              // console.log("size of query is : " + size);
              queryData = snap.docs;
              // console.log(queryData);
              // console.log("query data is: " + queryData[0].data().name);
              if (size == 1) {
                var doc = queryData[0].data();
                var restaurantName = doc.name; //gets the name field
                var restaurantID = doc.id; //gets the unique ID field
                var restaurantDetails = doc.details; //gets the details field
                var restaurantAddress = doc.address;
                let newCard = restaurantCardTemplate.content.cloneNode(true);
                newCard.querySelector('.card-title').innerHTML = restaurantName;
                newCard.querySelector('.card-length').innerHTML = restaurantDetails;
                newCard.querySelector('.card-text').innerHTML = restaurantAddress;
                newCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);
                newCard.querySelector("#getdetails").onclick = () => setRestaurantData(restaurantID);
                newCard.querySelector('i').id = 'save-' + restaurantID;
                // this line will call a function to save the restaurants to the user's document             
                newCard.querySelector('i').onclick = () => addFav(restaurantID);
                newCard.querySelector('i').onclick = () => addLikes(restaurantID);
                // newCard.querySelector('i').id = 'save-' + restaurantID;
                // newCard.querySelector('i').onclick = () => removeFav(restaurantID);
                newCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                restaurantCardGroup.appendChild(newCard);
              } else {
                console.log("Query has more than one data");
              }
            })
        }
      });
    })
}