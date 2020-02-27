const ForecastModel = require('../database').models.Forecast;
const { getForecasts } = require('../utilities/redis/redisGetter');
const quote = require('../api/quotes');

const getForecastsByAuthor = async (userName) => {
    const date = new Date();
    date.setUTCMonth(date.getUTCMonth() - 24);
    const { quoteNames, error } = await quote.getValidQuoteNames();
    if (error) return { error };
    return{ result: await ForecastModel
        .find({
            author: userName,
            createdAt: { $gte: date },
            'expForecast.rate.quote.security': { $in: quoteNames }
        },
        'quote createdAt profitabilityPercent expForecast')
        .lean() };
};

const getActiveForecasts = async (data) => {
    const name = data.name ? data.name : '*';
    const forecasts = await getForecasts({ name: name, quote: data.quote });

    return { forecasts: forecasts };
};

const fromAggregation = async (pipeline) => {
    try {
        const result = await ForecastModel.aggregate(pipeline);
        return { result };
    } catch (error) {
        return { error };
    }
};

module.exports = {
    getForecastsByAuthor, getActiveForecasts, fromAggregation
};
