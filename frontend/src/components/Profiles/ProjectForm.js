import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getSession } from '../../SessionManager';
import styles from '../../static/EditSPProfile.module.css';

function ProjectForm() {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const session = getSession();

  const [projectData, setProjectData] = useState({
    email: session.data.email,
    projectTitle: '',
    projectDescription: '',
    technologies: '',
    Duration: '',
    githubLink: '',
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
    setProjectData({
      ...projectData,
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
      formData.append('level', projectData.level);
      console.log(projectData.level);

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
      .post('http://192.168.0.106:5000/profilert/ProjectDetails', projectData, {
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
      <h2>Add Project Details</h2>
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
            value={projectData.email}
            onChange={handleChange}
            className="form-control"
            readOnly
            style={{ backgroundColor: 'lightgrey' }}
          />
        </div>
        
        
        <div>
          <label>
          projectTitle:
            <input
              type="text"
              name="projectTitle"
              value={projectData.projectTitle}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            projectDescription:
            <input
              type="text"
              name="projectDescription"
              value={projectData.projectDescription}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
          technologies:
            <input
              type="text"
              name="technologies"
              value={projectData.technologies}
              onChange={handleChange}
              required
            />
          </label>
        </div>
       
        <div>
          <label>
          Duration:
            <textarea
              name="Duration"
              value={projectData.Duration}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
          githubLink:
            <textarea
              name="githubLink"
              value={projectData.githubLink}
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

export default ProjectForm;
