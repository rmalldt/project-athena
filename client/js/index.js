const loginBtnElem = document.querySelector('#login');

function loginRedirect(e) {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = './login.html';
  } else {
    window.location.href = './dashboard.html';
  }
}

loginBtnElem.addEventListener('click', loginRedirect);
