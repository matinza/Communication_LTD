document.addEventListener('DOMContentLoaded', function () {
  var homeButton = document.getElementById('homeButton');
  var currentPasswordInput = document.getElementById('currentPassword');
  var newPasswordInput = document.getElementById('newPassword');
  var confirmPasswordInput = document.getElementById('confirmPassword');
  var submitButton = document.getElementById('submitButton');
  var forgotPasswordButton = document.getElementById('forgotPasswordButton');

  homeButton.addEventListener('click', function () {
    window.location.href = 'https://localhost:8080/home/home.html';
  });

  forgotPasswordButton.addEventListener('click', function () {
    window.location.href = 'https://localhost:8080/forgotPassword/forgotPassword.html';
  });

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    var formData = {
      currentPassword: currentPasswordInput.value,
      newPassword: newPasswordInput.value,
      confirmPassword: confirmPasswordInput.value,
    };

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Password and confirm password do not match');
      return;
    }

    var token = localStorage.getItem('token');

    fetch('https://localhost:4000/changePassword', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      alert(`${data.message}, redirecting to login page`);
      setTimeout(() => {
        window.location.href = 'https://localhost:8080/login/login.html';
      }, 5000);
    })
    .catch(error => {
      console.error('change password error', error);
      alert(`change password error: ${error.message}`);
    });
  });
});
