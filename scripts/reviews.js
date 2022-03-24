function setRestaurantData(id){
    localStorage.setItem ('restaurantID', id);
}

let restaurantID = localStorage.getItem("restaurantID");

db.collection("restaurants").where("id", "==", restaurantID)
    .get()
    .then(queryRestaurant => {
        //see how many results you have got from the query
        size = queryRestaurant.size;
        // get the documents of query
        restaurantID = queryRestaurant.docs;

        // We want to have one document per hike, so if the the result of 
        //the query is more than one, we can check it right now and clean the DB if needed.
        if (size = 1) {
            var thisRestaurant = restaurantID[0].data();
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
    let Rating = document.getElementById("customRange2").value;
    let Recommend = document.querySelector('input[name="recommend"]:checked').value;
    console.log(Title, Description, Memorable, Rating, Recommend);


    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("reviews").add({
                        id: restaurantID,
                        userID: userID,
                        title: Title,
                        description: Description,
                        memorable: Memorable,
                        rating: Rating,
                        recommend: Recommend

                    }).then(()=>{
                        window.location.href = "main.html";
                    })
                })
                   
        } else {
            // No user is signed in.
        }
    });

}

function updateTextInput(val) {
    document.getElementById('textInput').value=val; 
  }