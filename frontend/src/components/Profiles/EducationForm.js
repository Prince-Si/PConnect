import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getSession } from '../../SessionManager';
import styles from '../../static/EditSPProfile.module.css';

function EducationForm() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const session = getSession();

  const [educationData, setEducationData] = useState({
    email: session.data.email,
    level: '',
    schoolOrCollege: '',
    boardOrUniversity: '',
    yearOfPassing: '',
    percentage: '',
    description: '',
  });

  const [isLevelChanged, setIsLevelChanged] = useState(false);

  console.log(session.data.email);
  const queryParams = {
    Email: session.data.email,
  };

  useEffect(() => {
    setIsLevelChanged(false);
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageName(selectedImage.name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData({
      ...educationData,
      [name]: value,
    });

    if (name === 'level') {
      setIsLevelChanged(true);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('level', educationData.level);
      console.log(educationData.level);

      await axios.post('http://192.168.0.106:5000/profilert/EduCertificateImageUpload', formData, {
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
      .post('http://192.168.0.106:5000/profilert/EducationDetails', educationData, {
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
      <h2>Add Education Details</h2>
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
            value={educationData.email}
            onChange={handleChange}
            className="form-control"
            readOnly
            style={{ backgroundColor: 'lightgrey' }}
          />
        </div>
        <div>
          <label>
            Education Level:
            <select
              name="level"
              value={educationData.level}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Undergraduation">Undergraduation</option>
              <option value="Postgraduation">Postgraduation</option>
              <option value="Ph.D.">Ph.D.</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>
            School/College:
            <input
              type="text"
              name="schoolOrCollege"
              value={educationData.schoolOrCollege}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Board/University:
            <input
              type="text"
              name="boardOrUniversity"
              value={educationData.boardOrUniversity}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Year of Passing:
            <input
              type="text"
              name="yearOfPassing"
              value={educationData.yearOfPassing}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Percentage:
            <input
              type="text"
              name="percentage"
              value={educationData.percentage}
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
              value={educationData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        
        <button type="submit">Save</button>
      </form>


      {isLevelChanged && (
          <div>
            <h2>Upload Certificate for above selected edu level(image)</h2>
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

export default EducationForm;
