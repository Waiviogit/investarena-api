const {
    ForecastController,
    PerformerStatisticController,
    PostController
} = require('../controllers');

const { platform } = require('../platform');
const { Router } = require('express');

const routes = new Router();

routes.use('/investarena-api', routes);

routes.route('/favicon.ico').get((req, res) => res.status(204));

routes.route('/broker/authorization')
    .post(platform.authorization);
routes.route('/broker/reconnect')
    .post(platform.reconnect);
routes.route('/broker/registration')
    .post(platform.registration);
routes.route('/user-statistics/:name')
    .get(PerformerStatisticController.getUserForecastStats);
routes.route('/user-summary-statistics/:name')
    .get(PerformerStatisticController.getUserSummaryForecastStats);
routes.route('/user-instrument-statistics/:name')
    .get(PerformerStatisticController.getUserInstrumentStats);
routes.route('/instrument-statistics/:id')
    .get(PerformerStatisticController.getInstrumentStats);
routes.route('/top-performers')
    .get(PerformerStatisticController.getTopPerformersList);
routes.route('/top-performers/:period')
    .get(PerformerStatisticController.getTopPerformersForPeriod);
routes.route('/search-instruments-stats/:name')
    .get(PerformerStatisticController.searchInstrumentsStatistic);
routes.route('/active_forecasts')
    .get(ForecastController.activeForecasts);
routes.route('/instrument-performers/:quote')
    .get(PerformerStatisticController.getInstrumentPerformers); // /instrument-performers/:quote?limit=3
routes.route('/posts/with-forecast-by-user/:name')
    .get(PostController.withForecastByUser); // /posts/with-forecast-by-user/:name (beaxy done)
routes.route('/posts/with-forecast-by-wobject/:author_permlink')
    .get(PostController.withForecastByWobject); // /posts/with-forecast-by-wobject/:author_permlink (beaxy done)

module.exports = routes;
