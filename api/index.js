const ApiClient = require('./client');
// const config = require('../etc/api-config')[process.env.NODE_ENV];

const apiClient = new ApiClient();

module.exports = apiClient;