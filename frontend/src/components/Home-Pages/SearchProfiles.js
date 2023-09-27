import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SearchProfiles = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // Function to fetch search results based on the query
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://192.168.0.106:5000/profilert/searchProfiles?query=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    // Fetch results when the query changes
    if (query) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  const handleProfileClick = (profileEmail) => {
    setSelectedProfile(profileEmail);
    navigate(`/showSPProfiles/${profileEmail}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search profiles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((profile) => (
          <li key={profile._id}  onClick={() => handleProfileClick(profile.email)}>
            {profile.firstName} {profile.lastName} - {profile.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchProfiles;
