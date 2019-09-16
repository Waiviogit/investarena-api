const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { routes } = require('./routes');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use( cors() );
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// error handler
app.use( ( err, req, res ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // render the error page
    res.status( err.status || 500 ).json( { message: err.message } );
} );

module.exports = app;
