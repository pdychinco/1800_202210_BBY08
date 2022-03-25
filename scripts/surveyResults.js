function displayCards(collection) {
  let reviewCardTemplate = document.getElementById("searchCardTemplate");

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

displayCards("surveyResults");
