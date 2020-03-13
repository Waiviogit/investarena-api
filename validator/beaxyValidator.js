const Joi = require('@hapi/joi');

exports.socialBeaxySchema = Joi.object().keys({
    platform: Joi.string().valid('beaxy').required(),
    authBy: Joi.string().valid('credentials', '2fa').required(),
    authData: Joi.when('authBy', {
        is: 'credentials',
        then: Joi.object().keys({
            user: Joi.string().required(),
            password: Joi.string().required()
        }),
        otherwise: Joi.object().keys({
            token2fa: Joi.string().required(),
            code: Joi.string().length(6).required()
        })
    })
});
