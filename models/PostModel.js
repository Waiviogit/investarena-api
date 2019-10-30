const Post = require('../database/waivioDb').models.Post;
const DEFAULT_FORECAST_IDENTITY_KEY = 'forecast';

const getWithForecastByWobject = async ({ author_permlink, skip, limit, forecastKey = DEFAULT_FORECAST_IDENTITY_KEY }) => {
    try {
        const posts = await Post
            .find({ 'wobjects.author_permlink': author_permlink, [ forecastKey ]: { $exists: true } })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate({ path: 'fullObjects', select: '-latest_posts' })
            .lean();
        return { posts };
    } catch (error) {
        return { error };
    }
};

const getWithForecastByAuthor = async ({ author, skip, limit, forecastKey = DEFAULT_FORECAST_IDENTITY_KEY }) => {
    try {
        const posts = await Post
            .find({ author, [ forecastKey ]: { $exists: true } })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate({ path: 'fullObjects', select: '-latest_posts' })
            .lean();
        return { posts };
    } catch (error) {
        return { error };
    }
};

const fromAggregation = async (pipeline) => {
    try {
        const result = await Post.aggregate(pipeline);
        return { result };
    } catch (error) {
        return { error };
    }
};

module.exports = { getWithForecastByWobject, fromAggregation, getWithForecastByAuthor };
