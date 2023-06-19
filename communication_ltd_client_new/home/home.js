document.addEventListener('DOMContentLoaded', function () {
  var systemButton = document.getElementById('systemButton');
  var changePasswordButton = document.getElementById('changePasswordButton');

  systemButton.addEventListener('click', function () {
    window.location.href = 'D:\\git\\Communication_LTD\\communication_ltd_client_new\\system\\system.html';
  });

  changePasswordButton.addEventListener('click', function () {
    window.location.href = 'D:\\git\\Communication_LTD\\communication_ltd_client_new\\changePassword\\changePassword.html';
  });
});
