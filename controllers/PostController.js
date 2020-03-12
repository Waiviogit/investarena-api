const { PostHelper } = require('../utilities/helpers');
const validators = require('./validators');


const withForecastByUser = async (req, res, next) => {
    const value = validators.validate({
        name: req.params.name,
        skip: req.query.skip,
        limit: req.query.limit
    }, validators.postValidator.withForecastByUserSchema, next);
    if (!value) return;

    const { posts, error } = await PostHelper.getWithForecast(value);

    if (error) return next(error);
    return res.status(200).json(posts);
};

const withForecastByWobject = async (req, res, next) => {
    const value = validators.validate({
        author_permlink: req.params.author_permlink,
        skip: req.query.skip,
        limit: req.query.limit
    }, validators.postValidator.withForecastByWobjectSchema, next);
    if (!value) return;

    const { posts, error } = await PostHelper.getWithForecast(value);

    if (error) return next(error);
    return res.status(200).json(posts);
};

module.exports = {
    withForecastByUser, withForecastByWobject
};
