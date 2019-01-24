const {
    WobjController
} = require('../controllers');

const { platform } = require('../platform');

const express = require('express');

const routes = express.Router();

routes.use('/investarena-api', routes);

routes.route('/broker/authorization')
    .post(platform.authorization);
routes.route('/broker/reconnect')
    .post(platform.reconnect);
routes.route('/broker/registration')
    .post(platform.registration);
routes.route('/create-instrument-wobjects')
    .post(WobjController.createWobjectsInstruments);
module.exports = routes;
