import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match');
      return;
    }

    axios.post('https://localhost:4000/register', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
        toast.success(`${response.data.message}, redirecting to login page`);
        setTimeout(() => {
          navigate('/login');  
        }, 5000);              
    }).catch(error => {
      console.error('Registration error', error.response.data.message);
      toast.error(`Registration error: ${error.response.data.message}`);
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Register;
