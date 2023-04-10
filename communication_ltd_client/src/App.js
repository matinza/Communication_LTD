import React from 'react';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ChangePassword from './components/changePassword/ChangePassword';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import System from './components/system/System';

function App() {
  return (
    <div>
      <h1>COMMUNICATION_LTD</h1>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <ChangePassword /> */}
      {/* <ForgotPassword /> */}
      <System />
    </div>
  );
}

export default App;
