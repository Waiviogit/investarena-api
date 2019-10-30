const mongoose = require('mongoose');
const config = require('../config');

const URI = `mongodb://${config.db.host}:${config.db.port}/${config.db.databaseWaivio}`;
mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('connection Waivio successful!'))
    .catch(error => console.log(error));

mongoose.connection.on('error', console.error.bind(console, 'MongoDB Waivio connection error:'));

mongoose.Promise = global.Promise;
mongoose.set('debug', process.env.NODE_ENV === 'development');

module.exports = {
    Mongoose: mongoose,
    models: {
        Post: require('./schemas/PostSchema'),
        Wobject: require('./schemas/WobjectSchema')
    }
};
