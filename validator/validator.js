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

const requiredFieldsRegistration = 'email,password,firstName,lastName,country,phoneCountry,phoneOperator,phoneNumber,platform'.split(',');

const validateRegistration = (data) => {
    let isValid = true;
    requiredFieldsRegistration.forEach(field => {
        if(data[field] === undefined || data[field] === null) isValid = false
    });
    return isValid;
};

const validateInputInstruments = (data) => {
    const requiredInstrumentFields = 'id,type,name,title,avatar'.split(',');
    let isValid = true;
    if (!data.instruments || !Array.isArray(data.instruments) || !data.instruments.length) {
        isValid = false;
    }
    data.instruments.forEach(instrument => {
        if (!instrument) isValid = false;
        requiredInstrumentFields.forEach(field => {
            if (instrument[field] === undefined || instrument[field] === null) isValid = false
        });
    });
    return isValid;
};

module.exports = {
    validateAuthorisation, validateReconnect, validateRegistration, validateInputInstruments
};