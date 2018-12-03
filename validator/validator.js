const _ = require('lodash');

const requiredFieldsCreate = 'platform,email,password'.split(',');

const validateAuthorisation = (data) => {
    let isValid = true;
    requiredFieldsCreate.forEach(field => {
        if(data[field] === undefined || data[field] === null) isValid = false
    });
    return isValid;
};

module.exports = {
    validateAuthorisation
};