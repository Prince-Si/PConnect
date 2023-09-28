import React, { useState, useEffect } from 'react';
import { Link , useParams} from 'react-router-dom';
import { getSession } from '../../SessionManager';
import styles from '../../static/navbar1.module.css';
import axios from 'axios';
import profileStyles from '../../static/profileStyle.module.css';
import HandleLogOut from '../login-registration-forms/logoutButton';


function ShowSPProfile({}) {
  const session = getSession();
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [educationData, setEducationData] = useState([]);
  const [internData, setInternData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const { profileEmail } = useParams();

  const queryParams = {
    Email: profileEmail,
  };
  console.log(profileEmail);

  useEffect(() => {
    if (!queryParams.Email) {
      setLoading(false);
      return;
    }

    axios
      .get('http://192.168.0.106:5000/profilert/StuProfessProfileGet', {
        params: queryParams,
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((userError) => {
        setError(userError);
        setLoading(false);
      });
  }, [queryParams.Email]);

  useEffect(() => {
    if (queryParams.Email) {
      axios
        .get('http://192.168.0.106:5000/profilert/getProfileName', {
          params: queryParams,
        })
        .then((profileResponse) => {
          setProfileData(profileResponse.data);
        })
        .catch((profileError) => {
          setError(profileError);
          setLoading(false);
          setImageSrc(null);
        });
    }
  }, [queryParams.Email]);

  useEffect(() => {
    if (profileData && profileData.ProfileImageName) {
      fetch(
        `http://192.168.0.106:5000/uploads/${profileData.ProfileImageName}`
      )
        .then((imageResponse) => {
          if (imageResponse.ok) {
            return imageResponse.blob();
          }
          throw new Error('Network response was not ok.');
        })
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
          setLoading(false);
        })
        .catch((imageError) => {
          setError(imageError);
          console.log(imageError);
          setLoading(false);
          setImageSrc(null);
        });
    }
  }, [profileData]);

  useEffect(() => {
    const API_URL = 'http://192.168.0.106:5000/profilert/getEducationDetails';
    const userEmail = queryParams.Email;

    axios
      .get(API_URL, {
        params: {
          Email: userEmail,
        },
      })
      .then((response) => {
        setEducationData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'Error fetching education data');
        setLoading(false);
      });
  }, [queryParams.Email]);

  useEffect(() => {
    const API_URL = 'http://192.168.0.106:5000/profilert/getInternDetails';
    const userEmail = queryParams.Email;

    axios
      .get(API_URL, {
        params: {
          Email: userEmail,
        },
      })
      .then((response) => {
        setInternData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'Error fetching intern data');
        setLoading(false);
      });
  }, [queryParams.Email]);

  useEffect(() => {
    const API_URL = 'http://192.168.0.106:5000/profilert/getProjectDetails';
    const userEmail = queryParams.Email;

    axios
      .get(API_URL, {
        params: {
          Email: userEmail,
        },
      })
      .then((response) => {
        setProjectData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || 'Error fetching project data');
        setLoading(false);
      });
  }, [queryParams.Email]);

  // Similar useEffect blocks for internData and projectData

  if (!session) {
    return <h1>Log in first</h1>;
  }

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className={profileStyles.profileBody}>
      <nav className={styles.nav1}>
      <ul className={styles.ul1}>
        <li className={styles.li1}>
          <Link className={styles.a1} to="/Stu_ProfessHome">Home</Link>
        </li>
        
        <li  className={styles.li1}>
          <Link className={styles.a1} to="/Stu_ProfessHome/StuProfessProfile">Profile</Link>
        </li>
        <li>
        <HandleLogOut />
        </li>
        
      </ul>
     
    </nav>
      <br></br>

      <div className={profileStyles.profileContainer}>
        <div className={profileStyles.flexContainer}>
          {userData && (
            <div className={profileStyles.userData}>
              <h1>{userData.displayName}</h1>
              <h2>{userData.designation}</h2>
              <h2>{userData.companyName}</h2>
              <p>{userData.city},{userData.state}</p>
            </div>
          )}

          <div>
            {imageSrc ? (
              <img
                className={profileStyles.profileImage}
                src={imageSrc}
                alt="Profile"
              />
            ) : (
              <p>Profile Image not available</p>
            )}
          </div>
        </div>
        
        {educationData && (

<div className={profileStyles.details}>
{educationData.length > 0 ?( 
<h2>Education Details for {queryParams.Email}</h2>
):(<></>) }

  {educationData.length > 0 ? (

    educationData.map((edu, index) => (
      <div key={index}>
        <p>Email: {edu.email}</p>
        <p>Level: {edu.level}</p>
        <p>School OR College: {edu.schoolOrCollege} </p>
        <p>Board or University: {edu.boardOrUniversity}</p>
        <p>Year of passing: {edu.yearOfPassing}</p>
        <p>Percentage: {edu.percentage}</p>
        <p>Description: {edu.description}</p>
       
        <hr />
      </div>
    ))
  ) : (
    <></>//<p>No education data available</p>
  )}
</div>
)}

{internData && (
<div className={profileStyles.detailsItem}>
        {educationData.length > 0 ?( 
  <h2>Intern Details for {queryParams.Email}</h2>
  ):(<></>) }

  {internData.length > 0 ? (
    internData.map((intern, index) => (
      <div key={index}>
        <p>Email: {intern.email}</p>
        <p>ExperienceType: {intern.experienceType}</p>
        <p>Organisation: {intern.organisation} </p>
        <p>Position: {intern.positionOfWork}</p>
        <p>WORK duration: {intern.Duration}</p>
        <p>Description: {intern.description}</p>
        
        <hr />
      </div>
    ))
  ) : (
    <></>//<p>No intern data available</p>
  )}
</div>
)}


{projectData && (
<div className={profileStyles.detailsItem}>
{educationData.length > 0 ?( 

  <h2>Project Details for {queryParams.Email}</h2>
  ):(<></>) }

  {projectData.length > 0 ? (
    projectData.map((project, index) => (
      <div key={index}>
        <p>Email: {project.email}</p>
        <p>projectTitle: {project.projectTitle}</p>
        <p>projectDescription: {project.projectDescription} </p>
        <p>technologies: {project.technologies}</p>
        <p>WORK duration: {project.Duration}</p>
        <p>githubLink: {project.githubLink}</p>
        <hr />
      </div>
    ))
  ) : (
    <></>//<p>No project data available</p>
  )}
</div>
)}

        {/* Render educationData, internData, and projectData as read-only here */}
      </div>
    </div>
  );
}

export default ShowSPProfile;
