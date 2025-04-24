const quizTopic = document.querySelector('.quiz-title');
const quizDescription = document.querySelector('.quiz-description');
const iframeElem = document.querySelector('#frame');
const logoutBtnElem = document.querySelector('#logout');
const startQuizBtnElem = document.querySelector('.quiz-start');
const allQuestionsSection = document.querySelector('.questions');
let testQuestions;
let correctAnswers;
let submitButton;
let finishButton;

async function fetchQuizData() {
  const token = localStorage.getItem('token');
  if (!token) {
    return (window.location.href = './index.html');
  }

  const urlParams = new URLSearchParams(window.location.search);
  const topicId = urlParams.get('id');

  try {
    const topicResponse = await fetch(
      `http://localhost:3000/topics/${topicId}`
    );
    const topicData = await topicResponse.json();
    if (topicData.success) {
      console.log(topicData);
      quizTopic.textContent = topicData.data.title;
      quizDescription.textContent = topicData.data.description;
      iframeElem.src = topicData.data.videoUrl;
    }

    const questionsResponse = await fetch(
      `http://localhost:3000/questions/${topicId}`
    );
    const questionsData = await questionsResponse.json();
    if (questionsData.success) {
      testQuestions = questionsData.data;
      correctAnswers = testQuestions.map(question => question.answer);
    }
  } catch (error) {
    console.log('Error fetching topic questions: ', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchQuizData);

function startQuiz() {
  for (let i = 0; i < testQuestions.length; i++) {
    const questionElem = document.createElement('div');
    questionElem.classList.add('question');

    questionElem.addEventListener('click', markChoice);

    const questionTitleElem = document.createElement('p');
    questionTitleElem.append(`${i + 1}. ` + testQuestions[i].question);
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

function markChoice(e) {
  const userChoice = e.target;
  if (userChoice.nodeName === 'LI') {
    const questionElem = userChoice.closest('ol');
    const items = questionElem.children;

    [...items].forEach(item => {
      if (item.classList.contains('marked')) {
        item.classList.remove('marked');
      }
    });

    userChoice.classList.add('marked');
  }
}

function displayResult(e) {
  let score = 0;
  let userChoices = [];
  for (let i = 0; i < testQuestions.length; i++) {
    const userChoice = document.querySelector(`#id-${i} .marked`);
    userChoices.push(userChoice?.textContent);
  }

  for (let i = 0; i < correctAnswers.length; i++) {
    if (userChoices[i] === correctAnswers[i]) {
      score += 10;
    }
  }

  const scoreSheet = document.createElement('div');
  scoreSheet.classList.add('score-sheet');

  const scoreText = document.createElement('p');
  scoreText.append(`You scored: ${score}`);
  scoreText.style.fontWeight = 'bold';
  scoreSheet.appendChild(scoreText);

  for (let i = 0; i < correctAnswers.length; i++) {
    const correctAnswerText = document.createElement('p');
    correctAnswerText.append(
      `Your answer: ${
        userChoices[i] ? userChoices[i] : 'Not answered'
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

async function logout(e) {
  e.preventDefault();

  try {
    await fetch('http://localhost:3000/users/logout', {
      method: 'DELETE',
      headers: { Accept: '*/*' },
    });

    localStorage.clear();
    window.location.href = './index.html';
  } catch (error) {
    console.log('Error logging out user: ', error);
  }
}

logoutBtnElem.addEventListener('click', logout);
