const ForecastModel = require('../database').models.Forecast;
const { getForecasts } = require('../utilities/redis/redisGetter');

const getForecastsByAuthor = async (userName) => {
    const date = new Date();
    date.setUTCMonth(date.getUTCMonth() - 24);

    return await ForecastModel
        .find({ author: userName, createdAt: { $gte: date } }, 'quote createdAt profitabilityPercent expForecast')
        .lean();
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
