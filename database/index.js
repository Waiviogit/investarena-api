const wiadb = require('./wiadb_connect');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug', process.env.NODE_ENV === 'development');

module.exports = {
    Mongoose: wiadb,
    models: {
        Forecast: require('./schemas/ForecastSchema'),
        PerformerStatistic: require('./schemas/PerformerStatisticSchema')
    }
};
