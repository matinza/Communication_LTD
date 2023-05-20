import React, { useState } from 'react';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleHome = () => {
    navigate('/home');
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      toast.error('Password and confirm password do not match');
      return;
    }

    const token = localStorage.getItem('token');
    axios.post('https://localhost:4000/changePassword', formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
        toast.success(`${response.data.message}, redirecting to login page`);
        setTimeout(() => {
          navigate('/login');  
        }, 5000);              
    }).catch(error => {
      console.error('change password error', error.response.data.message);
      toast.error(`change password error: ${error.response.data.message}`);
    });
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <button type="button" onClick={handleHome}>
          Home
      </button>
      <h2>Change Password</h2>
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          id="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={formData.newPassword}
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
      <button type="submit">Submit</button>    
      <button type="button" onClick={handleForgotPassword}>
          Forgot Password
        </button>  
      <ToastContainer />
    </form>
  );
};

export default ChangePassword;
