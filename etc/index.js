const apiConfig = require('./api-config');

module.exports = apiConfig[ process.env.NODE_ENV || 'development' ];
