console.log('hola caracola');

const API_URL = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy';
const questionDiv = document.getElementById('questions-Div')
const StartGameNavBar = document.getElementById('start-game');
const resultsNavBar = document.getElementById('results');
const statsNavBtn = document.getElementById('stats');
const homeDiv = document.getElementById('home-div');
const statsDIv = document.getElementById('stats-div')
const buttonDiv = document.getElementById('buttons-div');
const cardText = document.querySelector('.card-text')
// console.log(StartGameNavBar, resultsNavBar, statsNavBtn);
console.log();

let currentQuestionIndex = 0;

const printQuestions = (getQuestions) => {
  console.log(getQuestions);
  // questionDiv.innerHTML = "";

  // questionDiv.innerHTML = `
  //     <p class="card-text m-3">${getQuestions[currentQuestionIndex].question}</p>
  //     <div class="buttons" id="buttons-div"></div>
  //     `
   cardText.innerText = getQuestions[currentQuestionIndex].question
console.log(getQuestions[currentQuestionIndex].question);

  let incorrectAnswers = getQuestions[currentQuestionIndex].incorrect_answers
  let answers = [...incorrectAnswers, { text: getQuestions[currentQuestionIndex].correct_answer, correct: true }]
  let answersRandom = getRandomPosition(answers)
// console.log(answers);
console.log(answersRandom);
  for (let i = 0; i < answersRandom.length; i++) {
 console.log(answersRandom);

    let button = document.createElement("button")
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
  }else{
    button.classList.add('wrong')
  }
}

const selectAnswer = () => {
  Array.from(buttonDiv.children).forEach(button => {
    setStatusClass(button)
  });
  // if(questionsArr.length > currentQuestionIndex + 1){}
}


const getQuestions = async () => {
  
  let response = await axios.get(API_URL);
  let questionsArr = response.data.results
  
  printQuestions(questionsArr)

};

getQuestions();




//PARTE SPA


const hideViews = () => {
  resultsNavBar.classList.add('d-none');
  statsNavBtn.classList.add('d-none');
  questionDiv.classList.add('d-none');
}

const showHome = () => {
  hideViews()
  StartGameNavBar.classList.remove('d-none')
  resultsNavBar.classList.remove('d-none')
}

const showResults = ()=>{
  hideViews()
  resultsNavBar.classList.remove('d-none')
  questionDiv.classList.remove('d-none')
  homeDiv.classList.add('d-none')
  StartGameNavBar.classList.add('d-none')
}

StartGameNavBar.addEventListener('click', showResults)
resultsNavBar.addEventListener('click', getQuestions)
