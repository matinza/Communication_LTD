import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home');
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('https://localhost:4000/forgotPassword', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }})
    toast.success(`redirecting to change password page, use the value from your email as your current password`);
    setTimeout(() => {
      navigate('/changePassword');  
    }, 5000)
  }

  return (
    <form className="forget-password-form" onSubmit={handleSubmit}>
      <button type="button" onClick={handleHome}>
            Home
      </button>
      <h2>Forget Password</h2>
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
      <button type="submit">Submit</button>
      <ToastContainer />
    </form>
  );
};

export default ForgotPassword;
