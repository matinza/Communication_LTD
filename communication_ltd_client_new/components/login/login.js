document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('login-form');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var registerButton = document.getElementById('register');
    var forgotPasswordButton = document.getElementById('forgotPassword');
    
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var email = emailInput.value;
        var password = passwordInput.value;

        axios.post('https://localhost:4000/login', {
            email: email,
            password: password
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
        }).then(function (response) {
            alert(`${response.data.message}, redirecting to home page`);
            saveTokenToLocalStorage(response.data.token);

            setTimeout(function () {
                window.location.href = 'https://localhost:8080/home/home.html';
            }, 5000);
        }).catch(function (error) {
            console.error('login error', error.response.data.message);
            alert(`login error: ${error.response.data.message}`);
        });
    });

    registerButton.addEventListener('click', function () {
        window.location.href = 'https://localhost:8080/register/register.html';
    });

    forgotPasswordButton.addEventListener('click', function () {
        window.location.href = 'https://localhost:8080/forgotPassword/forgotPassword.html';
    });
});

function saveTokenToLocalStorage(token) {
    localStorage.setItem('token', token);
}