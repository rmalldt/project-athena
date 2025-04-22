const registrationForm = document.querySelector("#registration")
const loginButton = document.querySelector(".login")

function redirectToLoginPage(e) {
    window.location.href="./login.html"
}

async function register(e) {
    e.preventDefault();
    const name = registrationForm.name.value
    const email = registrationForm.email.value
    const password = registrationForm.password.value
    console.log(name , email, password)

    const payload = JSON.stringify({
        username: name,
        email: email,
        password: password
    })

    let response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: payload,
        headers: {"Accept": "*/*", "Content-Type":"application/json"}
    })

    const responseData = await response.json()
    console.log(responseData)
    if (responseData.success) {
        window.location.href="./login.html"
    }
  }

registrationForm.addEventListener("submit", register)
loginButton.addEventListener("click", redirectToLoginPage)