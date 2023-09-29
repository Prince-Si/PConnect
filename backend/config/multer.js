const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');

// Defining storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = './uploads/'; 
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
    const uploadDir = './uploads/EduCertificates/';
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
    const uploadDir = './uploads/InternCertificates/'; 
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

