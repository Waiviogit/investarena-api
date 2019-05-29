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
    .route(`${urlConfig.PERFORMERS.USER_STATISTICS}${urlConfig.PARAMS.NAME}`) // /user-statistics/:userName
    .get(PerformerStatisticController.getUserForecastStats);
routes
    .route(`${urlConfig.PERFORMERS.INSTRUMENT_STATISTICS}${urlConfig.PARAMS.ID}`) // /instrument-statistics/:id
    .get(PerformerStatisticController.getInstrumentStats);
routes
    .route(`${urlConfig.PERFORMERS.TOP}`) // /top-performers
    .get(PerformerStatisticController.getTopPerformersList);
routes
    .route(`${urlConfig.PERFORMERS.TOP}${urlConfig.PARAMS.PERIOD}`) // /top-performers/:period
    .get(PerformerStatisticController.getTopPerformersForPeriod);
routes
    .route(`${urlConfig.PERFORMERS.INSTRUMENTS_SEARCH}${urlConfig.PARAMS.NAME}`)
    .get(PerformerStatisticController.searchInstrumentsStatistic); // /search-instruments-stats

module.exports = routes;
