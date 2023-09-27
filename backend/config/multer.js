const express = require('express');
const router = express.Router();
const multer = require('multer'); // Install multer if you haven't already
const path = require('path');
const fs = require('fs');

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = './uploads/'; // Specify your upload directory
    fs.mkdirSync(uploadDir, { recursive: true });
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});


const eduCertificatesStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = './uploads/EduCertificates/'; // Specify your upload directory
    fs.mkdirSync(uploadDir, { recursive: true });
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const internCertificatesStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = './uploads/InternCertificates/'; // Specify your upload directory
    fs.mkdirSync(uploadDir, { recursive: true });
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});


module.exports = {storage, eduCertificatesStorage, internCertificatesStorage};

