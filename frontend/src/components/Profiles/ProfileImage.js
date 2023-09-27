import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../static/ProfileImage.module.css'; // Import the CSS module
import { getSession } from '../../SessionManager';


function ProfileImage({ onClose }) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(''); // State to store the selected image's name
  const session = getSession();
  console.log(session.data.email);
  const queryParams = {
    // Add your query parameters here
    // For example:
    Email: session.data.email, // Replace with the actual user ID you want to reference
    // Other parameters...
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Set the selected image's name
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
      params: queryParams, // Pass the query parameters here
    });

      console.log('Image uploaded successfully');
      // You can also update the user's profile data in the database if needed
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageNameClick = () => {
    // If an image is selected, open a new window/tab to preview the image
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
          id="profileInput" // Add the id attribute here
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
