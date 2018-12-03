
const { platform } = require('../platform');

const express = require('express');

const routes = express.Router();

routes.use('/investarena-api', routes);

routes.route('/broker/authorization')
    .post(platform.authorization);
// routes.route('/broker/registration')
//     .post(platform.registration);
module.exports = routes;
