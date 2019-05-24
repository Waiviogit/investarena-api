const { getUserStatistic } = require('../models/UserStatisticModel');

const getUserForecastStats = async function (req, res, next) {
    const { userStatistic, error } = await getUserStatistic(req.params.userName);
    if(error) {
        return next();
    }
    res.status(200).json(userStatistic);
};

const getTopPerformersByPeriods = async function (req, res, next) {
    return next();
};

module.exports = {
    getUserForecastStats,
    getTopPerformersByPeriods,
};
