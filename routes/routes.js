const urlConfig = require('../etc');

const {
    PerformerStatisticController,
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
    .route(`${urlConfig.USER.STATISTICS}${urlConfig.PARAMS.USER_NAME}`) // /user-statistics/:userName
    .get(PerformerStatisticController.getUserForecastStats);
routes
    .route(`${urlConfig.TOP_PERFORMERS}`) // /top-performers
    .get(PerformerStatisticController.getTopPerformersList);
routes
    .route(`${urlConfig.TOP_PERFORMERS}${urlConfig.PARAMS.PERIOD}`) // /top-performers/:period
    .get(PerformerStatisticController.getTopPerformersForPeriod);


module.exports = routes;
