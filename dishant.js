const questions = [
  {
    question: "Who is the Greek god of the sea?",
    answers: [
      { text: "Poseidon", correct: true },
      { text: "Zeus", correct: false },
      { text: "Apollo", correct: false },
      { text: "Ares", correct: false },
    ],
  },
  {
    question: "In Norse mythology, who wields the hammer Mjolnir?",
    answers: [
      { text: "Thor", correct: true },
      { text: "Loki", correct: false },
      { text: "Odin", correct: false },
      { text: "Frey", correct: false },
    ],
  },
  {
    question: "Which mythological creature is part lion, goat, and serpent?",
    answers: [
      { text: "Chimera", correct: true },
      { text: "Sphinx", correct: false },
      { text: "Griffin", correct: false },
      { text: "Hydra", correct: false },
    ],
  },
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questionContainer.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  }
  Array.from(answerButtons.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.classList.remove("hidden");
  } else {
    finishQuiz();
  }
}

function setStatusClass(element, correct) {
  element.classList.remove("correct", "wrong");
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function finishQuiz() {
  questionContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}`;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});

restartButton.addEventListener("click", startQuiz);

startQuiz();
