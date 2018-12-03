const requiredFieldsAuthorisation = 'platform,email,password'.split(',');

const validateAuthorisation = (data) => {
    let isValid = true;
    requiredFieldsAuthorisation.forEach(field => {
        if(data[field] === undefined || data[field] === null) isValid = false
    });
    return isValid;
};

const requiredFieldsReconnect = 'su,sp,platform'.split(',');

const validateReconnect = (data) => {
    let isValid = true;
    requiredFieldsReconnect.forEach(field => {
        if(data[field] === undefined || data[field] === null) isValid = false
    });
    return isValid;
};

module.exports = {
    validateAuthorisation, validateReconnect
};