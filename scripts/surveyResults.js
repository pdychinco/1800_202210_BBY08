var currentUser;
// create dictionary to hold survey batches
var matchedResults = {};
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        // console.log(currentUser);

        // the following functions are always called when someone is logged in
        insertName();
        populateCardsDynamically6(user);
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        // window.location.href = "login.html";
    }
});

// Insert name function using the global variable "currentUser"
function insertName() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        // console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
    })
}


function populateCardsDynamically6(user) {
  let restaurantCardTemplate = document.getElementById("restaurantCardTemplate6");
  let restaurantCardGroup = document.getElementById("restaurantCardGroup6");
  db.collection("users").doc(user.uid).get()
    .then(userDoc => {
      console.log(userDoc);
      console.log(userDoc.data());
      // console.log(userDoc.data()["surveyResult"][0]["date"]["time"]);
      // console.log(userDoc.data()["surveyResult"]);
      // let results = userDoc.data()["surveyResult"];
      let results = userDoc.data()["surveyResult"];
      let key = matchSurveyResults(results)
      // console.log(key);
          
      // console.log(matchedResults[key]);
      for(let i = 0; i < 2; i++) {
        db.collection("restaurants").where("id","==", matchedResults[key][i][0]).get()
        .then(snap => {
          size = snap.size;
          console.log("size of query is : " + size);
          queryData = snap.docs;
          console.log(queryData);
          // console.log("query data is: " + queryData[0].data().name);
          if (size == 1) {
            var doc = queryData[0].data();
            var restaurantName = doc.name; //gets the name field
            var restaurantID = doc.id; //gets the unique ID field
            var restaurantDetails = doc.details; //gets the length field
            var restaurantAddress = doc.address;
            let newCard = restaurantCardTemplate.content.cloneNode(true);
            newCard.querySelector('.card-title').innerHTML = restaurantName;
            newCard.querySelector('.card-length').innerHTML = restaurantDetails;
            newCard.querySelector('.card-text').innerHTML = restaurantAddress;
            newCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);
  
            // newCard.querySelector('i').id = 'save-' + restaurantID;
            // // this line will call a function to save the hikes to the user's document       
            // newCard.querySelector('i').onclick = () => removeFav(restaurantID);
            newCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
            restaurantCardGroup.appendChild(newCard);
          } else {
            console.log("Query has more than one data");
          }
        })
      }


    });
}
populateCardsDynamically6();

function matchSurveyResults(results) {
  
  for(let i = 0; i < results.length; i++) {
    // console.log(`i value is:${i}`);
    for(let j = 1; j< results.length; j++) {
      // ensures code does not check over the same item
      if(i != j) {
        // checks if datestamp and timestamp match to show that both entries are from the same survey result
        if(results[i]["date"]["date"] == results[j]["date"]["date"] && results[i]["date"]["time"]["time"] == results[j]["date"]["time"]["time"]) {
          
          // check for duplicate
          if(matchedResults[`${j},${i}`] != [results[i]["date"]["time"]["id"],results[j]["date"]["time"]["id"]]) {
            matchedResults[`${i},${j}`] = [results[i]["date"]["time"]["id"],results[j]["date"]["time"]["id"]];
            return `${i},${j}`;
            // console.log(matchedResults[`${i},${j}`]);
            // console.log(matchedResults[`${i},${j}`][0][0]);
            // console.log(matchedResults[`${i},${j}`][1][0]);
            // // skips to the next possible set of results
            // i = j;
          }
        }
      }
    }
  }
}

function setRestaurantData(id) {
    localStorage.setItem('restaurantID', id);
}


// function oldCode() {
  // if(results.length == 0) {
//   let testRestaurantCard = restaurantCardTemplate.content.cloneNode(true);
//   testRestaurantCard.querySelector('.card-title').innerHTML = "No matches! Try again";
//   restaurantCardGroup.appendChild(testRestaurantCard);
// } else if (results.length < 3) {

// }else {
//   console.log(results.length);
//   results.limit(3).forEach(thisRestaurantID => {
//     console.log(thisRestaurantID);
//     db.collection("restaurants").where("id","==", thisRestaurantID).get()
//       .then(snap => {
//         size = snap.size;
//         console.log("size of query is : " + size);
//         queryData = snap.docs;
//         console.log("query data is: " + queryData[0].data().name);
//         if (size == 1) {
//           var doc = queryData[0].data();
//           var restaurantName = doc.name; //gets the name field
//           var restaurantID = doc.id; //gets the unique ID field
//           var restaurantDetails = doc.details; //gets the length field
//           var restaurantAddress = doc.address;
//           let newCard = restaurantCardTemplate.content.cloneNode(true);
//           newCard.querySelector('.card-title').innerHTML = restaurantName;
//           newCard.querySelector('.card-length').innerHTML = restaurantDetails;
//           newCard.querySelector('.card-text').innerHTML = restaurantAddress;
//           newCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);

//           // newCard.querySelector('i').id = 'save-' + restaurantID;
//           // // this line will call a function to save the hikes to the user's document       
//           // newCard.querySelector('i').onclick = () => removeFav(restaurantID);
//           newCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
//           restaurantCardGroup.appendChild(newCard);
//         } else {
//           console.log("Query has more than one data");
//         }
//       })
//     })
//   }
// }