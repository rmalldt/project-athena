const testQuestions = [
  {
    question: 'What is the answer of this question 1?',
    options: 'A,B,C,D',
    answer: 'A',
  },
  {
    question: 'What is the answer of this question 2?',
    options: 'A,B,C,D',
    answer: 'B',
  },
  {
    question: 'What is the answer of this question 3?',
    options: 'A,B,C,D',
    answer: 'C',
  },
  {
    question: 'What is the answer of this question 4?',
    options: 'A,B,C,D',
    answer: 'D',
  },
  {
    question: 'What is the answer of this question 5?',
    options: 'A,B,C,D',
    answer: 'A',
  },
];

const startQuizBtnElem = document.querySelector('.quiz-start');
const allQuestionsSection = document.querySelector('.questions');
const correctAnswers = testQuestions.map(question => question.answer);
let submitButton;
let finishButton;

function startQuiz() {
  for (let i = 0; i < testQuestions.length; i++) {
    const questionElem = document.createElement('div');
    questionElem.classList.add('question');

    questionElem.addEventListener('click', markScore);

    const questionTitleElem = document.createElement('p');
    questionTitleElem.append(testQuestions[i].question);
    questionElem.appendChild(questionTitleElem);

    const olElem = document.createElement('ol');
    olElem.classList.add('options');
    olElem.id = `id-${i}`;
    questionElem.appendChild(olElem);

    const options = testQuestions[i].options.split(',');
    for (let i = 0; i < options.length; i++) {
      const liElem = document.createElement('li');
      liElem.append(options[i]);
      olElem.appendChild(liElem);
    }

    allQuestionsSection.appendChild(questionElem);
  }

  submitButton = document.createElement('button');
  submitButton.append('Submit');
  submitButton.classList.add('submit-btn');
  submitButton.addEventListener('click', displayResult);
  allQuestionsSection.appendChild(submitButton);

  startQuizBtnElem.textContent = "Let's Go";
  startQuizBtnElem.disabled = true;
}

function markScore(e) {
  const userChoice = e.target;
  userChoice.classList.toggle('marked');

  const questionElem = userChoice.closest('ol');
  const items = questionElem.children;

  [...items].forEach(item => {
    if (item.classList.contains('marked')) {
      item.classList.remove('marked');
    }
  });

  userChoice.classList.add('marked');
}

function displayResult(e) {
  let score = 0;
  let userChoices = [];
  for (let i = 0; i < testQuestions.length; i++) {
    const userChoice = document.querySelector(`#id-${i} .marked`);
    userChoices.push(userChoice?.textContent);
  }

  console.log(userChoices);

  for (let i = 0; i < correctAnswers.length; i++) {
    if (userChoices[i] === correctAnswers[i]) {
      score += 10;
    }
  }

  console.log(score);

  const scoreSheet = document.createElement('div');
  scoreSheet.classList.add('score-sheet');

  const scoreText = document.createElement('p');
  scoreText.append(`You Scored: ${score}`);
  scoreText.style.fontWeight = 'bold';
  scoreSheet.appendChild(scoreText);

  for (let i = 0; i < correctAnswers.length; i++) {
    const correctAnswerText = document.createElement('p');
    correctAnswerText.append(
      `Your answer: ${
        userChoices[i] ? userChoices[i] : 'Not anwered'
      } => Correct answer: ${correctAnswers[i]}`
    );

    scoreSheet.appendChild(correctAnswerText);
  }

  allQuestionsSection.appendChild(scoreSheet);
  submitButton.remove();

  finishButton = document.createElement('button');
  finishButton.append('Start new lesson');
  finishButton.classList.add('new-lesson');
  allQuestionsSection.appendChild(finishButton);

  finishButton.addEventListener('click', e => {
    window.location.href = './dashboard.html';
  });
}

startQuizBtnElem.addEventListener('click', startQuiz);
