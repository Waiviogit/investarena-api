const { forecasts } = require('./redis');

const getForecasts = async (data) => {
    const res = [];
    const keys = await forecasts.keysAsync(`charts_cache:${data.name}/*`);
    for (const key of keys) {
        let forecast = {};
        if(!key.includes(':expire:') || !key.includes(':expire_')) {
            try{
                forecast = JSON.parse(await forecasts.getAsync(key));
            } catch(error) {
                continue;
            }
            if(forecast.security === data.quote || !data.quote) {
                res.push(forecast);
            }
        }
    }
    return res;
};

module.exports = { getForecasts };
