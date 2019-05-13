function getDatePoints() {
    const daysAgoPoints = [ 1, 7 ];
    const monthsAgoPoints = [ 1, 3, 6, 12, 24 ];
    const dates = {};
    const dateNow = new Date();

    daysAgoPoints.forEach(daysAmount =>
        dates[`d${daysAmount}`] = new Date().setUTCDate(dateNow.getUTCDate() - daysAmount)
    );
    monthsAgoPoints.forEach(monthsAmount =>
        dates[`m${monthsAmount}`] = new Date().setUTCMonth(dateNow.getUTCMonth() - monthsAmount)
    );
    return dates;
}

function getStatsByPeriods(forecasts) {
    if (!(forecasts && forecasts.length)) return [];
    const data = [...forecasts];
    const datePoints = getDatePoints();

    let initProfitability = 0;
    Object.keys(datePoints).forEach(pastDate => {
        const currPeriodForecasts = [];

        let index = data.findIndex(forecast => forecast.createdAt >= datePoints[pastDate]);
        while (index >= 0) {
            currPeriodForecasts.push(data[index]);
            data.splice(index, 1);
            index = data.findIndex(forecast => forecast.createdAt >= datePoints[pastDate]);
        }
        datePoints[pastDate] = Number.parseFloat(currPeriodForecasts.reduce(
            (acc, curr) => (acc + curr.profitabilityPercent),
            Number.parseFloat(initProfitability.toFixed(3)),
        ).toFixed(3));
        initProfitability = datePoints[pastDate];
    });

    return datePoints;
}

module.exports = {
    getStatsByPeriods,
};
