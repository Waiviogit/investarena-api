const { performerTypes } = require('../constants/performerStatistic');
const {
    getUserStatistic,
    getInstrumentStatistic,
    getTopPerformersByPeriod,
    getTopPerformersForAllPeriods,
    searchPerformersByName,
    getInstrumentTopPerformers
} = require('../models/PerformerStatisticModel');
const validators = require( './validators' );

const getUserForecastStats = async function (req, res, next) {
    const { userStatistic, error } = await getUserStatistic(req.params.name);
    if(error) {
        return next( error );
    }
    res.status(200).json(userStatistic);
};

const getInstrumentStats = async function (req, res, next) {
    const { instrumentStatistic, error } = await getInstrumentStatistic(req.params.id);
    if(error) {
        return next( error );
    }
    res.status(200).json(instrumentStatistic);
};

const getTopPerformersForPeriod = async function (req, res, next) {
    const { result, error } = await getTopPerformersByPeriod(req.params.period, req.query.limit, req.query.skip);
    if(error) {
        return next( error );
    }
    res.status(200).json(result);
};

const getTopPerformersList = async function (req, res, next) {
    const { result, error } = await getTopPerformersForAllPeriods();
    if(error) {
        return next( error );
    }
    res.status(200).json(result);
};

const searchInstrumentsStatistic = async function (req, res, next) {
    const { result, error } = await searchPerformersByName(
        req.params.name,
        decodeURIComponent(performerTypes.INSTRUMENT),
        req.query.limit
    );
    if(error) {
        return next( error );
    }
    res.status(200).json(result);
};

const getInstrumentPerformers = async function (req, res, next) {
    const value = validators.validate( {
        limit: req.query.limit,
        quote: req.params.quote,
    }, validators.performerStatistic.getInstrumentPerformersSchema, next );
    if(!value) return;

    const { result, error } = await getInstrumentTopPerformers( value );
    if(error) {
        return next( error );
    }
    res.status(200).json(result);
};

module.exports = {
    getUserForecastStats,
    getInstrumentStats,
    getTopPerformersForPeriod,
    getTopPerformersList,
    searchInstrumentsStatistic,
    getInstrumentPerformers
};
