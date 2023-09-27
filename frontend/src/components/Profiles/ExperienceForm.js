import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getSession } from '../../SessionManager';
import styles from '../../static/EditSPProfile.module.css';

function ExperienceForm() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const session = getSession();

  const [internData, setInternData] = useState({
    email: session.data.email,
    experienceType: '',
    organisation: '',
    positionOfWork: '',
    Duration: '',
    description: '',
    // You can add more fields as needed
  });

  const [isExperienceTypeChanged, setIsExperienceTypeChanged] = useState(false);

  console.log(session.data.email);
  const queryParams = {
    Email: session.data.email,
  };

  useEffect(() => {
    setIsExperienceTypeChanged(false);
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageName(selectedImage.name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternData({
      ...internData,
      [name]: value,
    });

    if (name === 'experienceType') {
      setIsExperienceTypeChanged(true);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('level', internData.level);
      console.log(internData.level);

      await axios.post('http://192.168.0.106:5000/profilert/InternCertificateImageUpload', formData, {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://192.168.0.106:5000/profilert/ExperienceDetails', internData, {
        params: queryParams,
      })
      .then((response) => {
        console.log('Education data saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving education data:', error);
      });
  };

  const handleImageNameClick = () => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div>
      <h2>Add Experience Details</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div className={styles.formgroup}>
          <label className={styles.label1} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={queryParams.Email}
            value={internData.email}
            onChange={handleChange}
            className="form-control"
            readOnly
            style={{ backgroundColor: 'lightgrey' }}
          />
        </div>
        <div>
          <label>
          experience Type:
            <select
              name="experienceType"
              value={internData.experienceType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Internship">Internship</option>
              <option value="Job">Job</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>
            organisation:
            <input
              type="text"
              name="organisation"
              value={internData.organisation}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            position Of Work:
            <input
              type="text"
              name="positionOfWork"
              value={internData.positionOfWork}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Duration:
            <input
              type="text"
              name="Duration"
              value={internData.Duration}
              onChange={handleChange}
              required
            />
          </label>
        </div>
       
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={internData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        
        <button type="submit">Save</button>
      </form>


      {isExperienceTypeChanged && (
          <div>
            <h2>Upload Certificate for above internship or any doc for work(image)</h2>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label htmlFor="fileInput">Select Image</label>
            {imageName && (
              <p onClick={handleImageNameClick} className={styles.imageName}>
                {imageName}
              </p>
            )}
            <button onClick={handleImageUpload}>Upload</button>
          </div>
        )}
    </div>
  );
}

export default ExperienceForm;
