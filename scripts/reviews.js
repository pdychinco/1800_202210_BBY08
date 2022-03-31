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
            console.log(restaurantName);

            document.getElementById("restaurantName").innerHTML = restaurantName;
        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


function writeReview() {
    console.log("in")
    let Title = document.getElementById("title").value;
    let Description = document.getElementById("description").value;
    let Memorable = document.getElementById("memorable").value;
    let Rating = document.getElementById("rating").value;
    let Scrambled = document.querySelector('input[name="scrambled"]:checked').value;
    console.log(Title, Description, Memorable, Rating, Scrambled);


    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            // var userName = user.name;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    db.collection("reviews").add({
                        id: restaurantID,
                        userID: userID,
                        title: Title,
                        description: Description,
                        best_quality: Memorable,
                        rating: Rating,
                        recommended: Scrambled,
                        userName: userName

                    }).then(() => {
                        window.location.href = "main.html";
                    })
                })

        } else {
            // No user is signed in.
        }
    });

}

function updateTextInput(val) {
    document.getElementById('rating').value = val;
}


//Review Data

//Populate card
function displayCards(collection) {
    let reviewCardTemplate = document.getElementById("reviewCardTemplate");

  
    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;   // get value of the "name" key
                var details = doc.data().description;   // get value of the "details" key
                var rating = doc.data().rating;
                var recommended = doc.data().recommended;
                let newcard = reviewCardTemplate.content.cloneNode(true);

                //update title and details
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = "Rating: " + rating
                + "<br>Recommended? " + recommended;
                newcard.querySelector('.card-length').innerHTML = details;
                newCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);
                // newcard.querySelector('.card-image').src = "./images/" + code + ".jpg"; //hikes.jpg
  
                newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                newcard.querySelector('.card-image').setAttribute("id", "clength" + i);
  
                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
            
        })
  }
  
  displayCards("reviews");


  







