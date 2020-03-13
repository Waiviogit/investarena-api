const _ = require('lodash');
const { allowProxyHeaders } = require('../../constants/platformData');

exports.parseHeaders = async (headers) => {
    const exposedHeaders = {};
    _.forEach(allowProxyHeaders, (header) => {
        if (headers[header]) {
            exposedHeaders[header] = headers[header];
        }
    });
    return exposedHeaders;
};
