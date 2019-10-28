const {PerformerStatistic, Forecast} = require('../database').models;
const { periods, performerTypes } = require('../constants/performerStatistic');
const { asyncForEach } = require('../utilities/helpers/common');
const { uniqStatisticValues } = require('../utilities/helpers/forecastStatisticsHelper');

const getUserStatistic = async function getUserStatisticByName(userName) {
    try {
        const userStatistic = await PerformerStatistic
            .findOne({ id: userName, type: performerTypes.USER }, '-avatar -id -_id -__v')
            .lean();
        if (!userStatistic) {
            return { error: { status: 404, message: `${userName} do not have any stat`}};
        }
        return { userStatistic: uniqStatisticValues(userStatistic) };
    } catch (error) {
        return { error };
    }
};

const getInstrumentStatistic = async function getInstrumentStatByAuthorPermlink(id) {
    try {
        const instrumentStatistic = await PerformerStatistic
            .findOne({ id }, '-_id -__v')
            .lean();
        return { instrumentStatistic };
    } catch (error) {
        return { error };
    }
};

const getTopPerformersByPeriod = async function getTopPerformersByPeriod({ period, limit = 5, skip = 0 }) {
    try {
        const result = await PerformerStatistic
            .find({}, `${period} name avatar type id -_id`)
            .sort({ [period]: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        return { result };
    } catch (error) {
        return { error };
    }
};

const getTopPerformersForAllPeriods = async function getTopPerformersForAllPeriods() {
    try {
        const result = {};
        await asyncForEach(periods, async period => {
            const { error:getPeriodStatErr, result:statForPeriod} = await getTopPerformersByPeriod({period, limit:5});
            if(getPeriodStatErr) {
                return { error: getPeriodStatErr };
            }
            result[period] = statForPeriod;
        });
        return { result };

    } catch (error) {
        return { error };
    }
};

const searchPerformersByName = async function searchPerformers({ searchString, performerType, limit = 10 }) {
    try {
        const type = Boolean(performerType) && Object.values(performerTypes).includes(performerType)
            ? performerType
            : /.+/;
        const result = await PerformerStatistic
            .find({ name: { $regex: `\\b${searchString}.*\\b`, $options: 'i' }, type }, '-_id -__v')
            .sort({ name: 1 })
            .limit(limit)
            .lean();
        return { result };
    } catch (error) {
        return { error };
    }
};

const getInstrumentTopPerformers = async ({quote, limit}) => {
    try {
        const result = await Forecast.aggregate([
            { $match:{ 'expForecast.rate.quote.security': quote }},
            { $group:{ _id: '$author', totalProfitability: { $sum:'$profitabilityPercent' } } },
            { $sort: { totalProfitability: -1 } },
            { $limit: limit },
            { $project:{ name:'$_id', totalProfitability: 1, _id: 0 } }
        ]);
        return { result }
    } catch ( error ) {
        return { error };
    }
};

module.exports = {
    getUserStatistic,
    getInstrumentStatistic,
    getTopPerformersByPeriod,
    getTopPerformersForAllPeriods,
    searchPerformersByName,
    getInstrumentTopPerformers
};
