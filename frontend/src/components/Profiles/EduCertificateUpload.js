import React, { useState } from 'react';
import axios from 'axios';

function EduCertificateUpload({ email, level }) {
  const [image, setCertificate] = useState(null);
  const [imageName, setImageName] = useState('');


  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    setCertificate(file);
    setImageName(file.name);

  };

  const handleUpload = () => {
    if (image) {
      const formData = new FormData();
      formData.append('Email_from_EduCertificate_Upload', email);
      formData.append('level', level);
      formData.append('image', image);

      axios
        .post('http://192.168.0.106:5000/profilert/EduCertificateImageUpload', formData)
        .then((response) => {
            console.log('Image uploaded successfully');
        })
        .catch((error) => {
            console.error('Error uploading image:', error);
        });
    }
  };

  const handleImageNameClick = () => {
    if (image) {
      const certificateURL = URL.createObjectURL(image);
      window.open(certificateURL, '_blank');
    }
  };

  return (
    <div>


      <div>
            <h2>Upload Certificate for above selected edu level(image)</h2>
            <input
              type="file"
              id="EduCertificatefileInput"
              accept="image/*"
              onChange={handleCertificateChange}
            />
            <label htmlFor="EduCertificatefileInput">Select Image</label>
            {imageName && (
              <p onClick={handleImageNameClick} >
                {imageName}
              </p>
            )}
            <button onClick={handleUpload}>Upload</button>
          </div>
    </div>
  );
}

export default EduCertificateUpload;
