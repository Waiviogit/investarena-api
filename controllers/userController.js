const { getForecastsByAuthor } = require('../models/ForecastModel');
const { getStatsByPeriods } = require('../utilities');

const getUserForecastStats = async function (req, res, next) {
    const forecasts = await getForecastsByAuthor(req.params.userName);
    const result = getStatsByPeriods(forecasts);
    res.status(200).json(result);
};

module.exports = { getUserForecastStats };
