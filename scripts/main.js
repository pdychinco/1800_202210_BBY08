// Survey click counter to match question 
var clickCounter = 1

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
  }

//   writeRestaurants();

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
      });
    favouritesRef.add({
        code: "JDF02",
        name: "Kook Korean BBQ",
        details: "Korean BBQ restaurant in Vancouver, BC.",
        address: "2800 E1st Ave #211A Vancouver, BC V5M 4N8",
        telephone: "604-566-5665",
        email: "info@kookbbq.ca",
        price: "$$",
      });
    favouritesRef.add({
        code: "JDF03",
        name: "Medina Cafe",
        details: "Mediterranean Brunch Cafe in Vancouver, BC.",
        address: "780 Richards St. Vancouver, BC V6B 3A4",
        telephone: "604-879-3114",
        email: "info@medinacafe.com",
        price: "$",
      });
  }

//   writeFavourites();
  // writeRestaurants();


function writeQuestions() {
  //define a variable for the collection you want to create in Firestore to populate data
  var questionsRef = db.collection("survey");

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
    questionsRef.add({
      code: "SUV04",
      question: "How much time do you have to eat?",
      option1: "15 minutes",
      option2: "30 minutes",
      option3: "1 hour",
      option4: "2 hours+"
    });
    questionsRef.add({
      code: "SUV05",
      question: "How much do you want to spend?",
      option1: "I ain't got a penny to my name",
      option2: "My McDonald's pay cheque can cover it",
      option3: "I want to have a full experience",
      option4: "Put it on my Dad's Black Card"
    });
    questionsRef.add({
      code: "SUV06",
      question: "What food type are you currently craving?",
      option1: "Sweet",
      option2: "Spicy",
      option3: "Deep Fried",
      option4: "Savory"
    });
    questionsRef.add({
      code: "SUV07",
      question: "When you ask yourself, \"What should I be eating,\" what is the first thing that pops into your head?",
      option1: "Anything fried to cripsy perfection",
      option2: "Whatever was caught fresh today",
      option3: "Ice cream is the only option",
      option4: "What else does a rabbit eat?"
    });
}

  // writeQuestions();

function displayQuestion(collection) {
  let surveyPlaceholder = document

  db.collection(collection).get()
      .then(snap => {
        snap.forEach(doc => {
        if("SUV0" + clickCounter == doc.data().code) {
          if(doc.data().code == "SUV07") {
            surveyPlaceholder.querySelector('#next').innerHTML = "Submit";
          }
          var question = doc.data().question;   // get value of the "question" key
          var option1 = doc.data().option1;   // get value of the "option1" key
          var option2 = doc.data().option2;// get value of the "option2" key
          var option3 = doc.data().option3;// get value of the "option3" key
          var option4 = doc.data().option4;// get value of the "option4" key
          
          //update title and text and image
          surveyPlaceholder.querySelector('#question').innerHTML = question;
          surveyPlaceholder.querySelector('#optionRadioText1').innerHTML = option1;
          surveyPlaceholder.querySelector('#optionRadioText2').innerHTML = option2;
          surveyPlaceholder.querySelector('#optionRadioText3').innerHTML = option3;
          surveyPlaceholder.querySelector('#optionRadioText4').innerHTML = option4;
        }
    })
  })
}
displayQuestion("survey");


function addClick() {
  if (clickCounter != 7) {
    clickCounter += 1;
    displayQuestion("survey");
  } else {
    location.href = "../searchresult.html"
  }
  
  
  console.log(clickCounter);
}

function minusClick() {
  if (clickCounter != 0) {
    clickCounter -= 1;
  }
  displayQuestion("survey");
  console.log(clickCounter);
}

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
      .onSnapshot(doc => {
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
displayCards("restaurants");

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