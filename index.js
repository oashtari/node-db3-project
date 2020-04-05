// ADD IF RUNNING LOCAL POSTGRES -- instructions in knexfile related to running on local postgres
// require('dotenv').config();

const server = require('./server.js');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});