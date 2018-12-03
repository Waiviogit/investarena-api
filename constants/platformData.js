const domainPlatform = {
    maximarkets: "uat-trading.maximarkets.org",
    umarkets: "uat-trading.umarkets.com"
};
const domainCRM = {
    maximarkets: "test-publicapi.maximarkets.org",
    umarkets: "test-api.umarkets.com"
};

const registrationURI = platform => `https://${domainCRM[platform]}/registration/full`;

const authorisationURI = platform => `https://${domainPlatform[platform]}/auth/`;

const reconnectURI = platform => `https://${domainPlatform[platform]}/auth/`;

const tokenURI = platform => `https://${domainCRM[platform]}/trading/accounts`;

const getPlatformTokenURI = platform => `https://${domainPlatform[platform]}/auth/token`;

const tradingPlatformURI = platform => `https://${domainPlatform[platform]}/login.html`;

// const accountLeadURI = platform => `https://${domainPlatform[platform]}/Account/lead`;

const setTokenURI = platform => `https://${domainPlatform[platform]}/auth/set`;

const authorisationPrefix = { maximarkets: 'maxi..', umarkets: ''};

const linkID = { maximarkets: 'investarena-mm', umarkets: 'investarena-um' };


module.exports = {
    registrationURI,
    authorisationURI,
    reconnectURI,
    tokenURI,
    getPlatformTokenURI,
    tradingPlatformURI,
    setTokenURI,
    authorisationPrefix,
    linkID
};
