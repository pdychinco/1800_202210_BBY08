function populateCardsDynamically() {
  let restaurantCardTemplate = document.getElementById("restaurantCardTemplate");
  let restaurantCardGroup = document.getElementById("restaurantCardGroup");

  db.collection("surveyResults")
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
                  "Location: " + doc.data().address + "<br>" +
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
populateCardsDynamically();