const logoutButton = document.querySelector('#logout');

async function getTopics(e) {

  try {
    const response = await fetch('http://localhost:3000/topics');
    const topics = await response.json();
    const topicsData = topics.data;

    console.log(topicsData);
    console.log(localStorage)
    const gridItems = document.querySelectorAll('.classes > div');

    for (let i = 0; i < topicsData.length; i++) {
      gridItems[i].childNodes[1].textContent = topicsData[i].title;
      gridItems[i].childNodes[5].textContent = topicsData[i].description;
    }
  } catch (error) {
    console.error('Failed to fetch topics:', error);
  }
}


async function getStudentInfo(e) {
    console.log('hit3');
  
    try {
      const response = await fetch('http://localhost:3000/users');
      const topics = await response.json();
      const topicsData = topics.data;
    } catch (error) {
     console.error('Failed to fetch Student Information:', error);
    }
}
//       console.log(topicsData);
//       const gridItems = document.querySelectorAll('.classes > div');
  
//       for (let i = 0; i < topicsData.length; i++) {
//         gridItems[i].childNodes[1].textContent = topicsData[i].title;
//         gridItems[i].childNodes[5].textContent = topicsData[i].description;
//       }
//     } catch (error) {
//       console.error('Failed to fetch topics:', error);
//     }
//   }

document.addEventListener('DOMContentLoaded', () => {

  if (localStorage) {
    document.getElementById('student_id').textContent = localStorage.user_id;
    document.getElementById('student_name').textContent = localStorage.user;
    document.getElementById('email').textContent = localStorage.email;
  }
});



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
