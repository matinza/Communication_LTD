import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('https://localhost:4000/login', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }).then(response => {
        toast.success(`${response.data.message}, redirecting to system page`);
        setTimeout(() => {
          navigate('/system');  
        }, 5000);              
    }).catch(error => {
      console.error('login error', error.response.data.message);
      toast.error(`login error: ${error.response.data.message}`);
    });
  }

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        <button type="button" onClick={handleForgotPassword}>
          Forgot Password
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default LoginForm;
