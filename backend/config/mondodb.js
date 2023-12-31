const mongoose = require('mongoose');


const dbURI = 'mongodb://127.0.0.1:27017/PConnect';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const mongodb = mongoose.connection;

mongodb.on('connected', () => {
  console.log('Connected to MongoDB');
});


mongodb.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongodb.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', () => {
  mongodb.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});

module.exports = mongodb;