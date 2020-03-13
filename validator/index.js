module.exports = {
    validator: require('./validator'),
    beaxy: require( './beaxyValidator' ),
    validate: ( data, schema ) => {
        const result = schema.validate( data, { abortEarly: false } );

        if( result.error ) return { validation_error: result.error };

        return { params: result.value };
    }
};
