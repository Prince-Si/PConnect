import React, { useState } from 'react';
import Login from './Login';
import Registration from './Registration';

function LoginPopButton() {
  const [showLogin, setShowLogin] = useState(false);


  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
  };


  return (
    <>
      <button onClick={toggleLoginForm}>
        {showLogin ? 'Hide Login' : 'Login'}
      </button>
      <div className="LRForm">
        {showLogin && <Login />}
      </div>
    </>
  );
}

function RegPopButton() {
  const [showRegistration, setShowRegistration] = useState(false);

  const toggleRegistrationForm = () => {
    setShowRegistration(!showRegistration);
  };

  return (
    <>
      <button onClick={toggleRegistrationForm}>
        {showRegistration ? 'Hide Registration' : 'Register'}
      </button>
      <div className="LRForm">
        {showRegistration && <Registration />}
      </div>
    </>
  );
}

export {
  LoginPopButton,
  RegPopButton
};
