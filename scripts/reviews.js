function writeRestaurants() {
  //define a variable for the collection you want to create in Firestore to populate data
  var restaurantsRef = db.collection("restaurants");

  restaurantsRef.add({
      code: "RS01",
      name: "restaurantName",
      details: "restaurantInfo",
      address: "restaurantAddress",
      price: "restaurantPrice",
      pictures: "restaurantPicture",
      review: "restaurantReview",
      stars: "restaurantRating",
      venue_size: "restaurantCapacity",
      favourite_history: "favourites",
      distance_from_user: "distance"
  });
  restaurantsRef.add({
      code: "RS02",
      name: "restaurantName",
      details: "restaurantInfo",
      address: "restaurantAddress",
      price: "restaurantPrice",
      pictures: "restaurantPicture",
      review: "restaurantReview",
      stars: "restaurantRating",
      venue_size: "restaurantCapacity",
      favourite_history: "favourites",
      distance_from_user: "distance"
  });
  restaurantsRef.add({
      code: "RS03",
      name: "restaurantName",
      details: "restaurantInfo",
      address: "restaurantAddress",
      price: "restaurantPrice",
      pictures: "restaurantPicture",
      review: "restaurantReview",
      stars: "restaurantRating",
      venue_size: "restaurantCapacity",
      favourite_history: "favourites",
      distance_from_user: "distance"
  });
}

//   writeRestaurants();

function displayCards(collection) {
  let cardTemplate = document.getElementById("restaurantsCardTemplate");

  db.collection(collection).get()
      .then(snap => {
          var i = 1;
          snap.forEach(doc => { //iterate thru each doc
              var title = doc.data().name;   // get value of the "name" key
              var details = doc.data().details;   // get value of the "details" key
              let newcard = cardTemplate.content.cloneNode(true);
              var code = doc.data().code;

              //update title and text and image
              newcard.querySelector('.card-title').innerHTML = title;
              newcard.querySelector('.card-text').innerHTML = details;
              newcard.querySelector('.card-image').src = "./images/" + code + ".jpg"; //hikes.jpg

              //give unique ids to all elements for future use
              newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
              newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
              newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

              //attach to gallery
              document.getElementById(collection + "-go-here").appendChild(newcard);
              i++;
          })
      })
}

displayCards("restaurants");