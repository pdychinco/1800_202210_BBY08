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
      price: "$$"
    });
  favouritesRef.add({
      code: "JDF02",
      name: "Kook Korean BBQ",
      details: "Korean BBQ restaurant in Vancouver, BC.",
      address: "2800 E1st Ave #211A Vancouver, BC V5M 4N8",
      telephone: "604-566-5665",
      email: "info@kookbbq.ca",
      price: "$$"
    });
  favouritesRef.add({
      code: "JDF03",
      name: "Medina Cafe",
      details: "Mediterranean Brunch Cafe in Vancouver, BC.",
      address: "780 Richards St. Vancouver, BC V6B 3A4",
      telephone: "604-879-3114",
      email: "info@medinacafe.com",
      price: "$"
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