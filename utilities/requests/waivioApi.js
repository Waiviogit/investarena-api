const axios = require('axios');

const getData = async (request) => {
    try{
        const result = await axios(request);
        return { result: result.data };
    }catch(error) {
        return { error };
    }
};

module.exports = { getData };
