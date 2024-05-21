const question = document.getElementById('question');

const choices = Array.from(document.getElementsByClassName('option-text'));

const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');




let currentQuestion = {};

let acceptingAnswers = false;

let score = 0;

let questionCounter = 0;

let availableQuestions = [];




let questions = [   

    {

        question: 'Which HTML tag is used to define an inline style?',

        choice1: '<script>',

        choice2: '<css>',

        choice3: '<style>',

        choice4: '<span>',

        answer: 3,

    },

    {

        question: 'Which property is used to change the text color in CSS?',

        choice1: 'text-color',

        choice2: 'font-color',

        choice3: 'text-style',

        choice4: 'color',

        answer: 4,

    },

    {

        question: 'Which of the following is the correct way to comment in HTML?',

        choice1: '// Comment',

        choice2: '<!-- Comment -->',

        choice3: '/* Comment */',

        choice4: '<! Comment>',

        answer: 2,

    },

 ];




 // Constants

const CORRECT_BONUS = 10;

const MAX_QUESTIONS = 3;




startGame = () => {

    questionCounter = 0;

    score = 0;

    availableQuestions = [...questions]; // Spread operator to copy the questions array

    getNewQuestion();

};




getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {

        // Go to the end page

        return window.location.assign('/end.html');

    }

    questionCounter++;

    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;




    choices.forEach(choice => {

        const number = choice.dataset['number'];   // Get the number from the data-number attribute

        choice.innerText = currentQuestion['choice' + number];  // Set the text of the choice

    });




    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};




choices.forEach(choice => {

    choice.addEventListener('click', e => {

        if(!acceptingAnswers) return;




        acceptingAnswers = false;

        const selectedChoice = e.target;

        const selectedAnswer = selectedChoice.dataset['number'];   




        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';




        if(classToApply === 'correct') {

            incrementScore(CORRECT_BONUS);

        }




        selectedChoice.parentElement.classList.add(classToApply);




        setTimeout(() => {

            selectedChoice.parentElement.classList.remove(classToApply);

            getNewQuestion();

        }, 1000);

    });

});


incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();