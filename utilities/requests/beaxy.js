const _ = require('lodash');
const axios = require('axios');
const config = require('../../config');
const setCookie = require('set-cookie-parser');


const beaxyAuth = async (data) => {
    try {
        _.get(data, 'credentials.user') ? data.credentials.user = `${config.beaxyPrefix}${data.credentials.user}` : null;
        const result = await axios.post(`${config.beaxyUrl}/auth/v1${data.key}`, JSON.stringify(data.credentials),
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        const { um_session } = setCookie.parse(result, {
            decodeValues: true,
            map: true
        });
        return { result, um_session };
    } catch (error) {
        return { error };
    }
};

module.exports = { beaxyAuth };
