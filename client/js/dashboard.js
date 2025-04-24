const logoutButton = document.querySelector('#logout');

async function getTopics(e) {
  console.log('hit2');

  try {
    const response = await fetch('http://localhost:3000/topics');
    const topics = await response.json();
    const topicsData = topics.data;

    console.log(topicsData);
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

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = './index.html';
  }

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
