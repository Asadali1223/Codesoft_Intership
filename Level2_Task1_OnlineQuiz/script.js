const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correct: 2
    },
    {
        question: "Which language makes a webpage interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        correct: 2
    },
    {
        question: "Which HTML tag is used to link CSS?",
        options: ["<css>", "<style>", "<link>", "<script>"],
        correct: 2
    },
    {
        question: "Which symbol is used for JS comments?",
        options: ["<!-- -->", "//", "**", "##"],
        correct: 1
    },
    {
        question: "Which CSS property controls text size?",
        options: ["text-style", "font-style", "font-size", "text-size"],
        correct: 2
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Microsoft", "Netscape", "Apple"],
        correct: 2
    },
    {
        question: "Which method selects element by ID?",
        options: [
            "getElementByClass",
            "querySelectorAll",
            "getElementById",
            "getElements"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

// Screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".options button");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 15;

    const q = questions[currentQuestion];
    questionEl.innerText = q.question;

    optionButtons.forEach((btn, index) => {
        btn.innerText = q.options[index];
    });

    progressEl.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
    timerEl.innerText = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            currentQuestion++;
            currentQuestion < questions.length ? loadQuestion() : showResult();
        }
    }, 1000);
}

function selectAnswer(index) {
    clearInterval(timerInterval);

    if (index === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    currentQuestion < questions.length ? loadQuestion() : showResult();
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    const percentage = Math.round((score / questions.length) * 100);

    scoreEl.innerHTML = `
        Your Score: ${score} / ${questions.length} <br>
        Percentage: <strong>${percentage}%</strong>
    `;
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}