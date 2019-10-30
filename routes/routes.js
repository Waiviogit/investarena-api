const urlConfig = require('../etc');

const {
    ForecastController,
    PerformerStatisticController,
    PostController
} = require('../controllers');

const { platform } = require('../platform');

const express = require('express');

const routes = express.Router();

routes.use(urlConfig.BASE_URL, routes);

routes.route('/favicon.ico').get((req, res) => res.status(204));

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
    .route(`${urlConfig.PERFORMERS.USER_STATISTICS}${urlConfig.PARAMS.NAME}`) // /user-statistics/:name
    .get(PerformerStatisticController.getUserForecastStats);
routes
    .route(`${urlConfig.PERFORMERS.USER_SUMMARY_STATISTICS}${urlConfig.PARAMS.NAME}`) // /user-summary-statistics/:name
    .get(PerformerStatisticController.getUserSummaryForecastStats);
routes
    .route(`${urlConfig.PERFORMERS.USER_INSTRUMENT_STATISTICS}${urlConfig.PARAMS.NAME}`) // /user-instrument-statistics/:name
    .get(PerformerStatisticController.getUserInstrumentStats);
routes
    .route(`${urlConfig.PERFORMERS.INSTRUMENT_STATISTICS}${urlConfig.PARAMS.ID}`) // /instrument-statistics/:id
    .get(PerformerStatisticController.getInstrumentStats);
routes
    .route(`${urlConfig.PERFORMERS.TOP}`) // /top-performers
    .get(PerformerStatisticController.getTopPerformersList);
routes
    .route(`${urlConfig.PERFORMERS.TOP}${urlConfig.PARAMS.PERIOD}`) // /top-performers/:period[?limit=10&skip=0]
    .get(PerformerStatisticController.getTopPerformersForPeriod);
routes
    .route(`${urlConfig.PERFORMERS.INSTRUMENTS_SEARCH}${urlConfig.PARAMS.NAME}`)
    .get(PerformerStatisticController.searchInstrumentsStatistic); // /search-instruments-stats/:name[?limit=10]
routes
    .route(urlConfig.PERFORMERS.ACTIVE_FORECASTS)
    .get(ForecastController.activeForecasts);
routes
    .route(`${urlConfig.PERFORMERS.INSTRUMENT_PERFORMERS}${urlConfig.PARAMS.QUOTE}`)
    .get(PerformerStatisticController.getInstrumentPerformers); // /instrument-performers/:quote?limit=3
routes
    .route(`${urlConfig.POSTS.WITH_FORECAST_BY_USER}${urlConfig.PARAMS.NAME}`)
    .get(PostController.withForecastByUser); // /posts/with-forecast-by-user/:name
routes
    .route(`${urlConfig.POSTS.WITH_FORECAST_BY_WOBJECT}${urlConfig.PARAMS.AUTHOR_PERMLINK}`)
    .get(PostController.withForecastByWobject); // /posts/with-forecast-by-wobject/:author_permlink

module.exports = routes;
