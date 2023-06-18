document.addEventListener('DOMContentLoaded', function () {
  var homeButton = document.getElementById('homeButton');
  var emailInput = document.getElementById('email');
  var submitButton = document.getElementById('submitButton');

  homeButton.addEventListener('click', function () {
    window.location.href = '/home';
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
        window.location.href = '/changePassword';
      }, 5000);
    })
    .catch((err) => console.log(err));
  });
});
