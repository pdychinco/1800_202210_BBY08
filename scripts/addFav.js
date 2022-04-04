var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // The following functions are always called when someone is logged in
        populateCardsDynamically();
    } else {
        // No user is signed in
        console.log("No user is signed in");
    }
});


// This function reads data from the restaurants collection and displays it in to the card template
function populateCardsDynamically() {
    let restaurantCardTemplate = document.getElementById("restaurantCardTemplate");
    let restaurantCardGroup = document.getElementById("restaurantCardGroup");

    db.collection("restaurants")
        .get()
        .then(allRestaurants => {
            //gets one doc
            allRestaurants.forEach(doc => {
                var restaurantName = doc.data().name; //gets the name field
                var restaurantID = doc.data().id; //gets the unique ID field
                let testRestaurantCard = restaurantCardTemplate.content.cloneNode(true);
                testRestaurantCard.querySelector('.card-title').innerHTML = restaurantName;

                // Displays specific data
                testRestaurantCard.querySelector('.card-length').innerHTML =
                    doc.data().details + "<br>" +
                    "Location: " + doc.data().city + "<br>" +
                    "Telephone: " + doc.data().telephone + "<br>" +
                    "Rating: " + doc.data().rating + "<br>" +
                    "Price: " + doc.data().price;

                // These lines adds the restaurant ID to local storage
                testRestaurantCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);
                testRestaurantCard.querySelector('i').id = 'save-' + restaurantID;

                // This line will call a function to add restaurant to favourites and add likes         
                testRestaurantCard.querySelector('i').onclick = () => addFav(restaurantID);
                testRestaurantCard.querySelector('i').onclick = () => addLikes(restaurantID);

                testRestaurantCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                restaurantCardGroup.appendChild(testRestaurantCard);
            })

        })
}


// Saves the restaurant ID to local storage
function setRestaurantData(id) {
    localStorage.setItem('restaurantID', id);
}


// This function adds the restaurant to user's favourites and increments likes
function addLikes(restaurantID) {
    db.collection("restaurants").where("id", "==", restaurantID)
        .get()
        .then(queryRestaurant => {
            // See how many results you have got from the query
            size = queryRestaurant.size;
            // Get the documents of query
            Restaurants = queryRestaurant.docs;
            if (size == 1) {
                id = Restaurants[0].id;
                console.log(id);
                // Update method will add to the specified field in database, if that field does not exist, it will create that
                db.collection("restaurants").doc(id).update({
                    // Firebase documentation has this method for incrementation
                    scores: firebase.firestore.FieldValue.increment(1),
                })
                // Sets restaurant to user's document under favorites
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