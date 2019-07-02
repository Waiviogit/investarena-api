const { forecasts } = require( './redis' );

const getForecasts = async ( data ) => {
    const res = [];
    const keys = await forecasts.keysAsync(`charts_cache:${data.name}/*`);
    for (const key of keys) {
        if(!key.includes(':expire:')){
            const forecast = JSON.parse(await forecasts.getAsync(key));
            if(forecast.security === data.currency || !data.currency){
                res.push(forecast);
            }
        }
    }
    return res;
};

module.exports = { getForecasts };
