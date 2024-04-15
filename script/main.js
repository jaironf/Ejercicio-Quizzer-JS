console.log('hola caracola');

const API_URL = 'https://quizapi.io/api/v1/questions?apiKey=UYtp5zUUULMmeKVlOf3MN7YzxgdtWj95UWtsmOI4&limit=10';
const questionDiv = document.getElementById('questions-Div')
const homeNavBtn = document.getElementById('home');
const gameNavBtn = document.getElementById('game');
const statsNavBtn = document.getElementById('stats');

// console.log(homeNavBtn, gameNavBtn, statsNavBtn);


const printQuestions = (getQuestions) => {
    console.log(getQuestions);
    questionDiv.innerHTML = "";
    
  getQuestions.forEach((question) => {
    console.log(question.question)
    questionDiv.innerHTML = `
    <div class="card-header">Question: </div>
    <div class="card-body">
      <p class="card-text">${question.question}</p>`;
    });
  };


const getQuestions = async () =>{
    try {
        const response = await axios.get(API_URL);
        const questionsArr = response.data
        printQuestions(questionsArr)
    } catch (error) {
        console.error(error);
    }
};

getQuestions();

gameNavBtn.addEventListener('click', getQuestions)