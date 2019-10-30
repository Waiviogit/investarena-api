const waiviodb = require('./waiviodb_connect');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug', process.env.NODE_ENV === 'development');

module.exports = {
    Mongoose: waiviodb,
    models: {
        Post: require('./schemas/PostSchema'),
        Wobject: require('./schemas/WobjectSchema')
    }
};
