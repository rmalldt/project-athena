const loginForm = document.querySelector('#login');

function redirectToRegistrationPage(e) {
  window.location.href = './registration.html';
}

async function register(e) {
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
  console.log(responseData);
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
      // method: 'DELETE',
      // headers: headerslist,
    });

    // localStorage.clear()

    const dashboardResponseData = await dashboardResponse.json();
    console.log(dashboardResponseData);
    window.location.href = './dashboard.html';
  }
}

loginForm.addEventListener('submit', register);
