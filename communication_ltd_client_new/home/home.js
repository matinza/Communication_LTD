document.addEventListener('DOMContentLoaded', function () {
  var systemButton = document.getElementById('systemButton');
  var changePasswordButton = document.getElementById('changePasswordButton');

  systemButton.addEventListener('click', function () {
    window.location.href = 'http://172.29.96.1:8080/system/system.html';
  });

  changePasswordButton.addEventListener('click', function () {
    window.location.href = 'http://172.29.96.1:8080/changePassword/changePassword.html';
  });
});
