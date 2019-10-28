const { performerTypes } = require('../constants/performerStatistic');
const {
    getUserStatistic,
    getInstrumentStatistic,
    getTopPerformersByPeriod,
    getTopPerformersForAllPeriods,
    searchPerformersByName,
    getInstrumentTopPerformers
} = require('../models/PerformerStatisticModel');
const validators = require('./validators');
const { getUserSummaryStats } = require('../utilities/helpers/userSummaryForecastStatsHelper');

const getUserForecastStats = async function (req, res, next) {
    const { userStatistic, error } = await getUserStatistic(req.params.name);
    if (error) {
        return next(error);
    }
    res.status(200).json(userStatistic);
};

const getInstrumentStats = async function (req, res, next) {
    const { instrumentStatistic, error } = await getInstrumentStatistic(req.params.id);
    if (error) {
        return next(error);
    }
    res.status(200).json(instrumentStatistic);
};

const getTopPerformersForPeriod = async function (req, res, next) {
    const value = validators.validate({
        period: req.params.period,
        limit: req.query.limit,
        skip: req.query.skip
    }, validators.performerStatistic.getTopPerformersForPeriodSchema, next);
    if (!value) return;

    const { result, error } = await getTopPerformersByPeriod(value);
    if (error) {
        return next(error);
    }
    res.status(200).json(result);
};

const getTopPerformersList = async function (req, res, next) {
    const { result, error } = await getTopPerformersForAllPeriods();
    if (error) {
        return next(error);
    }
    res.status(200).json(result);
};

const searchInstrumentsStatistic = async (req, res, next) => {
    const value = validators.validate({
        searchString: req.params.name,
        performerType: performerTypes.INSTRUMENT,
        limit: req.query.limit
    }, validators.performerStatistic.searchInstrumentsStatisticSchema, next);
    if (!value) return;

    const { result, error } = await searchPerformersByName(value);
    if (error) {
        return next(error);
    }
    res.status(200).json(result);
};

const getInstrumentPerformers = async function (req, res, next) {
    const value = validators.validate({
        limit: req.query.limit,
        quote: req.params.quote
    }, validators.performerStatistic.getInstrumentPerformersSchema, next);
    if (!value) return;

    const { result, error } = await getInstrumentTopPerformers(value);
    if (error) {
        return next(error);
    }
    res.status(200).json(result);
};

const getUserSummaryForecastStats = async (req, res, next) => {
    const value = validators.validate({
        name: req.params.name
    }, validators.performerStatistic.getUserSummaryForecastStats, next);
    if (!value) return;

    const { data, error } = await getUserSummaryStats(value);
    if (error) {
        return next(error);
    }
    res.status(200).json(data);
};

module.exports = {
    getUserForecastStats,
    getInstrumentStats,
    getTopPerformersForPeriod,
    getTopPerformersList,
    searchInstrumentsStatistic,
    getInstrumentPerformers,
    getUserSummaryForecastStats
};
