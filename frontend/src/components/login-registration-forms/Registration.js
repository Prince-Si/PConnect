import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../static/login-registration.css';
import RegistrationStatus from './RegistrationStatus';
import Logo from '../Logo';
import {Link,useNavigate} from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile_no: '',
    usertype: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile_no: '',
    usertype: '',
  });

  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const loginform = useNavigate();
  const registrationform = useNavigate();

  const NavigateToLogin = () => {
    loginform('/login-form');
  };

  const NavigateToRegistration = () => {
    registrationform('/registration-form');
  };


  useEffect(() => {
    const checkUsernameAvailability = async () => {
      try {
        const response = await axios.get(`http://192.168.0.106:5000/api/check-username/${formData.username}`);
        setUsernameAvailable(response.data.available);
      } catch (error) {
        console.error('Error checking username availability:', error);
      }
    };

    const checkEmailAvailability = async () => {
      try {
        const response = await axios.get(`http://192.168.0.106:5000/api/check-email/${formData.email}`);
        setEmailAvailable(response.data.available);
      } catch (error) {
        console.error('Error checking email availability:', error);
      }
    };

    if (formData.username) {
      checkUsernameAvailability();
    }

    if (formData.email) {
      checkEmailAvailability();
    }
  }, [formData.username, formData.email]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (!usernameAvailable) {
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailAvailable) {
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.mobile_no) {
      newErrors.mobile_no = 'Mobile number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post('http://192.168.0.106:5000/api/register', formData);
        if (response.status === 200 && response.data.message === 'Registration successful') {
          setRegistrationStatus('success'); 
        } else {
          setRegistrationStatus('error'); 
        }
        console.log('Registration successful:', response.data.message);
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

   const closePopup = () => {
    setRegistrationStatus(null);
  };

  return (
    <div className="App">
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
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <p className="error">{errors.username}</p>
          <div className="instruction">
          {!usernameAvailable && formData.username && <p>Username is already taken</p>}
          </div>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <p className="error">{errors.email}</p>
          <div className="instruction">
          {!emailAvailable && formData.email && <p>Email is already registered</p>}
          </div>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <p className="error">{errors.password}</p>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <p className="error">{errors.confirmPassword}</p>
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobile_no"
            value={formData.mobile_no}
            onChange={handleInputChange}
          />
          <p className="error">{errors.mobile_no}</p>
        </div>
        <div>
          <label>Select User Type:</label>
          <select
            name="usertype" 
            value={formData.usertype} 
            onChange={handleInputChange}
          >
            <option value="">Select...</option>
            <option value="student">U.G Student</option>
            <option value="professional">Professional</option>
            <option value="admin">Admin</option>
            <option value="organisation">Organisation</option>
           
          </select>
          <p className="error">{errors.usertype}</p>
        </div>
        <button type="submit">Register</button>
      </form>
      {registrationStatus === 'success' && (
        <RegistrationStatus message="Registration successful! You can now log in." onClose={closePopup} />
      )}
      {registrationStatus === 'error' && (
        <RegistrationStatus message="Registration failed. Please try again." onClose={closePopup} />
      )}
    </div>
  );
};

export default Registration;
