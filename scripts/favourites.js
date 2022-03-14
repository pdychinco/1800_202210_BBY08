
function read_display_Recommendation() {
  //console.log("inside the function")

  //get into the right collection
  db.collection("recommendations").doc("japanese")
      .onSnapshot(function (japaneseDoc) {
          //console.log(tuesdayDoc.data());
          document.getElementById("recommendation-goes-here").innerHTML = japaneseDoc.data().name;
      })
}
read_display_Recommendation();

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
              $("#name-goes-here").text(user_Name); //jquery
              // document.getElementByID("name-goes-here").innetText=user_Name;

          })
      }

  })
}
insertName();

function writeFavourites() {
  //define a variable for the collection you want to create in Firestore to populate data
  var favouritesRef = db.collection("favourites");

  favouritesRef.add({
      code: "JDF01",
      name: "Suika",
      details: "Japanese Izakaya restaurant in Vancouver, BC.",
      address: "1626 W Broadway, Vancouver, BC V6J 1X6",
      telephone: "604-730-1678",
      email: "info@suika-snackbar.com",
      price: "$$",
      stats: {
        SUV02: "option1",
        SUV03: "option3",
        SUV04: "option2",
        SUV05: "option1",
        SUV06: "option3",
        SUV07: "option4"
      }
    });
  favouritesRef.add({
      code: "JDF02",
      name: "Kook Korean BBQ",
      details: "Korean BBQ restaurant in Vancouver, BC.",
      address: "2800 E1st Ave #211A Vancouver, BC V5M 4N8",
      telephone: "604-566-5665",
      email: "info@kookbbq.ca",
      price: "$$",
      stats: {
        SUV02: "option4",
        SUV03: "option4",
        SUV04: "option3",
        SUV05: "option4",
        SUV06: "option1",
        SUV07: "option2"
      }
    });
  favouritesRef.add({
      code: "JDF03",
      name: "Medina Cafe",
      details: "Mediterranean Brunch Cafe in Vancouver, BC.",
      address: "780 Richards St. Vancouver, BC V6B 3A4",
      telephone: "604-879-3114",
      email: "info@medinacafe.com",
      price: "$",
      stats: {
        SUV02: "option3",
        SUV03: "option2",
        SUV04: "option1",
        SUV05: "option2",
        SUV06: "option4",
        SUV07: "option4"
      }
    });
  }


//   writeFavourites();

function displayCards(collection) {
  let cardTemplate = document.getElementById("favouritesCardTemplate");

  db.collection(collection).get()
      .then(snap => {
          var i = 1;
          snap.forEach(doc => { //iterate thru each doc
              var title = doc.data().name;   // get value of the "name" key
              var details = doc.data().details;   // get value of the "details" key
              var code = doc.data().code;
              let newcard = cardTemplate.content.cloneNode(true);
              
              
              //update title and text and image
              newcard.querySelector('.card-title').innerHTML = title;
              newcard.querySelector('.card-text').innerHTML = details;
              newcard.querySelector('.card-image').src = "./images/" + code + ".jpeg"; //hikes.jpg
              //   newcard.querySelector('.card-favourite').innerHTML = favourite;

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

displayCards("favourites");


db.collection('favourites').where('user', '==', 'userID').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderFavourites(doc);
  })
});