const wobjectFromInstruments = require('../utilities/helpers/wobjectsFromInstruments');

const createWobjectsInstruments = async function (req, res, next) {
    const result = await wobjectFromInstruments.formatAndCreate(req.body.instruments);
    res.status(200).json(result);
};

module.exports = {createWobjectsInstruments}