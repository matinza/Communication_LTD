document.addEventListener('DOMContentLoaded', function () {
  var systemButton = document.getElementById('systemButton');
  var changePasswordButton = document.getElementById('changePasswordButton');

  systemButton.addEventListener('click', function () {
    window.location.href = 'https://localhost:8080/system/system.html';
  });

  changePasswordButton.addEventListener('click', function () {
    window.location.href = 'https://localhost:8080/changePassword/changePassword.html';
  });
});
