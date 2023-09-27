// models/User.js
const mongoose = require('mongoose');
const { EduCertificateImageUpload } = require('../controllers/StuProfessProfile');

const userSchema = new mongoose.Schema({
  displayName: String,
  firstName: String,
  lastName: String,
  middleName: String,
  email: String,
  mobileNo: String,
  designation: String,
  address: String,
  city: String,
  state: String,
  companyName: String,
  degree: String,
  about: String,
});

const profileImageSchema = new mongoose.Schema({
  email: String,
  ProfileImageName: String,
})

const educationCertificateImageSchema = new mongoose.Schema({
  email: String,
  level: String,
  educationCertificateImageName: String,
})


const educationSchema = new mongoose.Schema({
  email: String,
  level: String,
  schoolOrCollege: String,
  boardOrUniversity: String,
  yearOfPassing: String,
  percentage: String,
  description: String,
  // Add more fields as needed
});

const internSchema = new mongoose.Schema({
    email: String,
    experienceType: String,
    organisation: String,
    positionOfWork: String,
    Duration: String,
    description: String,
    internCertificateImageName: String,
})

const projectSchema = new mongoose.Schema({
    email: String,
    projectTitle: String,
    projectDescription: String,
    technologies: String,
    Duration: String,
    githubLink: String,
})

const StuProfessUser = mongoose.model('StuProfessUser', userSchema);
const ProfileImage = mongoose.model('ProfileImage', profileImageSchema);
const StuProfessEdu = mongoose.model('StuProfessEdu', educationSchema);
const EduCertificateImage = mongoose.model('EduCertificateImage', educationCertificateImageSchema);
const StuProfessIntern = mongoose.model('StuProfessIntern',internSchema);
const StuProfessProject = mongoose.model('StuProfessProject',projectSchema);

module.exports = { StuProfessUser, ProfileImage, StuProfessEdu, EduCertificateImage, StuProfessIntern, StuProfessProject};
