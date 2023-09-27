// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { getSession } from '../../SessionManager';

import styles from '../../static/EditSPProfile.module.css';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import ProjectForm from './ProjectForm';

const UserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    mobileNo: '',
    designation: '',
    address:'',
    city:'',
    state:'',
    companyName: '',
    degree: '',
    about: '',
  });

  
  const session = getSession();
  console.log(session.data.email);
  const queryParams = {
    // Add your query parameters here
    // For example:
    Email: session.data.email, // Replace with the actual user ID you want to reference
    // Other parameters...
  };

  // Use another piece of state to track whether user data is loaded or not
  const [userDataLoaded, setUserDataLoaded] = useState(false);

 
  useEffect(() => {
    // Fetch user data when the component mounts using Axios
    axios
      .get('http://192.168.0.106:5000/profilert/StuProfessProfileGet',{
        params: queryParams,
      })
      .then((response) => {
        const data = response.data;
        if (data) {
          // If user data is available, populate the form fields
          setFormData(data);
          setUserDataLoaded(true);
        } else {
          setUserDataLoaded(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setUserDataLoaded(true);
      });
  }, []);

  if (!session) {
    // Redirect to the login page or handle unauthorized access
    return <h1>log in first</h1>
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://192.168.0.106:5000/profilert/StuProfessProfile', formData,{
        params: queryParams,
      });
  
      if (response.status === 200) {
        console.log('User data submitted successfully');
      } else {
        console.error('Error submitting user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // Render the form only when user data is loaded
  return (
    <div className={styles.userformcontainer}>
      <h2>User Information</h2>
      {userDataLoaded && (
        <form onSubmit={handleSubmit} className={styles.userform}>

          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="Display Name"
              value={formData.displayName}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              readOnly
              style={{ backgroundColor: 'lightgrey' }}
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="mobileNo">Mobile No</label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              placeholder="Mobile No"
              value={formData.mobileNo}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="adderess">adderess</label>
            <input
              type="text"
              id="adderess"
              name="address"
              placeholder="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="city">city</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="state">state</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="state"
              value={formData.state}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="companyName">Company/College Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company/College Name"
              value={formData.companyName}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="degree">Degree</label>
            <input
              type="text"
              id="degree"
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className={styles.formgroup}>
            <label className={styles.label1} htmlFor="about">about</label>
            <input
              type="text"
              id="about"
              name="about"
              placeholder="about"
              value={formData.about}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className={styles.submitbutton}>
            Submit
          </button>
        </form>
      )}
      <button className={styles.closebutton} onClick={onClose}>
        Close
      </button>


      <EducationForm/>
      <ExperienceForm/>
      <ProjectForm />
    </div>
  );
};

export default UserForm;
