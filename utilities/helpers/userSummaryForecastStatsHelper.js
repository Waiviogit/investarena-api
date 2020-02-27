const _ = require('lodash');
const { Forecast } = require('../../models');
const { getStatsByPeriods } = require('./forecastStatisticsHelper');
const quotes = require('../../api/quotes');

const getUserSummaryStats = async ({ name }) => {
    try {
        const forecasts = await Forecast.getForecastsByAuthor(name);
        return { data: getStatsByPeriods(forecasts) };
    } catch (error) {
        return { error };
    }
};

const getStatsByInstruments = async ({ name, limit, skip, sortBy, sortDirection }) => {
    const { result, error } = await Forecast.fromAggregation(getStatsByInstrumentPipeline({ name, limit, skip, sortBy, sortDirection }));
    if(error) return { error };
    const quoteNames = await quotes.getValidQuoteNames();
    const validPosts = _.filter(result, (res) => _.includes(quoteNames, res.quote));
    return{ result: validPosts };
};

const getStatsByInstrumentPipeline = ({ name, limit, skip, sortBy, sortDirection }) => {
    return [
        { $match: { author: name } },
        {
            $group: {
                _id: '$expForecast.rate.quote.security',
                count: { $sum: 1 },
                pips: { $sum: '$expForecast.profitability' }
            }
        },
        { $project: { _id: 0, quote: '$_id', count: 1, pips: 1 } },
        { $sort: { [ sortBy ]: sortDirection } },
        { $skip: skip },
        { $limit: limit }
    ];
};


module.exports = { getUserSummaryStats, getStatsByInstruments };

