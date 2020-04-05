const knex = require('knex');

const config = require('../knexfile.js');

// add this after adding local pg server connection in knexfile
const environment = process.env.DB_ENV || 'development';

// change config.development to 
module.exports = knex(config[environment]);