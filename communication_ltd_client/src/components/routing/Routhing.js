import React from 'react';
import './Routing.css';
import { useNavigate } from 'react-router-dom';

const Routing = () => {
  const navigate = useNavigate();

  const handleSystemClick = () => {
    navigate('/system');  
  };

  const handleChangePasswordClick = () => {
    navigate('/changePassword');  
  };

  return (
    <div className='bigDivStyle'>
      <div>
        <button className='buttonStyle' onClick={handleSystemClick}>System</button>
      </div>
      <div>
        <button className='buttonStyle' onClick={handleChangePasswordClick}>Change Password</button>
      </div>
    </div>    
  );
};

export default Routing;
