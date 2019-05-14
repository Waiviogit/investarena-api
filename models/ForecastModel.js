const ForecastModel = require('../database').models.Forecast;

const getForecastsByAuthor = async function getForecastsByAuthor(userName) {
    const date = new Date();
    date.setUTCMonth(date.getUTCMonth() - 24);

    return await ForecastModel
      .find({ author: userName, createdAt: {$gte: date} }, 'quote createdAt profitabilityPercent')
      .lean();
};

module.exports = {
    getForecastsByAuthor,
};
