const mongoose = require('mongoose');
const config = require('../config');

const URI = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;
mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('connection successful!'))
    .catch(error => console.log(error));

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.Promise = global.Promise;

module.exports = {
    Mongoose: mongoose,
    models: {
        Forecast: require('./schemas/ForecastSchema'),
        PerformerStatistic: require('./schemas/PerformerStatisticSchema'),
    },
};
