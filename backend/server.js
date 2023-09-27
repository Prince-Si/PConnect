const appobj= require('./config/App')
const port = 5000;
const IP_ADDRESS = '192.168.0.106';

appobj.listen(port,IP_ADDRESS, () => {
  console.log(`Server is running on ${IP_ADDRESS}:${port}`);
});


/*
appobj.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/