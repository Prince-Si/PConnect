// controllers/userController.js
const { StuProfessUser, ProfileImage, StuProfessEdu, EduCertificateImage, StuProfessIntern, StuProfessProject} = require('../models/stu_prof_profiles');
const userModel = require('../models/user');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');



const {storage, eduCertificatesStorage} = require('../../config/multer');


const upload = multer({ storage: storage });
const uploadEduCertificate = multer({ storage: eduCertificatesStorage });

exports.ProfileImageUpload = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const imageFileName = req.file.filename;
    const { Email } = req.query;
  
    try {
      const profileData = await ProfileImage.findOne({ email: Email });
      const prevImageFileName = profileData ? profileData.ProfileImageName : null;
  
      if (prevImageFileName) {
        const imagePath = path.join(__dirname, '../../uploads', prevImageFileName); 
        fs.unlinkSync(imagePath);
      }
  
      if (profileData) {
        profileData.email = Email;
        profileData.ProfileImageName = imageFileName;
        await profileData.save();
      } else {
        const newProfile = new ProfileImage({ email: Email, ProfileImageName: imageFileName });
        await newProfile.save();
      }
  
      res.status(200).json({ message: 'Image uploaded successfully', imageFileName });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  };
  

  exports.EduCertificateImageUpload = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const imageFileName = req.file.filename;
    const { Email } = req.query;
    console.log(Email);
    const {Email_from_EduCertificate_Upload } = req.body;
    console.log(Email_from_EduCertificate_Upload);
    const level = req.body.level;
  
    try {
      const educationcertificateData = await EduCertificateImage.findOne({
        $or: [
          { 'email': Email },
          { 'email': Email_from_EduCertificate_Upload },
        ],
        'level': level
      });
      const prevImageFileName = educationcertificateData ? educationcertificateData.educationCertificateImageName : null;
  
      if (prevImageFileName) {
        const imagePath = path.join(__dirname, '../../uploads/EduCertificates', prevImageFileName); // Update with your upload directory path
        fs.unlinkSync(imagePath);
      }
  
      if (educationcertificateData) {
        educationcertificateData.email = Email;
        educationcertificateData.level = level;
        educationcertificateData.educationCertificateImageName = imageFileName;
        await educationcertificateData.save();
      } else {
        const newProfile = new EduCertificateImage({ email: Email,level:level, educationCertificateImageName: imageFileName });
        await newProfile.save();
      }
  
      res.status(200).json({ message: 'Image uploaded successfully', imageFileName });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  };


  exports.InternCertificateImageUpload = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const imageFileName = req.file.filename;
    const { Email } = req.query;
    console.log(Email);
    const {Email_from_InternCertificate_Upload,experienceType,organisation,positionOfWork,Duration } = req.body;
    console.log(Email_from_InternCertificate_Upload);
    const level = req.body.level;
  
    try {
      const interncertificateData = await StuProfessIntern.findOne({
        $or: [
          { 'email': Email },
          { 'email': Email_from_InternCertificate_Upload },
        ],
        'experienceType': experienceType ,
        'organisation':organisation,
        'positionOfWork':positionOfWork,
        'Duration':Duration,
      });
      const prevImageFileName = interncertificateData ? interncertificateData.internCertificateImageName : null;
  
      if (prevImageFileName) {
        const imagePath = path.join(__dirname, '../../uploads/InternCertificates', prevImageFileName); // Update with your upload directory path
        fs.unlinkSync(imagePath);
      }
  
      if (interncertificateData) {
        interncertificateData.internCertificateImageName = imageFileName;
        await interncertificateData.save();
      } 
  
      res.status(200).json({ message: 'Image uploaded successfully', imageFileName });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Error uploading image' });
    }
  };
  


