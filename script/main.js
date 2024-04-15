console.log('hola caracola');

const API_URL = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple';
const questionDiv = document.getElementById('questions-Div')
const homeNavBtn = document.getElementById('home');
const gameNavBtn = document.getElementById('game');
const statsNavBtn = document.getElementById('stats');
const homeDiv = document.getElementById('home-div');
const statsDIv = document.getElementById('stats-div')
// console.log(homeNavBtn, gameNavBtn, statsNavBtn);


let currentQuestionIndex = 0;


const printQuestions = (getQuestions) => {
    console.log(getQuestions);
    questionDiv.innerHTML = ""; 

    questionDiv.innerHTML = `
    <div class="card-header">Question: </div>
    <div class="card-body d-flex flex-wrap">
      <p class="card-text">${getQuestions[currentQuestionIndex].question}</p>`

    let correctButton = document.createElement('button')
    // correctButton.setAttribute('class', 'btn btn-light d-flex btn-sm')
    correctButton.textContent = getQuestions[currentQuestionIndex].correct_answer
    console.log(correctButton);
    
    questionDiv.appendChild(correctButton)

    for (let i = 0; i < getQuestions[currentQuestionIndex].incorrect_answers.length; i++) {
        let incorrectButton = document.createElement("button")
        incorrectButton.textContent = getQuestions[currentQuestionIndex].incorrect_answers[i]
        questionDiv.appendChild(incorrectButton)
    }
  };




const getQuestions = async () =>{
    
        let response = await axios.get(API_URL);
        let questionsArr = response.data.results
        printQuestions(questionsArr)
    
};

getQuestions();

gameNavBtn.addEventListener('click', getQuestions)