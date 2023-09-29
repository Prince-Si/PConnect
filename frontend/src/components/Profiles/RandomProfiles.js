import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowSPProfile from './ShowSPProfile';
import { useNavigate } from 'react-router-dom';

const RandomProfile = () => {
  const [randomProfiles, setRandomProfiles] = useState([]);
  const [selectedProfile,setSelectedProfile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    const fetchRandomProfiles = async () => {
      try {
        const response = await axios.get('http://192.168.0.106:5000/profilert/getRandomProfiles?count=50');
        setRandomProfiles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching random profiles:', error);
      }
    };

    fetchRandomProfiles();
  }, []);

  const handleProfileClick = (profileEmail) => {
    setSelectedProfile(profileEmail);
    navigate(`/showSPProfiles/${profileEmail}`);
  };

  return (
    <div>
      <h2>Random Profiles</h2>
      {randomProfiles.map((profile, index) => (
        <div key={index} onClick={() => handleProfileClick(profile.email)}
        style={{border:'solid', borderColor:'blueviolet', borderRadius:'30px', margin:'20px'}}
        >
          <p>Name: {profile.firstName} {profile.middleName} {profile.lastName}</p>
          <p>Email: {profile.email}</p>
         
        </div>
      ))}

    </div>
  );
};

export default RandomProfile;
