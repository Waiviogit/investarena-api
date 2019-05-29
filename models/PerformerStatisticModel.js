const PerformerStatistic = require('../database').models.PerformerStatistic;
const { periods, performerTypes } = require('../constants/performerStatistic');
const { asyncForEach } = require('../utilities/helpers/common');

const getUserStatistic = async function getUserStatisticByName(userName) { // todo: use findOne? - sync with front
    try {
        const userStatistic = await PerformerStatistic
            .find({ id: userName, type: performerTypes.USER }, '-avatar -id -_id -__v')
            .lean();
        return { userStatistic };
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

const getTopPerformersByPeriod = async function getTopPerformersByPeriod( period = 'd1', limit = 5, skip = 0 ) {
    try {
        if(!periods.includes(period)) {
            return { error: new Error('incorrect period param') };
        }
        const result = await PerformerStatistic
            .find({}, `${period} name avatar type id -_id`)
            .sort({ [period]: -1 })
            .limit(limit)
            .skip(skip)
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

const searchPerformersByName = async function searchPerformers(searchString, performerType ) {
    try {
        const type = Boolean(performerType) && Object.values(performerTypes).includes(performerType)
            ? performerType
            : /.+/;
        const result = await PerformerStatistic
            .find({ name: { $regex: `\\b${searchString}.*\\b`, $options: 'i' }, type }, '-_id -__v')
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
