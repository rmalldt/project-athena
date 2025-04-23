const logoutButton = document.querySelector('#logout');

async function logout(e) {
    console.log("hit")
    e.preventDefault();

    const headerslist = localStorage
    
    const dashboardResponse = await fetch('http://localhost:3000/users/logout', {
    method: 'DELETE',
    headers: headerslist,
      });

    localStorage.clear()
    window.location.href = './index.html';
}

logoutButton.addEventListener('click', logout);
