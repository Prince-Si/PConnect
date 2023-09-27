import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Registration from './login-registration-forms/Registration';
import Login from './login-registration-forms/Login';
import '../static/home.css';

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
    setShowLogin(false); // Hide login form when showing registration form
  };

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
    setShowRegistration(false); // Hide registration form when showing login form
  };

  return (
    <div>
       <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/MongoDBTest">MongoDBTest</Link>
            </li>
          </ul>
        </nav>
      <h1>This is Home page</h1>
      <button onClick={NavigateToLogin}>Login</button>
      <button onClick={NavigateToRegistration}>Register</button>
      <button onClick={toggleRegistrationForm}>
        {showRegistration ? 'Hide Registration' : 'Register'}
      </button>
      <div className="LRForm">
        {showRegistration && <Registration />}
      </div>
      <button onClick={toggleLoginForm}>
        {showLogin ? 'Hide Login' : 'Login'}
      </button>
      <div className="LRForm">
        {showLogin && <Login />}
      </div>
      <p>lorem100alsiudhfwliauerhwauierholiauwehrdijsdfihsdjf;alskdjfijf
        a;lsiedhfowieurfowiaejroijdsf;aishf;ilisjkdf;lkj
        a;oseihdfoiweurowieuuroiweuroiwejjroiweuuroiweuroiweuroi
        ;aosiehdfrowieurowieuru;owiejr;oiejf
        a;sleidjfrowieurwoierowierwoieru
        a;osiejrowieuroiwerowieroi
        djfpawoeirkdjf;oi
      </p>
    </div>
  );
}

export default Home;
