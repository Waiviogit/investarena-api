const { getActiveForecasts } = require('../models/ForecastModel');

const activeForecasts = async (req, res) => {
    const { forecasts, error } = await getActiveForecasts(req.query);

    if (error) {
        return res.status(422).json({ success: false, errors: error });
    }
    return res.status(200).json({ forecasts: forecasts });

};

module.exports = {
    activeForecasts
};