exports.createUser = async (req, res) => {
 
    const { email, mobileNo } = req.body;
    userModel.updateUser(mobileNo, email, (err, results) => {
        if (err) {
          console.error('Login query error:', err);
          res.status(500).json({ error: 'Login failed' });
        }
        
      });
try {
    const { Email } = req.query;
    const userData = await StuProfessUser.findOne({ 'email': Email });

    if (userData) {
      
      userData.set(req.body); 
      await userData.save(); 
      res.status(200).json(userData);
    } else {
      const newUser = new StuProfessUser({ ...req.body, email: Email });
      await newUser.save(); 
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating or updating user' });
  }
};

exports.EducationDetails = async (req, res) => {
  const { level,email } = req.body;
  console.log('EduEDetails funct is called');
  console.log(level);
  console.log(email);

  try {
    const { Email } = req.query;
    console.log(Email);
    const eduData = await StuProfessEdu.findOne({
      $and: [
        { 'email': Email },
        { 'level': level }
      ]
    });
    console.log(eduData);

    if (eduData) {
      eduData.set({ ...req.body }); 
      await eduData.save(); 
      res.status(200).json(eduData);
    } else {
      const newEdu = new StuProfessEdu({ ...req.body }); 
      await newEdu.save();
      res.status(200).json(newEdu);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating or updating Education' });
  }
};

exports.getEducationDetails = async (req, res) => {
  console.log('getEducationDetails funct is called.')
  const { Email } = req.query;
  console.log(Email);
  try {
    const eduData = await StuProfessEdu.find({ 'email': Email });

    if (eduData.length > 0) {
      res.status(200).json(eduData);
    } else {
      res.status(404).json({ error: 'Education data not found for the given email' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching education data' });
  }
};



exports.ExperienceDetails = async (req, res) => {
  const { email,experienceType,organisation,positionOfWork,Duration,description } = req.body;
  console.log('ExperienceDetails funct is called');
  console.log(email);

  try {
    const { Email } = req.query;
    console.log(Email);
    const internData = await StuProfessIntern.findOne({
      $and: [
        { 'email': Email },
        { 'experienceType': experienceType },
        {'organisation':organisation},
        {'positionOfWork':positionOfWork},
        {'Duration':Duration},
      ]
    });
    console.log(internData);

    if (internData) {
      internData.set({ ...req.body }); 
      await internData.save();
      res.status(200).json(internData);
    } else {
      const newIntern = new StuProfessIntern({ ...req.body }); 
      await newIntern.save(); 
      res.status(200).json(newIntern);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating or updating Experience' });
  }
};

exports.getInternDetails = async (req, res) => {
  console.log('getInternDetails funct is called.')
  const { Email } = req.query;
  console.log(Email);
  try {
    const internData = await StuProfessIntern.find({ 'email': Email });

    if (internData.length > 0) {
      res.status(200).json(internData);
    } else {
      res.status(404).json({ error: 'intern data not found for the given email' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching intern data' });
  }
};


exports.ProjectDetails = async (req, res) => {
  console.log('ProjectDetails funct is called');
  const {email} = req.body;
  const {projectTitle} = req.body;
  const {projectDescription} = req.body;
  const {technologies} = req.body;
  const {Duration} = req.body;
  const {githubLink}= req.body;
  
  console.log(email,projectTitle, projectDescription, technologies, Duration, githubLink);

  try {
    const { Email } = req.query;
    console.log(Email);
      // User data doesn't exist, create a new user
      const newProject = new StuProfessProject({ 
        'email':email,
        'projectTitle':projectTitle,
        'projectDescription':projectDescription,
        'technologies':technologies,
        'Duration':Duration,
        'githubLink':githubLink,
       }); 
      await newProject.save(); 
      res.status(200).json(newProject);
    }
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating or updating Project' });
  }
};

exports.getProjectDetails = async (req, res) => {
  console.log('getProjectDetails funct is called.')
  const { Email } = req.query;
  console.log(Email);
  try {
    const projectData = await StuProfessProject.find({ 'email': Email });

    if (projectData.length > 0) {
      res.status(200).json(projectData);
    } else {
      res.status(404).json({ error: 'Project data not found for the given email' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching Project data' });
  }
};


exports.getUserData = async (req, res) => {
    console.log('getUserData funct called')
    const { Email } = req.query;
   
  try {
    const userData = await StuProfessUser.findOne({'email': Email }); 
    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ message: 'User data not found' });
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
};

exports.getProfileName = async (req, res) => {
    console.log('getProfileName funct called')
    const { Email } = req.query;
   
  try {
    const profileData = await ProfileImage.findOne({'email': Email }); 
    if (profileData) {
      res.status(200).json(profileData);
    } else {
      res.status(404).json({ message: 'profile data not found' });
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ error: 'Error fetching profile data' });
  }
};



// controllers/profileController.js


exports.getRandomProfiles = async (req, res) => {
  try {
    const count = req.query.count || 50;
    const availableProfiles = await StuProfessUser.find({}).limit(50); // Retrieve up to 50 profiles
    const randomProfiles = shuffleArray(availableProfiles).slice(0, Math.min(count, availableProfiles.length));
    res.json(randomProfiles);
  } catch (error) {
    console.error('Error fetching random profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


exports.searchProfiles = async (req, res) => {
  try {
    const { query } = req.query; 

    // Perform a database query to find profiles that match the query
    const results = await StuProfessUser.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } }, 
        { lastName: { $regex: query, $options: 'i' } }, 
        { email: { $regex: query, $options: 'i' } }, 
      ],
    });

    res.json(results);
  } catch (error) {
    console.error('Error searching profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
