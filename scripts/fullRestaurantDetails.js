var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        // window.location.href = "login.html";
    }
});

let restaurantID = localStorage.getItem("restaurantID");


db.collection("restaurants").where("id", "==", restaurantID)
    .get()
    .then(queryRestaurant => {
        //see how many results you have got from the query
        size = queryRestaurant.size;
        // get the documents of query
        Restaurants = queryRestaurant.docs;
        if (size = 1) {
            var thisRestaurant = Restaurants[0].data();
            restaurantName = thisRestaurant.name;
            restaurantDetails = thisRestaurant.details;
            restaurantID = thisRestaurant.id;
            restaurantRating = "Rating " + thisRestaurant.rating;
            restaurantPrice = "Price " + thisRestaurant.price;
            restaurantLocation = thisRestaurant.city;
            restaurantDescription = thisRestaurant.description;
            restaurantAddress = thisRestaurant.address;
            restaurantPhoneNumber = thisRestaurant.telephone;
            restaurantEmail = thisRestaurant.email;

            console.log(restaurantName);

            document.getElementById("restaurantName").innerHTML = restaurantName;
            document.getElementById("restaurantDetails").innerHTML = restaurantDetails;
            document.getElementById("restaurantRating").innerHTML = restaurantRating;
            document.getElementById("restaurantPrice").innerHTML = restaurantPrice;
            document.getElementById("restaurantLocation").innerHTML = restaurantLocation;
            document.getElementById("restaurantDescription").innerHTML = restaurantDescription;
            document.getElementById("restaurantAddress").innerHTML = restaurantAddress;
            document.getElementById("restaurantPhoneNumber").innerHTML = "Telephone: " + restaurantPhoneNumber;
            document.getElementById("restaurantEmail").innerHTML = "Email: " + restaurantEmail;
            document.getElementById("image").src = `./images/${restaurantID}.jpeg`;
        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


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
// GENERATES ONE REVIEW
// db.collection("reviews").where("id", "==", restaurantID)
// .get()
//     .then(queryReview => {
//         //see how many results you have got from the query
//         size = queryReview.size;
//         // get the documents of query
//         Reviews = queryReview.docs;
//         if (size = 1) {
// var thisReview = Reviews[0].data();
// reviewTitle = thisReview.title;
// reviewSummary = thisReview.best_quality;
// reviewDescription = thisReview.description;
// reviewRating = "Give this restaruant a rating: " + thisReview.rating;
// reviewRecommended = "Would you recommend this restaurant to a friend? "
// + thisReview.recommended;
// // reviewPostID = thisReview.userID;
// reviewUsername = thisReview.userName;
// console.log(reviewDescription)

// document.getElementById("reviewTitle").innerHTML = reviewTitle;
// document.getElementById("userName").innerHTML = "Posted by: " + reviewUsername;
// document.getElementById("reviewSummary").innerHTML = reviewSummary + ".";
// document.getElementById("reviewDescription").innerHTML = reviewDescription; 
// document.getElementById("reviewRating").innerHTML = reviewRating;
// document.getElementById("reviewRecommended").innerHTML = reviewRecommended;
//             // document.getElementById("reviewPostID").innerHTML = reviewPostID;


//     } else {
//         console.log("Query has more than one data")
//     }
// })
// .catch((error) => {
//     console.log("Error getting documents: ", error);
// });



function displayCards(collection) {
    let reviewCardTemplate = document.getElementById("reviewCardTemplate");
    let reviewCardGroup = document.getElementById("reviewCardGroup");
    db.collection(collection).where("id", "==", restaurantID)
        .get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var reviewTitle = doc.data().title; 
                var reviewUsername = doc.data().userName;
                var reviewSummary = doc.data().best_quality;
                var reviewDescription = doc.data().description; 
                var reviewRating = doc.data().rating;
                var reviewRecommended = doc.data().recommended;
                let newcard = reviewCardTemplate.content.cloneNode(true);

                newcard.querySelector(".reviewTitle").innerHTML = reviewTitle;
                newcard.querySelector(".userName").innerHTML = "Posted by: " + reviewUsername;
                newcard.querySelector(".reviewSummary").innerHTML = reviewSummary + ".";
                newcard.querySelector(".reviewDescription").innerHTML = reviewDescription; 
                newcard.querySelector(".reviewRating").innerHTML = "Give this restaruant a rating: " + reviewRating;
                newcard.querySelector(".reviewRecommended").innerHTML = "Would you recommend this restaurant to a friend? " + reviewRecommended;
                reviewCardGroup.appendChild(newcard);
            })

        })
}

displayCards("reviews");


//THIS ONLY GENERATES THE REVIEW AT THE SPECIFIED INDEX
// function displayCards(collection) {
//     let reviewCardTemplate = document.getElementById("reviewCardTemplate");
//     let reviewCardGroup = document.getElementById("reviewCardGroup");
//     db.collection(collection).where("id", "==", restaurantID)
//         .get()
//         .then(queryReview => {
//             //see how many results you have got from the query
//             size = queryReview.size;
//             // get the documents of query
//             Reviews = queryReview.docs;
//             if (size = 1) {
//                 var thisReview = Reviews[0].data();
//                 reviewTitle = thisReview.title;
//                 reviewSummary = thisReview.best_quality;
//                 reviewDescription = thisReview.description;
//                 reviewRating = "Give this restaruant a rating: " + thisReview.rating;
//                 reviewRecommended = "Would you recommend this restaurant to a friend? "
//                 + thisReview.recommended;
//                 // reviewPostID = thisReview.userID;
//                 reviewUsername = thisReview.userName;
//                 console.log(reviewDescription)

//                 let newcard = reviewCardTemplate.content.cloneNode(true);

//                 newcard.querySelector(".reviewTitle").innerHTML = reviewTitle;
//                 newcard.querySelector(".userName").innerHTML = "Posted by: " + reviewUsername;
//                 newcard.querySelector(".reviewSummary").innerHTML = reviewSummary + ".";
//                 newcard.querySelector(".reviewDescription").innerHTML = reviewDescription; 
//                 newcard.querySelector(".reviewRating").innerHTML = reviewRating;
//                 newcard.querySelector(".reviewRecommended").innerHTML = reviewRecommended;

//                 reviewCardGroup.appendChild(newcard);
//             } else {
//                 console.log("Query has more than one data")
//             }
//         })
//         .catch((error) => {
//             console.log("Error getting documents: ", error);
//         });

// }

// displayCards("reviews");