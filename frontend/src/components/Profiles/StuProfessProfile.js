import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSession } from '../../SessionManager';
import styles from '../../static/navbar1.module.css';
import EditSPProfile from './EditSPProfile';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import EduCertificateUpload from './EduCertificateUpload';
import InternCertificateUpload from './InternCertificateUpload';
import profileStyles from '../../static/profileStyle.module.css';
import Logout from '../login-registration-forms/logoutButton';

function StuProfessProfiles() {
  const session = getSession();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isProfileImageOpen, setIsProfileImageOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [educationData, setEducationData] = useState([]);
  const [internData, setInternData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const queryParams = {
    Email: session.data.email,
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleProfileImageClick = () => {
    setIsProfileImageOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const handleCloseProfileImage = () => {
    setIsProfileImageOpen(false);
  };

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
            <Link className={styles.a1} to="/Stu_ProfessHome">
              Home
            </Link>
          </li>
          
          <li className={styles.li1}>
            <Link
              className={styles.a1}
              to="/Stu_ProfessHome/StuProfessProfile"
            >
              Profile
            </Link>
          </li>
          <li className={styles.li1}>
            <button
              className={styles.editButton}
              onClick={handleEditProfileClick}
            >
              Edit Profile
            </button>
          </li>

          <li className={styles.li1}>
            
              <Logout />
           
          </li>
        </ul>
      </nav>
      <br></br>

      <div className={profileStyles.profileContainer}> {/* Apply profile container styles */}


      <div className={profileStyles.flexContainer}>
  
  {userData && (
    <div className={profileStyles.userData}>
      <h1>{userData.displayName}</h1>
      <h2>{userData.designation}</h2>
      <h2>{userData.companyName}</h2>
      <p>{userData.city},{userData.state}</p>
      <button className={styles.editButton} onClick={handleProfileImageClick}>
        Upload Profile Image
      </button>
    </div>
  )}

<div >
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
              <EduCertificateUpload
                email={edu.email}
                level={edu.level}
              />
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
              <InternCertificateUpload
                email={intern.email}
                experienceType={intern.experienceType}
                organisation={intern.organisation}
                positionOfWork={intern.positionOfWork}
                Duration={intern.Duration}
              />
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
      </div>

      {isEditProfileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            left: '30%',
            zIndex: 999,
            overflowY: 'auto',
          }}
        >
          <EditSPProfile onClose={handleCloseEditProfile} />
        </div>
      )}
      {isProfileImageOpen && (
  <ProfileImage onClose={handleCloseProfileImage} />
)}

    </div>
  );
}

export default StuProfessProfiles;
