const { periods } = require('../../constants/performerStatistic');
const _ = require('lodash');

function getDatePoints() {
    const daysAgoPoints = [ 1, 7 ];
    const monthsAgoPoints = [ 1, 3, 6, 12, 24 ];
    const dates = {};
    const dateNow = new Date();

    daysAgoPoints.forEach(daysAmount =>
        dates[ `d${daysAmount}` ] = new Date().setUTCDate(dateNow.getUTCDate() - daysAmount)
    );
    monthsAgoPoints.forEach(monthsAmount =>
        dates[ `m${monthsAmount}` ] = new Date().setUTCMonth(dateNow.getUTCMonth() - monthsAmount)
    );
    return dates;
}

/**
 * Format input forecasts data to separated period
 * @param forecasts{Array} Array of forecasts
 * @returns {Array}
 */
function getStatsByPeriods(forecasts) {
    if (_.isEmpty(forecasts)) return [];
    const data = [ ...forecasts ];
    const datePoints = getDatePoints();

    let initProfitabilityParams = {
        pips: 0, successful_count: 0, failed_count: 0
    };
    // Object.keys(datePoints).forEach((pastDate) => {

    for (const pastDate of Object.keys(datePoints)) {
        const currPeriodForecasts = [];
        // find index of forecast current period (index or -1 if it not exist)
        // push all forecast by specified period to array
        let index = data.findIndex(forecast => forecast.createdAt >= datePoints[ pastDate ]);
        while (index >= 0) {
            currPeriodForecasts.push(data[ index ]);
            data.splice(index, 1);
            index = data.findIndex(forecast => forecast.createdAt >= datePoints[ pastDate ]);
        }
        const periodStats = currPeriodForecasts.reduce(
            (acc, curr) => {
                if (curr.expForecast.profitability > 0) acc.successful_count += 1;
                else acc.failed_count += 1;
                acc.pips += curr.expForecast.profitability;
                return acc;
            },
            initProfitabilityParams,
        );
        datePoints[ pastDate ] = { ...periodStats };
        initProfitabilityParams = datePoints[ pastDate ];
    }

    return datePoints;
}


/** function filters statistic values
 * if value for period is the same as previous one - remove it
 * example:
 *   input:  { d1: 1, d7: 1, m1: 1, m3: 1, m6: 2, m12: 3, m24: 3, name: 'usr', type: 'user' }
 *   output: { d1: 1, m6: 2, m12: 3, name: 'usr', type: 'user' };
 */
function uniqStatisticValues(stat) {
    if (stat) {
        const uniqValuesStat = { ...stat };
        for (let i = 0; i < periods.length; i += 1) {
            if (!stat[ periods[ i ] ] || stat[ periods[ i ] ] === stat[ periods[ i - 1 ] ]) {
                delete uniqValuesStat[ periods[ i ] ];
            }
        }
        return uniqValuesStat;
    }
    return null;
}

module.exports = {
    getStatsByPeriods,
    uniqStatisticValues
};
