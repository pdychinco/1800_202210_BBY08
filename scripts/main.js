function insertName() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {                                                                 
          // Do something for the current logged-in user here: 
          console.log(user.uid);
          //go to the correct user document by referencing to the user uid
          currentUser = db.collection("users").doc(user.uid);
          //get the document for current user.
          currentUser.get()
          .then(userDoc => {
             var user_Name = userDoc.data().name;
             console.log(user_Name);
             //method #1:  insert with html only
             //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
             //method #2:  insert using jquery
             $("#name-goes-here").text(user_Name);                         //using jquery
          })
      } else {
          // No user is signed in.
      }
  });
}
insertName();

function writeRestaurantData() {
  max = 7;
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("restaurants");
  for (i = 1; i <= max; i++) {
      hikesRef.add({ //add to database, autogen ID
          code: "id" + i,
          name: "restaurant" + i,
          details: "foodie" + i,
          address: "foodie" + i,
          price: "foodie" + i,
          pictures: "foodie" + i,
          review: "foodie" + i,
          stars: "foodie" + i,
          venue_size: "foodie" + i,
          favoruite_history: "foodie" + i,
          distance_from_user: "foodie" + i,
      })
 }
}
function displayCards(collection) {
  let cardTemplate = document.getElementById("reviewTemplate");

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
              // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
              // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
              // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

              //attach to gallery
              document.getElementById(collection + "-go-here").appendChild(newcard);
              i++;
          })
      })
}

displayCards("restaurants");

// TESTING
// TESTING
// TESTING
// TESTING
// TESTING
// TESTING
// TESTING

function writeHikes2() {
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("hikes");

  hikesRef.add({
      code:"hike1",
      name: "The Trail",    //replace with your own city?
      city: "Surrey",
      province: "BC",
      level: "easy",
      length: "10 km",
      details: "ryan goes here regularly"
  });
  hikesRef.add({
      code:"hike2",
      name: "The Trailer",    //replace with your own city?
      city: "Sorth Vancouver",
      province: "BC",
      level: "moderate",
      length: "10.5 km",
      details: "ryan goes here sometimes"
  });
  hikesRef.add({
      code:"hike3",
      name: "Mount Trailer",    //replace with your own city?
      city: "Weast Vancouver",
      province: "BC",
      level: "hard",
      length: "8.2 km",
      details: "Elmo goes here regularly"
  });
}

function displayCards(collection) {
  let cardTemplate = document.getElementById("hikeCardTemplate");

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
              // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
              // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
              // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

              //attach to gallery
              document.getElementById(collection + "-go-here").appendChild(newcard);
              i++;
          })
      })
}

displayCards("hikes");