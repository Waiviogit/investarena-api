const mongoose = require('mongoose');

const ForecastSchema = new mongoose.Schema({
    id: {
        type: String, required: true, index: true, unique: true,
    },
    author: {
        type: String, required: true, index: true, unique: false,
    },
    permlink: { type: String, required: true },
    quote: { type: String, lowercase: true, required: true },
    createdAt: { type: Date, required: true },
    profitabilityPercent: { type: Number, required: true },
    expForecast: {
        id: { type: String },
        expiredAt: { type: Date },
        profitability: { type: Number, required: true, default: 0 },
        bars: [{
            closeAsk: { type: Number },
            closeBid: { type: Number },
            highAsk: { type: Number },
            highBid: { type: Number },
            lowAsk: { type: Number },
            lowBid: { type: Number },
            openAsk: { type: Number },
            openBid: { type: Number },
            time: { type: Number },
        }],
        rate: {
            quote: {
                security: { type: String, required: true },
                bidPrice: { type: String },
                askPrice: { type: String },
                expiredByTime: { type: Boolean },
                timeScale: { type: String },
            },
            cross_rate: { type: Number, default: null },
        },
    },
},
{
    toObject: { virtuals: true }, timestamps: true,
});


module.exports = mongoose.model('Forecast', ForecastSchema);
