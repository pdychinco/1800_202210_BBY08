var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        read_display_Recommendation();
        insertName();
        populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        // window.location.href = "login.html";
    }
});

function read_display_Recommendation() {
    db.collection("recommendations").doc("korean")
        .onSnapshot(function (koreanDoc) {
            document.getElementById("recommendation-goes-here").innerHTML = koreanDoc.data().name;
        })
}


// Insert name function using the global variable "currentUser"
function insertName() {
    currentUser.get().then(userDoc => {
        //get the user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        $("#name-goes-here").text(user_Name); //jquery
    })
}

function writeRestaurants() {
    //define a variable for the collection you want to create in Firestore to populate data
    var restaurantRef = db.collection("restaurants");

    restaurantRef.add({
        id: "RS01",
        name: "Suika",
        details: "Japanese Izakaya restaurant",
        city: "Vancouver",
        address: "1626 W Broadway, Vancouver, BC V6J 1X6",
        telephone: "604-730-1678",
        email: "info@suika-snackbar.com",
        price: 4,
        rating: 5,
        SUV02: "option1",
        SUV03: "option3",
        SUV04: "option2",
        SUV05: "option1",
        SUV06: "option3",
        SUV07: "option4",
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
    restaurantRef.add({
        id: "RS02",
        name: "Kook Korean BBQ",
        details: "Korean BBQ restaurant",
        city: "Vancouver",
        address: "2800 E1st Ave #211A Vancouver, BC V5M 4N8",
        telephone: "604-566-5665",
        email: "info@kookbbq.ca",
        price: 3,
        rating: 5,
        SUV02: "option3",
        SUV03: "option2",
        SUV04: "option1",
        SUV05: "option2",
        SUV06: "option4",
        SUV07: "option1",
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
    restaurantRef.add({
        id: "RS03",
        name: "Medina Cafe",
        details: "Mediterranean Brunch Cafe",
        city: "Vancouver",
        address: "780 Richards St. Vancouver, BC V6B 3A4",
        telephone: "604-879-3114",
        email: "info@medinacafe.com",
        price: 2,
        rating: 5,
        SUV02: "option3",
        SUV03: "option2",
        SUV04: "option1",
        SUV05: "option2",
        SUV06: "option4",
        SUV07: "option2",
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
    restaurantRef.add({
        id: "RS04",
        name: "Mott 32",
        details: "High-end Chinese fusion restaurant",
        city: "Vancouver",
        address: "1161 W Georgia St, Vancouver, BC V6E 0C6",
        telephone: "604-861-0032",
        email: "reservations.van@mott32.ca",
        price: 5,
        rating: 3,
        SUV02: "option3",
        SUV03: "option4",
        SUV04: "option1",
        SUV05: "option2",
        SUV06: "option4",
        SUV07: "option4",
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
    restaurantRef.add({
        id: "RS05",
        name: "John 3:16 Malaysian Delights",
        details: "Southeast Asian eats family-owned cafe",
        city: "Richmond",
        address: "6838 No. 3 Rd, Richmond, BC V6Y 2C4",
        telephone: "604-214-8181",
        email: "john316mydelights@gmail.com",
        price: 2,
        rating: 4,
        SUV02: "option3",
        SUV03: "option2",
        SUV04: "option1",
        SUV05: "option2",
        SUV06: "option4",
        SUV07: "option4",
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
    restaurantRef.add({
        id: "RS06",
        name: "Sushi By Yuji",
        details: "Small local sushi restaurant",
        city: "Vancouver",
        address: "2252 Kingsway, Vancouver, BC V5N 2T7",
        telephone: "604-434-0003",
        email: "Not available",
        price: 2,
        rating: 4,
        SUV02: "option3",
        SUV03: "option2",
        SUV04: "option1",
        SUV05: "option2",
        SUV06: "option4",
        SUV07: "option4",
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
    restaurantRef.add({
        id: "RS07",
        name: "L'Abattoir",
        details: "High-end French restaurant in Gastown",
        description: "Located in historic Gastown between Gaoler's Mews and Blood Alley, built in the 19th century on the site of Vancouver's first jail and originally buttressed to the city's main butchery and meat packing district, the name L'Abattoir pays homage to the neighbourhood's colourful past. Set in a refurbished brick and beam building combining classic French tile work with industrial fixtures and natural wood, the restaurant offers a bar and lounge, elevated dining room and a plush, light soaked atrium as well as private dining rooms. Chef/Owner Lee Cooper is dedicated to highlighting the finer points of eating & drinking in L'Abattoir's informed but informal setting. Service is expertly orchestrated to be unpretentious yet refined. The French-influenced West Coast fare is paired with the eclectic wine program and the bar team's innovative cocktail list to offer a truly unique dining experience.",
        city: "Vancouver",
        address: "217 Carrall St Vancouver, BC V6B 2J2",
        telephone: "604-568-1701",
        email: "info@labattoir.ca",
        price: 5,
        rating: 4,
        SUV02: "option3",
        SUV03: "option4",
        SUV04: "option1",
        SUV05: "option2",
        SUV06: "option4",
        SUV07: "option4",
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
    restaurantRef.add({
        id: "RS08",
        name: "Jolibee",
        details: "Filipino Fast Food located on Granville Strip",
        city: "Vancouver",
        address: "833 Granville Street, Vancouver, BC V5M 2C9",
        telephone: "604-265-7353",
        email: "Not available",
        price: 1,
        rating: 4,
        SUV02: "option1",
        SUV03: "option1",
        SUV04: "option3",
        SUV05: "option2",
        SUV06: "option4",
        SUV07: "option4",
        lastupdate: firebase.firestore.FieldValue.serverTimestamp()
    });
}
// writeRestaurants();

//populates retaurants in order based on scores
function populateCardsDynamically() {
    let restaurantCardTemplate = document.getElementById("restaurantCardTemplate");
    let restaurantCardGroup = document.getElementById("restaurantCardGroup");

    db.collection("restaurants")
        .orderBy("scores", "desc")
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
                    "Location: " + doc.data().city + "<br>" +
                    "Telephone: " + doc.data().telephone + "<br>" +
                    "Rating: " + doc.data().rating + "<br>" +
                    "Price: " + doc.data().price;

                testRestaurantCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);

                //next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which hike to bookmark based on which hike was clicked
     
                testRestaurantCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                // testRestaurantCard.querySelector('.read-more').href = "eachHike.html?hikeName=" + hikeName + "&id=" + hikeID;
                restaurantCardGroup.appendChild(testRestaurantCard);
            })

        })
}
// populateCardsDynamically();

//populates restaurants in order based on ratings
function populateCardsDynamically2() {
    let restaurantCardTemplate = document.getElementById("restaurantCardTemplate2");
    let restaurantCardGroup = document.getElementById("restaurantCardGroup2");

    db.collection("restaurants")
        .orderBy("rating", "desc")
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
                    "Location: " + doc.data().city + "<br>" +
                    "Telephone: " + doc.data().telephone + "<br>" +
                    "Rating: " + doc.data().rating + "<br>" +
                    "Price: " + doc.data().price;

                testRestaurantCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);

                //next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which hike to bookmark based on which hike was clicked

                testRestaurantCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                // testRestaurantCard.querySelector('.read-more').href = "eachHike.html?hikeName=" + hikeName + "&id=" + hikeID;
                restaurantCardGroup.appendChild(testRestaurantCard);
            })

        })
}
populateCardsDynamically2();

//populates restaurants in order based on ratings
function populateCards3() {
    let restaurantCardTemplate = document.getElementById("restaurantCardTemplate3");
    let restaurantCardGroup = document.getElementById("restaurantCardGroup3");

    db.collection("restaurants")
        .orderBy("price")
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
                    "Location: " + doc.data().city + "<br>" +
                    "Telephone: " + doc.data().telephone + "<br>" +
                    "Rating: " + doc.data().rating + "<br>" +
                    "Price: " + doc.data().price;

                testRestaurantCard.querySelector('a').onclick = () => setRestaurantData(restaurantID);

    
                testRestaurantCard.querySelector('img').src = `./images/${restaurantID}.jpeg`;
                // testRestaurantCard.querySelector('.read-more').href = "eachHike.html?hikeName=" + hikeName + "&id=" + hikeID;
                restaurantCardGroup.appendChild(testRestaurantCard);
            })

        })
}
populateCards3();

function setRestaurantData(id) {
    localStorage.setItem('restaurantID', id);
}