const MAIN_URL = 'http://localhost:8000/';

const loginButton = document.querySelector('.login-button');
let loginAttempts = 1;

function clearBody() {
    const body = document.querySelector('body');
    body.textContent = '';
}
function clearLoginAttempts() {
    const loginError = document.querySelector('.login-error');
    loginError.textContent = '';
}



// Event loop functionalities Below.
loginButton.onclick = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const loginData = {'username':username, 'password':password};
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData)
        };

        fetch(MAIN_URL, options)
            .then(response => response.json())
            .then(data => {
                if (data === 'fail') {
                    const loginError = document.querySelector('.login-error');
                    if (loginAttempts > 1) {
                        loginError.textContent = `Something went wrong... Try Again! (x${loginAttempts})`;
                        loginAttempts += 1;
                    }else{
                        loginError.textContent = `Something went wrong... Try Again!`;
                        loginAttempts += 1;
                    }
                }else {
                    clearLoginAttempts();
                    console.log(data);
                }
            })
            .catch(error => {
                console.log(error);
                const loginError = document.querySelector('.login-error');
                if (loginAttempts > 1) {
                    loginError.textContent = `Something went wrong... Try Again! (x${loginAttempts})`;
                    loginAttempts += 1;
                }else{
                    loginError.textContent = `Something went wrong... Try Again!`;
                    loginAttempts += 1;
                }
            });
    
};



// Added functionality so you can press enter after typing in password to send request.
document.getElementById("password")
    .addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("login-button").click();
    }
});

document.getElementById("username")
    .addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("login-button").click();
    }
});





