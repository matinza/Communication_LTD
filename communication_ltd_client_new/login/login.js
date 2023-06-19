document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('login-form');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');

  loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = emailInput.value;
      var password = passwordInput.value;

      axios.post('https://localhost:4000/login', { email: email, password: password }, {
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json;charset=UTF-8'
          },
      }).then(function (response) {
          alert(`${response.data.message}, redirecting to home page`);
          saveTokenToLocalStorage(response.data.token);

          setTimeout(function () {
              window.location.href = 'D:\\git\\Communication_LTD\\communication_ltd_client_new\\home\\home.html'; // navigating to home page
          }, 5000);
      }).catch(function (error) {
          console.error('login error', error.response.data.message);
          alert(`login error: ${error.response.data.message}`);
      });
  });

  var registerButton = document.getElementById('register');
  registerButton.addEventListener('click', function () {
      window.location.href = 'D:\\git\\Communication_LTD\\communication_ltd_client_new\\register\\register.html';
  });

  var forgotPasswordButton = document.getElementById('forgotPassword');
  forgotPasswordButton.addEventListener('click', function () {
      window.location.href = 'D:\\git\\Communication_LTD\\communication_ltd_client_new\\forgotPassword\\forgotPassword.html';
  });
});

function saveTokenToLocalStorage(token) {
  localStorage.setItem('token', token);
}
