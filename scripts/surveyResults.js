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
              $("#names-goes-here").text(user_Name); //jquery
              // document.getElementByID("name-goes-here").innetText=user_Name;
          })
      }

  })
}
insertName();


function populateCardsDynamically() {
  let restaurantCardTemplate = document.getElementById("restaurantCardTemplate");
  let restaurantCardGroup = document.getElementById("restaurantCardGroup");
  let surveyRef = db.collection("surveyResults");
  if(surveyRef.size == 0) {
    let testRestaurantCard = restaurantCardTemplate.content.cloneNode(true);
    testRestaurantCard.querySelector('.card-title').innerHTML = "No matches! Try again";
    restaurantCardGroup.appendChild(testRestaurantCard);
  } else {
    surveyRef
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
                doc.data().address + "<br>" +
                "Telephone: " + doc.data().telephone + "<br>" +
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

  
}
populateCardsDynamically();