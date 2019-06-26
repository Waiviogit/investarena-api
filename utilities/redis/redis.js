const redis = require( 'redis' );
const bluebird = require( 'bluebird' );
const config = require( '../../config' );

bluebird.promisifyAll( redis.RedisClient.prototype );
bluebird.promisifyAll( redis.Multi.prototype );
const forecasts = redis.createClient( process.env.REDISCLOUD_URL );

forecasts.select( config.redis.forecasts );

module.exports = { forecasts };
