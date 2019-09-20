const PerformerStatistic = require('../database').models.PerformerStatistic;
const { periods, performerTypes } = require('../constants/performerStatistic');
const { asyncForEach } = require('../utilities/helpers/common');
const { uniqStatisticValues } = require('../utilities/helpers/forecastStatisticsHelper');

const getUserStatistic = async function getUserStatisticByName(userName) {
    try {
        const userStatistic = await PerformerStatistic
            .findOne({ id: userName, type: performerTypes.USER }, '-avatar -id -_id -__v')
            .lean();
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

const defaultTopPerformersLimit = 5;
const getTopPerformersByPeriod = async function getTopPerformersByPeriod( period = 'd1', queryLimit = defaultTopPerformersLimit, querySkip = 0 ) {
    try {
        if(!periods.includes(period)) {
            return { error: new Error('incorrect period param') };
        }
        const limit = !isNaN(queryLimit) && queryLimit > 0 ? Number(queryLimit) : defaultTopPerformersLimit;
        const skip = isNaN(querySkip) ? 0 : Number(querySkip);
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
            const { error:getPeriodStatErr, result:statForPeriod} = await getTopPerformersByPeriod(period, 5);
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

const defaultSearchPerformersLimit = 10;
const searchPerformersByName = async function searchPerformers(searchString, performerType, queryLimit = defaultSearchPerformersLimit ) {
    try {
        const type = Boolean(performerType) && Object.values(performerTypes).includes(performerType)
            ? performerType
            : /.+/;
        const limit = queryLimit && isNaN(queryLimit) ? defaultSearchPerformersLimit : Number(queryLimit);
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

module.exports = {
    getUserStatistic,
    getInstrumentStatistic,
    getTopPerformersByPeriod,
    getTopPerformersForAllPeriods,
    searchPerformersByName,
};
