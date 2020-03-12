const ciadb = require('./ciadb_connect');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug', process.env.NODE_ENV === 'development');

module.exports = {
    Mongoose: ciadb,
    models: {
        Forecast: require('./schemas/ForecastSchema'),
        PerformerStatistic: require('./schemas/PerformerStatisticSchema'),
        postRef: require('./schemas/postRefSchema')
    }
};
