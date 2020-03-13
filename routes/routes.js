const {
    ForecastController,
    PerformerStatisticController,
    PostController
} = require('../controllers');

const { platform } = require('../platform');
const { Router } = require('express');

const routes = new Router();
const apiRoutes = new Router();

routes.use('/investarena-api', apiRoutes);

routes.route('/favicon.ico').get((req, res) => res.status(204));

apiRoutes.route('/broker/authorization')
    .post(platform.authorization);
apiRoutes.route('/broker/reconnect')
    .post(platform.reconnect);
apiRoutes.route('/broker/registration')
    .post(platform.registration);
apiRoutes.route('/user-statistics/:name')
    .get(PerformerStatisticController.getUserForecastStats);
apiRoutes.route('/user-summary-statistics/:name')
    .get(PerformerStatisticController.getUserSummaryForecastStats);
apiRoutes.route('/user-instrument-statistics/:name')
    .get(PerformerStatisticController.getUserInstrumentStats);
apiRoutes.route('/instrument-statistics/:id')
    .get(PerformerStatisticController.getInstrumentStats);
apiRoutes.route('/top-performers')
    .get(PerformerStatisticController.getTopPerformersList);
apiRoutes.route('/top-performers/:period')
    .get(PerformerStatisticController.getTopPerformersForPeriod);
apiRoutes.route('/search-instruments-stats/:name')
    .get(PerformerStatisticController.searchInstrumentsStatistic);
apiRoutes.route('/active_forecasts')
    .get(ForecastController.activeForecasts);
apiRoutes.route('/instrument-performers/:quote')
    .get(PerformerStatisticController.getInstrumentPerformers); // /instrument-performers/:quote?limit=3
apiRoutes.route('/posts/with-forecast-by-user/:name')
    .get(PostController.withForecastByUser); // /posts/with-forecast-by-user/:name (beaxy done)
apiRoutes.route('/posts/with-forecast-by-wobject/:author_permlink')
    .get(PostController.withForecastByWobject); // /posts/with-forecast-by-wobject/:author_permlink (beaxy done)

module.exports = routes;
