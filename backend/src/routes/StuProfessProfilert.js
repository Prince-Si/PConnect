const express = require('express');
const SPProfileController = require('../controllers/StuProfessProfile');
const multer = require('multer');

const {storage, eduCertificatesStorage, internCertificatesStorage} = require('../../config/multer');


const router = express.Router();

const upload = multer({ storage: storage });
const uploadEduCertificate = multer({storage: eduCertificatesStorage});
const uploadInternCertificate = multer({storage: internCertificatesStorage});

router.post('/StuProfessProfile', SPProfileController.createUser);

router.get('/StuProfessProfileGet', SPProfileController.getUserData);


router.post('/uploadImage', upload.single('image'),SPProfileController.ProfileImageUpload);
router.post('/EduCertificateImageUpload',uploadEduCertificate.single('image'), SPProfileController.EduCertificateImageUpload);
router.post('/InternCertificateImageUpload',uploadInternCertificate.single('image'),SPProfileController.InternCertificateImageUpload)

router.get('/getProfileName', SPProfileController.getProfileName);

router.post('/EducationDetails', SPProfileController.EducationDetails);

router.get('/getEducationDetails', SPProfileController.getEducationDetails);

router.post('/ExperienceDetails',SPProfileController.ExperienceDetails);

router.get('/getInternDetails', SPProfileController.getInternDetails);

router.post('/ProjectDetails',SPProfileController.ProjectDetails);
router.get('/getProjectDetails',SPProfileController.getProjectDetails);

router.get('/getRandomProfiles',SPProfileController.getRandomProfiles);

router.get('/searchProfiles',SPProfileController.searchProfiles);




module.exports = router;