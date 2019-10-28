const { Forecast } = require('../../models');
const { getStatsByPeriods } = require('./forecastStatisticsHelper');

const getUserSummaryStats = async ({ name }) => {
    try {
        const forecasts = await Forecast.getForecastsByAuthor(name);
        return { data: getStatsByPeriods(forecasts) };
    } catch (error) {
        return { error };
    }
};

module.exports = { getUserSummaryStats };
