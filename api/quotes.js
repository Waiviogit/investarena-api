const axios = require('axios');

const getQuotes = async () => {
    try{
        const result = await axios.get('https://wgt-srv0.beaxy.com/wss/server.ashx?id=0');
        return { result: result.data };
    }catch (error) {
        return { error };
    }
};

const getValidQuoteNames = async () => {
    const quoteNames = [];
    const { result } = await getQuotes();
    if (!result) return { error: 'No data from widgets' };
    result.forEach((quote) => {
        quoteNames.push(quote.Name);
    });
    return { quoteNames };
};

module.exports = { getQuotes, getValidQuoteNames };
