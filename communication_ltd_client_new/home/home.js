document.addEventListener('DOMContentLoaded', function () {
  var systemButton = document.getElementById('systemButton');
  var changePasswordButton = document.getElementById('changePasswordButton');

  systemButton.addEventListener('click', function () {
    window.location.href = '/system';
  });

  changePasswordButton.addEventListener('click', function () {
    window.location.href = '/changePassword';
  });
});
