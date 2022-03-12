// Survey click counter to match question 
var clickCounter = 1;
var questionLimit = 0;
var ansDict = {};

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
      question: "How much time do you have to eat?",
      option1: "15 minutes",
      option2: "30 minutes",
      option3: "1 hour",
      option4: "2 hours+"
    });
    questionsRef.add({
      code: "SUV03",
      question: "How much do you want to spend?",
      option1: "I ain't got a penny to my name",
      option2: "My McDonald's pay cheque can cover it",
      option3: "I want to have a full experience",
      option4: "Put it on my Dad's Black Card"
      
    });
    questionsRef.add({
      code: "SUV04",
      question: "What is your preferred way of eating your food?",
      option1: "Fork and knife only",
      option2: "Chopsticks",
      option3: "All natural hands is all I need",
      option4: "Where's my soup and dessert spoon?"
    });
    questionsRef.add({
      code: "SUV05",
      question: "How adventurous are you?",
      option1: "Adventure is my middle name",
      option2: "I like to explore new experiences",
      option3: "I like to have some control",
      option4: "Get me that 9-5 office job day in day out"
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

function displayQuestion(collection) {
  let surveyPlaceholder = document

  db.collection(collection).get()
      .then(snap => {
        snap.forEach(doc => {
        if("SUV0" + clickCounter == doc.data().code) {
          // if("SUV01" == "SUV0" + clickCounter) {
          //   surveyPlaceholder.getElementById("back").style.visibility = hidden;
          // }
          if("SUV02" == "SUV0" + clickCounter) {
            setQuizLength();
          }
          if(doc.data().code == "SUV0" + questionLimit) {
            surveyPlaceholder.querySelector('#next').innerHTML = "Submit";
          } else if (doc.data().code == "SUV0" + questionLimit - 1) {
            surveyPlaceholder.querySelector('#next').innerHTML = "Next";
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
  let ans = document.querySelector('input[name="optionRadioDefault"]:checked').value;
  if (clickCounter != questionLimit) {
    saveSurveyInput(ans);
    clickCounter += 1;
    displayQuestion("survey");
    console.log(clickCounter);
  } else {
    saveSurveyInput(ans);
    filterRestaurant();
    location.href = "../searchresult.html";
   
  }
}

function minusClick() {
  if (clickCounter > 1) {
    clickCounter -= 1;
  }
  displayQuestion("survey");
}

function saveSurveyInput(input) {
  localStorage.setItem("ans" + clickCounter, input)
}

function filterRestaurant() {
  for(let i = 1; i <= clickCounter; i++) {
    ansDict["ans" + i] = localStorage.getItem("ans" + i);
  }
}

function setQuizLength() {
  if(localStorage.getItem("ans1") != null) {
    let userInput = localStorage.getItem("ans1");
    

    if(userInput == "option1") {
      questionLimit = 3;
    } else if (userInput == "option2") {
      questionLimit = 4;
    } else if (userInput == "option3") {
      questionLimit = 5;
    } else {
      questionLimit = 7;
    }
  }
  
}