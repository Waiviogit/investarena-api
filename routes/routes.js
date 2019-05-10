const urlConfig = require('../etc');

const {
    WobjController
} = require('../controllers');

const { platform } = require('../platform');

const express = require('express');

const routes = express.Router();

routes.use(urlConfig.BASE_URL, routes);

routes
    .route(urlConfig.BROKER.AUTHORIZATION)
    .post(platform.authorization);
routes
    .route(urlConfig.BROKER.RECONNECT)
    .post(platform.reconnect);
routes
    .route(urlConfig.BROKER.REGISTRATION)
    .post(platform.registration);
routes
    .route('/create-instrument-wobjects')
    .post(WobjController.createWobjectsInstruments);

module.exports = routes;
