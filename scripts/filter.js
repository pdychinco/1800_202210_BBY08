
function displayRestaurants() {
  testSearch = document.getElementById("searchBar").value;
  if (testSearch != null && testSearch != "") {
      db.collection("restaurants").where("rating", "==", testSearch)
      .get() 
          .then(searchResult => { 
              size = searchResult.size;
              console.log(size);
              populateRestaurants(searchResult);
          })
  } else {
      db.collection("restaurants").get() 
          .then(allRestaurants => {
            populateRestaurants(allRestaurants);
          })
  }
}

displayRestaurants();

function populateRestaurants(docs) {
  let searchCardTemplate = document.getElementById("searchCardTemplate");
  let searchCardGroup = document.getElementById("searchCardGroup");
  console.log(docs.size);
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