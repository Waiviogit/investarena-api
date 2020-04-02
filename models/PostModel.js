const { postRef } = require('../database').models;

const getWithForecastByWobject = async ({ author_permlink, skip, limit }) => {
    try {
        const posts = await postRef
            .find({ post_wobjects: author_permlink })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        return { posts };
    } catch (error) {
        return { error };
    }
};

const getWithForecastByAuthor = async ({ author, skip, limit }) => {
    try {
        const posts = await postRef
            .find({ author })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        return { posts };
    } catch (error) {
        return { error };
    }
};

module.exports = { getWithForecastByWobject, getWithForecastByAuthor };
