const Joi = require('joi');

module.exports = {
    performerStatistic: require('./performerStatisticValidator'),
    postValidator: require('./postValidator'),
    validate: (data, schema, next) => {
        const result = Joi.validate(data, schema);

        if(result.error) {
            const error = { status: 422, message: result.error.message };

            // return { error };
            return next(error);
        }
        return result.value;
    }
};
