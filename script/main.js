console.log('hola caracola');

const API_URL = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy';
const questionDiv = document.getElementById('questions-Div')
const StartGameNavBar = document.getElementById('start-game');
const resultsNavBar = document.getElementById('results');
const statsNavBtn = document.getElementById('stats');
const homeDiv = document.getElementById('home-div');
const statsDIv = document.getElementById('stats-div')
const buttonDiv = document.getElementById('buttons-div');
const cardText = document.querySelector('.card-text');
const nextBnt = document.getElementById('next-button');
const resultsGame = document.getElementById('results_container');
const scoreBtn = document.getElementById('results_button');
const restartGame = document.getElementById('restart_game')
console.log();

let currentQuestionIndex = 0;
let questionsArr = [];
let score = 0;


const getQuestions = async () => { 

  // let response = await axios.get(API_URL);
  // questionsArr = response.data.results
  questionsArr=  [
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "Which Pok&eacute;mon can learn the move &quot;Secret Power&quot; by leveling up?",
      "correct_answer": "Audino",
      "incorrect_answers": [
        "Type:Null",
        "Arceus",
        "Silvally"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "Which of these is not a wonder weapon in &quot;Call Of Duty: Zombies&quot;?",
      "correct_answer": "R115 Resonator",
      "incorrect_answers": [
        "GKZ-45 Mk3",
        "Ray Gun",
        "Scavenger"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "What is the main ship used by Commander Shepard in the Mass Effect Franchise called?",
      "correct_answer": "Normandy",
      "incorrect_answers": [
        "Osiris",
        "Infinity",
        "Endeavour"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "Pok&eacute;mon Go is a location-based augmented reality game developed and published by which company?",
      "correct_answer": "Niantic",
      "incorrect_answers": [
        "Rovio",
        "Zynga",
        "Supercell"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "In which year was League of Legends released?",
      "correct_answer": "2009",
      "incorrect_answers": [
        "2010",
        "2003",
        "2001"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "In the &quot;Hitman&quot; series, what is the name of the main character?",
      "correct_answer": "Agent 47",
      "incorrect_answers": [
        "Agent 27",
        "Agent Smith",
        "Agent 67"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "Which game did NOT get financed via Crowdfunding?",
      "correct_answer": "Enter the Gungeon",
      "incorrect_answers": [
        "Town of Salem",
        "Undertale",
        "Tower Unite"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "Who is the writer of the game &quot;Half-Life&quot;?",
      "correct_answer": "Marc Laidlaw",
      "incorrect_answers": [
        "Gabe Newell",
        "Robin Walker",
        "Chet Faliszek"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "In what year was the game &quot;FTL: Faster Than Light&quot; released?",
      "correct_answer": "2012",
      "incorrect_answers": [
        "2014",
        "2013",
        "2011"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "The &quot;Day of Defeat&quot; series of games take place during which war?",
      "correct_answer": "World War II",
      "incorrect_answers": [
        "World War I",
        "Vietnam War",
        "Iraq War"
      ]
    }
  ]
  // printQuestions(questionsArr)

};

getQuestions();



const printQuestions = () => {
hideViews()
questionDiv.classList.remove('d-none')
cardText.classList.remove('d-none')
  cardText.innerText = '';

  cardText.innerText = questionsArr[currentQuestionIndex].question
 

  let incorrectAnswers = questionsArr[currentQuestionIndex].incorrect_answers
  let answers = [...incorrectAnswers, { text: questionsArr[currentQuestionIndex].correct_answer, correct: true }]
  let answersRandom = getRandomPosition(answers)
  // console.log(answers);
  console.log(questionsArr[currentQuestionIndex].incorrect_answers);
  buttonDiv.innerHTML = '';
  for (let i = 0; i < answersRandom.length; i++) {
    console.log(answersRandom);
    let button = document.createElement("button")
    button.setAttribute('class', 'btn btn-primary')
    button.textContent = answersRandom[i]

    if (answersRandom[i].correct == true) {
      // console.log(answersRandom[i].text);
      button.textContent = answersRandom[i].text
      button.dataset.correct = true
    }
    // console.log(answersRandom[i].text);
    button.addEventListener('click', selectAnswer);
   
    buttonDiv.appendChild(button)
  }
};
const getRandomPosition = (randomOptions) => {
  return randomOptions.sort(() => Math.random() - 0.5);
};



const setStatusClass = (button) => {
  if (button.dataset.correct == "true") {
    button.classList.add('correct')
  } else {
    button.classList.add('wrong')
  }
}



const selectAnswer = (e) => {

  const button = e.target 
  if (button.dataset.correct == 'true'){
    score++
    console.log(score);
  }
  Array.from(buttonDiv.children).forEach(button => {
    setStatusClass(button)
  });
  
  
  console.log("question", questionsArr[currentQuestionIndex].question);
  console.log("index", currentQuestionIndex);
  console.log(questionsArr.length);



  if(questionsArr.length > currentQuestionIndex +1){
    nextBnt.classList.remove('d-none')
  }else {
    
    questionDiv.classList.add('d-none')
    cardText.classList.add('d-none')
    nextBnt.classList.add("d-none")
  
    StartGameNavBar.classList.remove('d-none')
    resultsGame.classList.remove('d-none')
    resultsGame.innerText = `Score: ${score}/10`
    restartGame.classList.remove('d-none')
  }

}



const restarQuiz = () =>{
  window.location.href="index.html"
}


//PARTE SPA
nextBnt.addEventListener('click', ()=> {
  currentQuestionIndex+=1
  printQuestions()
})

const hideViews = () => {
  homeDiv.classList.add('d-none')
  resultsNavBar.classList.add('d-none');
  statsNavBtn.classList.add('d-none');
  questionDiv.classList.add('d-none');
  resultsGame.classList.add('d-none');
  scoreBtn.classList.add('d-none');
  restartGame.classList.add('d-none');
}


StartGameNavBar.addEventListener('click', printQuestions)
// resultsNavBar.addEventListener('click', getQuestions)
restartGame.addEventListener('click', restarQuiz)