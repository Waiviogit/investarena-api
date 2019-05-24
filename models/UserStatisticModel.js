const UserStatistic = require('../database').models.UserStatistic;

const save = async function saveUserStatistic(data) {
    try {
        const result = await UserStatistic.replaceOne({ name: data.name }, data, { upsert: true });
        return { result: Boolean(result) }
    } catch (error) {
        return { error };
    }
};

const getUserNames = async function getAllUsersWithStatistic() {
    try {
        const users = await UserStatistic.find().lean();
        return { userNames: users.map(u => u.name) };
    } catch (error) {
        return { error };
    }
};

const getUserStatistic = async function getUserStaticticByName(userName) {
    try {
        const userStatistic = await UserStatistic.find({ name: userName }).lean();
        return { userStatistic };
    } catch (error) {
        return { error };
    }
};

module.exports = {
    save,
    getUserNames,
    getUserStatistic,
};
