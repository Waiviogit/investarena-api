const Joi = require( 'joi' );

exports.getInstrumentPerformersSchema = Joi.object().keys( {
    quote: Joi.string().invalid('').required(),
    limit: Joi.number().integer().min( 0 ).default( 5 )
} );
