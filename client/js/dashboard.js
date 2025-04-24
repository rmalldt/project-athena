const logoutButton = document.querySelector('#logout');
const studentIdElem = document.querySelector('#studentId');
const studentNameElem = document.querySelector('#studentName');
const studentEmailElem = document.querySelector('#studentEmail');
const scoreElem = document.querySelector('#totalScore');

let score = 0;

async function getTopics(e) {
  try {
    const response = await fetch('http://localhost:3000/topics');
    const topics = await response.json();
    const topicsData = topics.data;

    const gridItems = document.querySelectorAll('.classes > div');

    for (let i = 0; i < topicsData.length; i++) {
      gridItems[i].childNodes[1].textContent = topicsData[i].title;
      gridItems[i].childNodes[5].textContent = topicsData[i].description;
      gridItems[i].addEventListener('click', () => {
        window.location.href = `./quiz.html?id=${i + 1}`;
      });
    }
  } catch (error) {
    console.error('Failed to fetch topics:', error);
  }
}

async function getScore() {
  const userId = localStorage.getItem('student_id');

  const headersList = {
    Accept: '*/*',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };

  const response = await fetch(`http://localhost:3000/scores/user/${userId}`, {
    method: 'GET',
    headers: headersList,
  });

  const responseData = await response.json();

  responseData.data.forEach(data => {
    score += data.score;
  });

  studentIdElem.textContent = localStorage.getItem('student_id');
  studentNameElem.textContent = localStorage.getItem('username');
  studentEmailElem.textContent = localStorage.getItem('email');
  scoreElem.textContent = score;
}

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = './index.html';
  }

  await getScore();
  await getTopics();
});

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
    console.error('Failed to logout:', error);
  }
}

logoutButton.addEventListener('click', logout);
