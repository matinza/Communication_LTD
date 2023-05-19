import React from 'react';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ChangePassword from './components/changePassword/ChangePassword';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import System from './components/system/System';
import { Route, Routes } from 'react-router-dom';
import Routing from './components/routing/Routhing';

function App() {
  return (
      <div>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/changePassword" element={<ChangePassword/>}/>
          <Route exact path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route exact path="/system" element={<System/>}/>
          <Route exact path="/routing" element={<Routing/>}/>
        </Routes>
      </div>
  );
}

export default App;
