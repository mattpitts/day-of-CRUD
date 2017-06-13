const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const evironmentConfig = config[environment];
const knex = require('knex');
const connection = knex(evironmentConfig);

module.exports = connection;
