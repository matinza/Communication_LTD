document.addEventListener('DOMContentLoaded', function () {
  var LoginButton = document.getElementById('LoginButton');
  var emailInput = document.getElementById('email');
  var submitButton = document.getElementById('submitButton');

  LoginButton.addEventListener('click', function () {
    window.location.href = 'D:\\git\\Communication_LTD\\communication_ltd_client_new\\login\\login.html';
  });

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    var formData = {
      email: emailInput.value,
    };
    
    fetch('https://localhost:4000/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(formData),
    })
    .then(() => {
      alert('Redirecting to change password page, use the value from your email as your current password');
      setTimeout(() => {
        window.location.href = 'D:\\git\\Communication_LTD\\communication_ltd_client_new\\changePassword\\changePassword.html';
      }, 5000);
    })
    .catch((err) => console.log(err));
  });
});
