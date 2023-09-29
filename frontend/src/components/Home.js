// Home.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Registration from './login-registration-forms/Registration';
import Login from './login-registration-forms/Login';
import '../static/home.css'; 
import Logo from '../components/Logo';
import RandomProfile from './Profiles/RandomProfiles';

function Home() {
  const loginform = useNavigate();
  const registrationform = useNavigate();

  const NavigateToLogin = () => {
    loginform('/login-form');
  };

  const NavigateToRegistration = () => {
    registrationform('/registration-form');
  };

  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleRegistrationForm = () => {
    setShowRegistration(!showRegistration);
    setShowLogin(false); 
  };

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
    setShowRegistration(false); 
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <Logo />
          <div className="auth-links">
            <Link className="nav-link" to="/login-form" onClick={NavigateToLogin}>
              Login
            </Link>
            <Link className="nav-link" to="/registration-form" onClick={NavigateToRegistration}>
              Register
            </Link>
          </div>
        </div>
      </nav>
      <div className='hflexB'>
      <div className="homepage-content">
        <h1>Welcome to PConnect</h1>
        <p>
          PConnect is a revolutionary platform designed to empower undergraduate students by bridging the gap between academia and the professional world. Our core objectives include facilitating networking with industry professionals, providing exposure to real-world industries, and offering a wide range of educational resources to help you succeed in your career journey.
        </p>
        <p>
          Join our community today to connect with professionals, explore industries, and access valuable resources that will set you on the path to success.
        </p>
        <div className="action-buttons">
          <button onClick={NavigateToLogin}>Login</button><br></br><br></br>
          <button onClick={NavigateToRegistration}>Register</button>
        </div>
      </div>
      <div className='RProfiles'>
      <RandomProfile />
      </div>
      </div>
    </div>
  );
}

export default Home;
