const ForecastModel = require('../database').models.Forecast;
const { getForecasts } = require( '../utilities/redis/redisGetter' );

const getForecastsByAuthor = async function getForecastsByAuthor(userName) {
    const date = new Date();
    date.setUTCMonth(date.getUTCMonth() - 24);

    return await ForecastModel
      .find({ author: userName, createdAt: {$gte: date} }, 'quote createdAt profitabilityPercent')
      .lean();
};

const getActiveForecasts = async( data ) => {
    const name = data.name ? data.name : '*';
    const forecasts = await getForecasts( {name: name, quote: data.quote} );

    return { forecasts: forecasts };
};

module.exports = {
    getForecastsByAuthor, getActiveForecasts
};
