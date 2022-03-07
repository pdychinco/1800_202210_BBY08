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
    restaurantsRef.add({
        code: "JDF01",
        name: "Suika",
        details: "Japanese Izakaya restaurant in Vancouver, BC.",
        address: "1626 W Broadway, Vancouver, BC V6J 1X6",
        telephone: "604-730-1678",
        email: "info@suika-snackbar.com",
        price: "$$",
        favourite: "This is one of Jane Doe's favourite restaurants"
      });
    restaurantsRef.add({
        code: "JDF02",
        name: "Kook Korean BBQ",
        details: "Korean BBQ restaurant in Vancouver, BC.",
        address: "2800 E1st Ave #211A Vancouver, BC V5M 4N8",
        telephone: "604-566-5665",
        email: "info@kookbbq.ca",
        price: "$$",
        favourite: "This is one of Jane Doe's favourite restaurants"
      });
      restaurantsRef.add({
        code: "JDF03",
        name: "Medina Cafe",
        details: "Mediterranean Brunch Cafe in Vancouver, BC.",
        address: "780 Richards St. Vancouver, BC V6B 3A4",
        telephone: "604-879-3114",
        email: "info@medinacafe.com",
        price: "$",
        favourite: "This is one of Jane Doe's favourite restaurants"
      });
  }

  // writeRestaurants();


function writeQuestions() {
  console.log("starting write question");
  //define a variable for the collection you want to create in Firestore to populate data
  var questionsRef = db.collection("survey");
  console.log(questionsRef);

  questionsRef.add({
      code: "SUV01",
      question: "How hungry are you?",
      option1: "I need food immediately or else I'm going to murder.",
      option2: "Hangry me is coming out soon",
      option3: "I can wait a bit",
      option4: "I just ate, but I love food"
    });
    questionsRef.add({
      code: "SUV02",
      question: "What is your preferred way of eating your food?",
      option1: "Fork and knife only",
      option2: "Chopsticks",
      option3: "All natural hands is all I need",
      option4: "Where's my soup and dessert spoon?"
    });
    questionsRef.add({
      code: "SUV03",
      question: "How adventurous are you?",
      option1: "Adventure is my middle name",
      option2: "I like to explore new experiences",
      option3: "I like to have some control",
      option4: "Get me that 9-5 office job day in day out"
    });
    console.log(questionsRef);
}

  // writeQuestions();

function displayQuestion(collection) {
  let surveyPlaceholder = document.getElementById("surveyPlaceholder");

  db.collection(collection).get()
      .then(snap => {
          var i = 1;
          snap.forEach(doc => { //iterate thru each doc
              var question = doc.data().quesiton;   // get value of the "question" key
              var option1 = doc.data().option1;   // get value of the "option1" key
              var option2 = doc.data().option2;// get value of the "option2" key
              var option3 = doc.data().option3;// get value of the "option3" key
              var option4 = doc.data().option4;// get value of the "option4" key
              var code = doc.data().code;
              let newsurvey = surveyPlaceholder.content.cloneNode(true);
              
              
              //update title and text and image
              newsurvey.querySelector('#question').innerHTML = question;
              newsurvey.querySelector('#optionRadio1').innerHTML = option1;
              newsurvey.querySelector('#optionRadio2').innerHTML = option2;
              newsurvey.querySelector('#optionRadio3').innerHTML = option3;
              newsurvey.querySelector('#optionRadio4').innerHTML = option4;
              newsurvey.querySelector('.card-image').src = "./images/" + code + ".jpeg"; //hikes.jpg

              //give unique ids to all elements for future use
              newsurvey.querySelector('#question').setAttribute("id", "question" + i);
              newsurvey.querySelector('#optionRadio1').setAttribute("id", "option1" + i);
              newsurvey.querySelector('#optionRadio2').setAttribute("id", "option2" + i);
              newsurvey.querySelector('#optionRadio3').setAttribute("id", "option3" + i);
              newsurvey.querySelector('#optionRadio4').setAttribute("id", "option4" + i);

              //attach to gallery
              document.getElementById(collection + "-go-here").appendChild(newsurvey);
              i++;
          })
      })
}
displayCards("survey");

/*
function writeRestaurantData() {
  max = 7;
  //define a variable for the collection you want to create in Firestore to populate data
  var restaurantRef = db.collection("restaurants");
  for (i = 1; i <= max; i++) {
      restaurantRef.add({ //add to database, autogen ID
          code: "id" + i,
          name: "restaurantName" + i,
          details: "restaurantInfo" + i,
          address: "restaurantAddress" + i,
          price: "restaurantPrice" + i,
          pictures: "restaurantPicture" + i,
          review: "restaurantReview" + i,
          stars: "restaurantRating" + i,
          venue_size: "restaurantCapacity" + i,
          favourite_history: "favourites" + i,
          distance_from_user: "distance" + i,
    });
}
writeRestaurantData();
*/

function displayCards(collection) {
  let cardTemplate = document.getElementById("restaurantCardTemplate");

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
