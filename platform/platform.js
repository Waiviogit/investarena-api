const apiClient = require('../api');
const _ = require('lodash');
const sha256 = require('js-sha256');
const { validator } = require('../validator');
const {
    registrationURI,
    authorisationURI,
    reconnectURI,
    tokenURI,
    getPlatformTokenURI,
    tradingPlatformURI,
    setTokenURI,
    authorisationPrefix,
    linkID
} = require('../constants/platformData');

const authorization = async (req, res) => {
    try {
        if(validator.validateAuthorisation(req.body)) {
            const token = await apiClient.getToken(tokenURI(req.body.platform), { email: req.body.email, Password: sha256(req.body.password) });

            const url = `${authorisationURI(req.body.platform)}?user=${authorisationPrefix[ req.body.platform ]}${req.body.email}&pwd=${req.body.password}&t=${new Date().getTime()}&clientType=InvestArena.bc`;

            const result = await apiClient.authorization(url);

            if(!result || !token) {
                res.status(401).json({ error: 'Incorrect authorisation data' });
            } else {
                res.status(200).json({ ...result, token });
            }
        } else {
            res.status(422).json({ error: 'Not enough data' });
        }
    } catch (e) {
        if(e.response && e.response.status && e.response.data && e.response.data.message) {
            res.status(e.response.status).json({ error: e.response.data.message });
        }
        res.status(422).json({ error: e.message });
    }
};

const reconnect = async (req, res) => {
    try {
        if(validator.validateReconnect(req.body)) {
            const connectionData = await apiClient.reconnect(reconnectURI(req.body.platform), { 'su': req.body.stomp_user, 'sp': req.body.stomp_password });

            if(!connectionData) {
                res.status(422).json({ error: 'Data is incorrect' });
            } else {
                res.status(200).json({ connectionData });
            }
        } else {
            res.status(422).json({ error: 'Not enough data' });
        }
    } catch (e) {
        res.status(422).json({ error: e.message });
    }
};

const registration = async (req, res) => {
    try {
        if(validator.validateRegistration(req.body)) {
            const params = req.body;
            const paramsRequest = {
                email: params.email,
                password: params.password,
                terms: true,
                firstName: params.firstName,
                LastName: params.lastName,
                country: params.country,
                PhoneCountry: params.phoneCountry,
                PhoneOperator: params.phoneOperator,
                PhoneNumber: params.phoneNumber,
                LinkId: linkID[ req.body.platform ]
            };
            const connectionData = await apiClient.registration(registrationURI(req.body.platform), paramsRequest);

            if(!connectionData) {
                res.status(422).json({ error: 'Data is incorrect' });
            } else {
                res.status(200).json({ connectionData });
            }
        } else {
            res.status(422).json({ error: 'Not enough data' });
        }
    } catch (e) {
        res.status(422).json({ error: e.message });
    }
    // try {
    //     const transactionStatus = await api.getBlockNumberStream();
    //     console.log(transactionStatus);
    //     if(!transactionStatus){
    //         res.status(422).json({error: 'Data is incorrect'})
    //     } else {
    //         res.status(200).json();
    //     }
    // }
    // catch (e) {
    //     res.status(422).json({error: e.message})
    // }
};

// const getCurrentBlock = async (req, res) => {
//     try {
//         const currentBlockData = await api.getCurrentBlock();
//         if(currentBlockData){
//             _.forEach(currentBlockData.transactions, transaction => {
//                 console.log(transaction.operations[0][0]);
//                 console.log(transaction.operations[0][1]);
//             });
//             res.status(200).json();
//         } else {
//             res.status(422).json({error: 'Data is incorrect'})
//
//         }
//     }
//     catch (e) {
//         res.status(422).json({error: e.message})
//     }
// };

module.exports = {
    registration, authorization, reconnect
};
