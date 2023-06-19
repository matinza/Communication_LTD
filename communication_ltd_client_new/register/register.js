const formData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const form = document.getElementById('registration-form');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const loginButton = document.getElementById('loginButton');

const handleChange = (event, inputName) => {
  formData[inputName] = event.target.value;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const { password, confirmPassword } = formData;
  if (password !== confirmPassword) {
    alert('Password and confirm password do not match');
    return;
  }

  axios.post('https://localhost:4000/register', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  }).then(response => {
      alert(response.data.message + ', redirecting to login page', true);
      setTimeout(() => {
        window.location.href = 'http://172.29.96.1:8080/login/login.html';  
      }, 5000);              
  }).catch(error => {
    console.error('Registration error', error.response.data.message);
    alert('Registration error: ' + error.response.data.message);
  });
};

const handleLogin = () => {
  window.location.href = 'http://172.29.96.1:8080/login/login.html';  
};

firstNameInput.addEventListener('input', (event) => handleChange(event, 'firstName'));
lastNameInput.addEventListener('input', (event) => handleChange(event, 'lastName'));
emailInput.addEventListener('input', (event) => handleChange(event, 'email'));
passwordInput.addEventListener('input', (event) => handleChange(event, 'password'));
confirmPasswordInput.addEventListener('input', (event) => handleChange(event, 'confirmPassword'));
form.addEventListener('submit', handleSubmit);
loginButton.addEventListener('click', handleLogin);
