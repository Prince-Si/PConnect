import React, { useState } from 'react';
import axios from 'axios';

function InternCertificateUpload({ email,experienceType,organisation,positionOfWork,Duration }) {
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
      formData.append('Email_from_InternCertificate_Upload', email);
      formData.append('experienceType', experienceType);
      formData.append('organisation',organisation);
      formData.append('positionOfWork',positionOfWork);
      formData.append('Duration',Duration);
      formData.append('image', image);

      axios
        .post('http://192.168.0.106:5000/profilert/InternCertificateImageUpload', formData)
        .then((response) => {
            console.log('Image uploaded successfully');
          // Handle success, e.g., show a success message
        })
        .catch((error) => {
            console.error('Error uploading image:', error);
          // Handle error, e.g., show an error message
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
            <h2>Upload Certificate for above selected intern (image)</h2>
            <input
              type="file"
              id="internCertificatefileInput"
              accept="image/*"
              onChange={handleCertificateChange}
            />
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

export default InternCertificateUpload;
