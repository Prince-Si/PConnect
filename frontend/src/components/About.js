import React,{useContext} from 'react';
import { getSession } from '../SessionManager';

function About() {

  const session = getSession();

  if (!session) {
    // Redirect to the login page or handle unauthorized access
    return <h1>log in first</h1>
  }

  return(
    <>
     <h1>This is about page About Us</h1>
     <h2>Welcome, {session.data.username}!</h2>
      <p>Your role: {session.data.usertype}</p>
      <p>email: {session.data.email}</p>
      </>
     )
}

export default About;
