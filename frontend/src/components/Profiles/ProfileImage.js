import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../static/ProfileImage.module.css';
import { getSession } from '../../SessionManager';


function ProfileImage({ onClose }) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(''); 
  const session = getSession();
  console.log(session.data.email);
  const queryParams = {
   
    Email: session.data.email,
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    setImageName(selectedImage.name);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      await axios.post('http://192.168.0.106:5000/profilert/uploadImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: queryParams, 
    });

      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageNameClick = () => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className={styles.profileImageContainer}>
      <div className={styles.popup}>
        <h2>Upload Profile Image</h2>
        <input
          type="file"
          id="profileInput" 
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="profileInput">Select Image</label>
        {imageName && (
          <p onClick={handleImageNameClick} className={styles.imageName}>
            {imageName}
          </p>
        )}
        <button onClick={handleImageUpload}>Upload</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProfileImage;
