const loginForm = document.querySelector('#login');

function redirectToRegistrationPage(e) {
  window.location.href = './registration.html';
}

async function login(e) {
  e.preventDefault();
  const name = loginForm.name.value;
  const password = loginForm.password.value;

  const payload = JSON.stringify({
    username: name,
    password: password,
  });
  console.log(payload);

  let response = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    body: payload,
    headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  });

  const responseData = await response.json();
  if (responseData.success) {
    localStorage.setItem('token', responseData.data.token);
    console.log(responseData.data.token);
    const headersList = {
      Accept: '*/*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const dashboardResponse = await fetch('http://localhost:3000/dashboard', {
      method: 'GET',
      headers: headersList,
    });
    const dashboardResponseData = await dashboardResponse.json();
    localStorage.setItem('user', dashboardResponseData.data.username);
    localStorage.setItem('email', dashboardResponseData.data.email);
    localStorage.setItem('user_id', dashboardResponseData.data.student_id)
    console.log(dashboardResponseData);
    localStorage.setItem('student_id', dashboardResponseData.data.student_id);
    localStorage.setItem('username', dashboardResponseData.data.username);
    localStorage.setItem('email', dashboardResponseData.data.email);
    window.location.href = './dashboard.html';
  }
}

loginForm.addEventListener('submit', login);
