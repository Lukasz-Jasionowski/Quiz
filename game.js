const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hyperlink and Text Markup Language",
        choice2: "Hyper Text Markup Language",
        choice3: "Home Tool Markup Language",
        choice4: "Hyperlinks and Text Markup Logic",
        answer: "2"
    },
    {
        question: "Which programming language is commonly used for adding interactivity to web pages?",
        choice1: "CSS",
        choice2: "HTML",
        choice3: "JavaScript",
        choice4: "Python",
        answer: "3"
    },
    {
        question: "What does CSS stand for?",
        choice1: "Computer Style Sheets",
        choice2: "Creative Style Sheets",
        choice3: "Cascading Style Sheets",
        choice4: "Colorful Style Sheets",
        answer: "3"
    },
    {
        question: "Which tag is used to link an external JavaScript file in HTML?",
        choice1: "js",
        choice2: "script",
        choice3: "javascript",
        choice4: "link",
        answer: "2"
    },
    {
        question: "What is the purpose of a 'div' element in HTML?",
        choice1: "It represents a hyperlink.",
        choice2: "It creates a new section in the webpage.",
        choice3: "It defines bold text.",
        choice4: "It displays an image.",
        answer: "2"
    },
    {
        question: "Which HTTP status code indicates a successful request in web development?",
        choice1: "200 OK",
        choice2: "404 Not Found",
        choice3: "500 Internal Server Error",
        choice4: "302 Found",
        answer: "1"
    },
    {
        question: "What is the role of a CSS framework in web development?",
        choice1: "To provide pre-designed website templates.",
        choice2: "To handle server-side logic.",
        choice3: "To manage databases.",
        choice4: "To secure the website from cyber attacks.",
        answer: "1"
    },
    {
        question: "What does the 'box model' refer to in CSS?",
        choice1: "A design concept used in modern websites.",
        choice2: "The layout structure of a webpage.",
        choice3: "The sizing and spacing of HTML elements.",
        choice4: "A way to add 3D effects to web pages.",
        answer: "3"
    },
    {
        question: "What is the purpose of responsive web design?",
        choice1: "To create websites that respond to user interactions.",
        choice2: "To make websites load faster.",
        choice3: "To optimize websites for search engines.",
        choice4: "To ensure websites adapt and display correctly on various devices and screen sizes.",
        answer: "4"
    },
    {
        question: "Which HTTP method is used to request data from a server in web development?",
        choice1: "POST",
        choice2: "DELETE",
        choice3: "GET",
        choice4: "PUT",
        answer: "3"
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerHTML = `${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuestions.slice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
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
    scoreText.innerHTML = score;
}

startGame();