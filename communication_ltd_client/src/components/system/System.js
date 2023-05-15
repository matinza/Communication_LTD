import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './System.css';

const System = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [newCustomerName, setNewCustomerName] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName } = formData;
    setNewCustomerName(`${firstName} ${lastName}`);
    
    const token = localStorage.getItem('token');
    axios.post('https://localhost:4000/system', formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
        toast.success(`${response.data.message}, redirecting to login page`);
        // setTimeout(() => {
        //   navigate('/login');  
        // }, 5000);              
    }).catch(error => {
      console.error('system error', error.response.data.message);
      toast.error(`system error: ${error.response.data.message}`);
    })
  };

  return (
    <div className="system-screen">
      <h2>Enter New Customer Details</h2>
      <form className="customer-form" onSubmit={handleSubmit}>
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
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add client</button>
        <ToastContainer />
      </form>
      {newCustomerName && (
        <div className="customer-name">
          <h3>New Customer Name:</h3>
          <p>{newCustomerName}</p>
        </div>
      )}
    </div>
  );
};

export default System;
