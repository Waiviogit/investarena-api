const PerformerStatistic = require('../database').models.PerformerStatistic;
const { periods } = require('../constants/performerStatistic');
const { asyncForEach } = require('../utilities/helpers/common');

const getUserStatistic = async function getUserStaticticByName(userName) {
    try {
        const userStatistic = await PerformerStatistic.find({ id: userName }).lean();
        return { userStatistic };
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
            .find({}, `${period} name type`)
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

// const saveUserStatistic = async function saveUserStatistic(data) {
//     try {
//         const result = await PerformerStatistic
//             .replaceOne(
//                 { id: data.name },
//                 { ...data, id: data.name, type: 'forecaster'},
//                 { upsert: true });
//         return { result: Boolean(result) }
//     } catch (error) {
//         return { error };
//     }
// };
// const saveInstrumentStatistic = async function saveInstrumentStatistic(data) {
//     try {
//         const result = await PerformerStatistic
//             .replaceOne(
//                 { id: data.authorPermlink },
//                 { ...data, id: data.authorPermlink, type: 'instrument' },
//                 { upsert: true });
//         return { result: Boolean(result) }
//     } catch (error) {
//         return { error };
//     }
// };
// const getUserNames = async function getAllUsersWithStatistic() {
//     try {
//         const users = await PerformerStatistic
//             .find({ type: 'forecaster' })
//             .lean();
//         return { userNames: users.map(u => u.name) };
//     } catch (error) {
//         return { error };
//     }
// };

module.exports = {
    getUserStatistic,
    getTopPerformersByPeriod,
    getTopPerformersForAllPeriods,
    // getUserNames,
    // saveUserStatistic,
    // saveInstrumentStatistic,
};
