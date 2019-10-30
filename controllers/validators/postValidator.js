const Joi = require('joi');

exports.withForecastByUserSchema = Joi.object().keys({
    name: Joi.string().invalid('').required(),
    limit: Joi.number().integer().min(0).default(5),
    skip: Joi.number().integer().min(0).default(0)
});

exports.withForecastByWobjectSchema = Joi.object().keys({
    author_permlink: Joi.string().invalid('').required(),
    limit: Joi.number().integer().min(0).default(5),
    skip: Joi.number().integer().min(0).default(0)
});
