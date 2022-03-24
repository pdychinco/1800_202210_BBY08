//use search query as location: text || price: text || rating: text then use split method to get first item

function displaySearchRestaurants() {
  // var testSearch = document.getElementById("searchBarQuery").value;
  var testSearch = 3;
  // console.log("testSearch = " + testSearch);
  if (testSearch == 3) {
      db.collection("restaurants").where("price", "==", testSearch)
      .get() 
          .then(searchResult => { 
              size = searchResult.size;
              populateRestaurants(searchResult);
          })
  } else {
      db.collection("restaurants").get() 
          .then(allRestaurants => {
            populateRestaurants(allRestaurants);
          })
  }
}

displaySearchRestaurants();


function populateRestaurants(docs) {
  let searchCardTemplate = document.getElementById("searchCardTemplate");
  let searchCardGroup = document.getElementById("searchCardGroup");
  while (searchCardGroup.firstChild){
    searchCardGroup.removeChild(searchCardGroup.firstChild)
}
        docs.forEach(doc => {
          var restaurantPrice = doc.data().price;
          var restaurantRating = doc.data().rating;
            var restaurantName = doc.data().name; //gets the name field
            var restaurantID = doc.data().rest_ID; //gets the unique ID field
            var restaurantDetail = doc.data().details;
            let testRestaurantCard = searchCardTemplate.content.cloneNode(true);
            testRestaurantCard.querySelector('.card-title').innerHTML = restaurantName;
            testRestaurantCard.querySelector('.card-text').innerHTML = restaurantDetail;
            // testRestaurantCard.querySelector('.card-img').src = `../images/${restaurantID}.jpeg`;
            // testRestaurantCard.querySelector('.card-img').src = "../images" + restaurantID + ".jpeg";
            searchCardGroup.appendChild(testRestaurantCard);
              
          })
}