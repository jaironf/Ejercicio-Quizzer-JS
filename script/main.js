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
// console.log(StartGameNavBar, resultsNavBar, statsNavBtn);
console.log();

let currentQuestionIndex = 0;
let questionsArr = [];


const getQuestions = async () => {

  let response = await axios.get(API_URL);
  questionsArr = response.data.results

  // printQuestions(questionsArr)

};

getQuestions();



const printQuestions = () => {
hideViews()
questionDiv.classList.remove('d-none')
  cardText.innerText = '';

  cardText.innerText = questionsArr[currentQuestionIndex].question
  console.log(questionsArr[currentQuestionIndex].question);

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

const selectAnswer = () => {
  nextBnt.classList.remove('d-none')
  Array.from(buttonDiv.children).forEach(button => {
    setStatusClass(button)
  });
  currentQuestionIndex += 1
  nextBnt.addEventListener('click', printQuestions)
  // if(questionsArr.length > currentQuestionIndex + 1){}
}





//PARTE SPA


const hideViews = () => {
  homeDiv.classList.add('d-none')
  resultsNavBar.classList.add('d-none');
  statsNavBtn.classList.add('d-none');
  questionDiv.classList.add('d-none');
}

const showHome = () => {
  hideViews()
  StartGameNavBar.classList.remove('d-none')
  resultsNavBar.classList.remove('d-none')
}

const showResults = () => {
  hideViews()
  resultsNavBar.classList.remove('d-none')
  questionDiv.classList.remove('d-none')
  homeDiv.classList.add('d-none')
  StartGameNavBar.classList.add('d-none')
}

StartGameNavBar.addEventListener('click', printQuestions)
resultsNavBar.addEventListener('click', getQuestions)
