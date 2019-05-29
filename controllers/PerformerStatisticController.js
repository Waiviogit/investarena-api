const {
    getUserStatistic,
    getInstrumentStatistic,
    getTopPerformersByPeriod,
    getTopPerformersForAllPeriods
} = require('../models/PerformerStatisticModel');

const getUserForecastStats = async function (req, res, next) {
    const { userStatistic, error } = await getUserStatistic(req.params.userName);
    if(error) {
        return next();
    }
    res.status(200).json(userStatistic);
};

const getInstrumentStats = async function (req, res, next) {
    const { instrumentStatistic, error } = await getInstrumentStatistic(req.params.id);
    if(error) {
        return next();
    }
    res.status(200).json(instrumentStatistic);
};

const getTopPerformersForPeriod = async function (req, res, next) {
    const { result, error } = await getTopPerformersByPeriod(req.params.period, req.query.limit, req.query.skip);
    if(error) {
        return next();
    }
    res.status(200).json(result);
};

const getTopPerformersList = async function (req, res, next) {
    const { result, error } = await getTopPerformersForAllPeriods();
    if(error) {
        return next();
    }
    res.status(200).json(result);
};

const searchInstrumentsStatistic = async function (req, res, next) {
    return next();
};

module.exports = {
    getUserForecastStats,
    getInstrumentStats,
    getTopPerformersForPeriod,
    getTopPerformersList,
    searchInstrumentsStatistic,
};
