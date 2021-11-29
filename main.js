//Create a quiz
//Allow user to choose number of questions (max 50), category, difficulty, type (multiple choice/true-false)

//Generate session token so questions aren't repeated
//fetch from api based on user selections

// if run out of questions in selected category - alert user, reset session token
//fetch current category list from api
//fetch info re no. of questions in category



let questions = [];
let questionBlock = document.querySelector(".question");
let answer1 = document.querySelector("#no1");
let answer2 = document.querySelector("#no2");
let answer3 = document.querySelector("#no3");
let answer4 = document.querySelector("#no4");
let startButton = document.querySelector("#start");
let intro = document.querySelector(".startText");
let nextQuestionButton = document.querySelector("#nextQuestion");
let questionAnswerBlock = document.querySelector(".questionBlock");
let answerGiven = false;
let scoreBox = document.querySelector("#score")
let getQuestionButton = document.querySelector("#getQuestions")
let disappearText = document.querySelector("#disappear")
let finalScoreBox = document.querySelector("#finalScoreBox");
let finalText = document.querySelector("#finalText");
let playAgain = document.querySelector("#playAgain")


// sample url
// https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple

//take in inputs from user
let inputNumberQuestions = document.querySelector("#numberQuestions");
let numQuestions;

let category = document.querySelector("#categoryQuestions")
let categories = [{name: "General Knowledge", id: 9}, {name: "Books", id: 10}, {name: "Film", id: 11}, {name: "Television", id: 14}, {name: "Science & Nature", id: 17}, {name: "Animals", id: 27}]
let categorySelect;

//Reuqest questions from API
async function getQuestions() {
    numQuestions = inputNumberQuestions.value;
    categorySelect = categories.filter(function(item) {return item.name === category.value})
    
    const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${categorySelect[0].id}&type=multiple`);
  let data = await response.json();
  questions = data.results;
  startButton.style.display = "block"
  return questions;
}

//getQuestions();

function populateQuestion() {
    if(!questions.length) {
        return
    } else { 
  let answersArray = [];
  answersArray.push(questions[0].correct_answer)
  answersArray.push(questions[0].incorrect_answers[0])
  answersArray.push(questions[0].incorrect_answers[1])
  answersArray.push(questions[0].incorrect_answers[2])
  let shuffledArray = shuffleArray(answersArray)

  questionBlock.innerHTML = questions[0].question;
  answer1.innerHTML = shuffledArray[0]
  answer2.innerHTML = shuffledArray[1]
  answer3.innerHTML = shuffledArray[2]
  answer4.innerHTML = shuffledArray[3]
  displayQuestion();
  disappearText.style.display = "none";
}}

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function nextQuestion () {
  if(questions.length === 0) {
    finalScoreBox.style.display = "block";
    finalText.innerHTML = `You have finished the quiz. <br><br> Your final score is ${scoreCounter} out of  ${totalQuestionsAskedCount }.`
    questionAnswerBlock.style.display = "none";
  } else {
  populateQuestion();
  console.log(questions)
  answer1.style.backgroundColor = ""
  answer2.style.backgroundColor = ""
  answer3.style.backgroundColor = ""
  answer4.style.backgroundColor = ""
  answerGiven = false;
  }
}

//Event listeners for buttons

getQuestionButton.addEventListener("click", getQuestions)

startButton.addEventListener("click", populateQuestion)

nextQuestionButton.addEventListener("click", nextQuestion)

playAgain.addEventListener("click", resetAll)

function displayQuestion() {
  questionAnswerBlock.style.display = "block";
  intro.style.display = "none";
  startButton.style.display = "none";
}


let scoreCounter = 0;
let totalQuestionsAskedCount = 0;


//select answer - check if answer correct
function checkAnswer(event) {
    while (answerGiven === false) {
        let correctAnswer = document.createElement('p')
        correctAnswer.innerHTML = questions[0].correct_answer;
    if (event.target.innerHTML === correctAnswer.innerHTML) {
        event.target.style.backgroundColor = "green";
        scoreCounter++
        
    } else {
        event.target.style.backgroundColor = "red";
        event.target.innerHTML += `<br><br>The correct answer was ${correctAnswer.innerHTML}`
    }
    totalQuestionsAskedCount++;
    scoreBox.innerHTML = `Score: ${scoreCounter} out of  ${totalQuestionsAskedCount }`
    answerGiven = !answerGiven;
    console.log(questions[0])
    questions.shift()
}

    
    console.log(event.target.innerHTML)
    
}

answer1.addEventListener("click", checkAnswer)
answer2.addEventListener("click", checkAnswer)
answer3.addEventListener("click", checkAnswer)
answer4.addEventListener("click", checkAnswer)

function resetAll () {
  reload = location.reload(true);
}