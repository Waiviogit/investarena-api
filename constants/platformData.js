const domainPlatform = {
    maximarkets: 'trading.maximarkets.org/auth/',
    umarkets: 'trading.umarkets.com/auth/',
    maxitrade: 'trading.maxitrade.com/auth/',
    tradeallcrypto: 'trading.tradeallcrypto.com/auth/',
    tradiva: 'trading.tradiva.com/auth/',
    '770capital': 'trading.770capital.com/auth/',
    dowmarkets: 'trading.dowmarkets.com/auth/',
    limefx: 'trading.limefx.com/auth/',
    beaxy: 'uat-exchange.tokenexus.com/auth/v1/by/session'
};
const domainCRM = {
    maximarkets: 'publicapi.maximarkets.org',
    umarkets: 'api.umarkets.com',
    maxitrade: 'api.maxitrade.com',
    tradeallcrypto: 'api.tradeallcrypto.com',
    tradiva: 'api.tradiva.com',
    '770capital': 'api.770capital.com',
    dowmarkets: 'api.dowmarkets.com',
    limefx: 'api.limefx.com'
};

const registrationURI = platform => `https://${domainCRM[ platform ]}/registration/full`;

const authorisationURI = platform => `https://${domainPlatform[ platform ]}`;

const reconnectURI = platform => `https://${domainPlatform[ platform ]}`;

const tokenURI = platform => `https://${domainCRM[ platform ]}/trading/accounts`;

const getPlatformTokenURI = platform => `https://${domainPlatform[ platform ]}token`;


const setTokenURI = platform => `https://${domainPlatform[ platform ]}set`;

const authorisationPrefix = {
    maximarkets: 'maxi..',
    umarkets: '',
    maxitrade: '',
    tradeallcrypto: '',
    tradiva: '',
    '770capital': '',
    dowmarkets: '',
    limefx: ''
};

const linkID = {
    maximarkets: 'investarena-mm',
    umarkets: 'investarena-um',
    maxitrade: 'investarena-mt',
    tradeallcrypto: 'investarena-tc',
    tradiva: 'investarena-td',
    '770capital': 'investarena-sc',
    dowmarkets: 'investarena-dm',
    limefx: 'investarena-lf'
};

const waivioAPIData = {
    production: {
        BASE_API_URL: 'https://www.waivio.com/api',
        GET_MANY_POSTS: '/posts/getMany'
    },
    development: {
        BASE_API_URL: 'https://waiviodev.com/api',
        GET_MANY_POSTS: '/posts/getMany'
    }

};

const allowProxyHeaders = [ 'access-token', 'waivio-auth' ];

module.exports = {
    allowProxyHeaders,
    waivioAPIData: waivioAPIData[ process.env.NODE_ENV || 'development' ],
    registrationURI,
    authorisationURI,
    reconnectURI,
    tokenURI,
    getPlatformTokenURI,
    setTokenURI,
    authorisationPrefix,
    linkID
};
