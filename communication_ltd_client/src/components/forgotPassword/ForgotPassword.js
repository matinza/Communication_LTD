import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

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
    console.log(formData); // Replace with your own forget password logic
  };

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
    </form>
  );
};

export default ForgotPassword;
