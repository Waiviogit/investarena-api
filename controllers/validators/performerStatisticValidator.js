const Joi = require('joi');
const { periods } = require('../../constants/performerStatistic');

exports.getInstrumentPerformersSchema = Joi.object().keys({
    quote: Joi.string().invalid('').required(),
    limit: Joi.number().integer().min(0).default(5)
});

exports.getTopPerformersForPeriodSchema = Joi.object().keys({
    period: Joi.string().valid([ ...periods ]).default('d1'),
    limit: Joi.number().integer().min(0).default(5),
    skip: Joi.number().integer().min(0).default(0)
});

exports.searchInstrumentsStatisticSchema = Joi.object().keys({
    limit: Joi.number().integer().min(0).default(5),
    searchString: Joi.string().required(),
    performerType: Joi.string()
});

exports.getUserSummaryForecastStats = Joi.object().keys({
    name: Joi.string().required()
});

exports.getUserInstrumentStats = Joi.object().keys({
    name: Joi.string().required(),
    limit: Joi.number().integer().min(0).max(300).default(5),
    skip: Joi.number().integer().min(0).default(0),
    sortBy: Joi.string().valid([ 'count', 'pips', 'quote' ]).default('count'),
    sortDirection: Joi.number().valid([ -1, 1 ]).default(-1)
});
