// src/App.js

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../static/login-registration.css';
import { setSession, clearSession } from '../../SessionManager';
import Logo from '../Logo';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const loginform = useNavigate();
  const registrationform = useNavigate();

  const navigate = useNavigate(); 
  const NavigateToLogin = () => {
    loginform('/login-form');
  };

  const NavigateToRegistration = () => {
    registrationform('/registration-form');
  };

  const handleLogin = async () => {
    try {
        const response = await fetch('http://192.168.0.106:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setLoginStatus('success');
        const data = await response.json();
        console.log(data.usertype);
        setSession({ data });
        
        if (data.route === '/about' && data.usertype==='admin') {
          navigate('/about');
        }
        else if(data.route ==='/about' && data.usertype==='organisation'){
          navigate('/OrganisationHome');
        }
        else if(data.route ==='/about' && (data.usertype ==='student' || data.usertype ==='professional')){
          navigate('/Stu_ProfessHome');
        }
      } else {
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('error');
    }
  };

 

  return (
    <div className="App"
    style={{padding:'50px', margin:"100px",marginLeft:'300px', marginRight:'300px'}}
    >
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
      <h1>Login</h1>
      {loginStatus === 'success' && <p>Login successful!</p>}
      {loginStatus === 'error' && <p>Login failed. Please check your credentials.</p>}
      <label>Enter Email :</label>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br></br>
      <br></br>

      <label>Enter password :</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br></br>
      <br></br>

      <button onClick={handleLogin}>Login</button>
      
    </div>
  );
}

export default Login;
