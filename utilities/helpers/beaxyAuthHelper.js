const _ = require('lodash');
const Beaxy = require('../requests/beaxy');

exports.beaxyStrategy = async (params, res) => {
    const data = {
        key: _.has(params.authData, [ 'password' ]) ? '' : '/2fa',
        credentials: { ...params.authData }
    };
    const { result, um_session } = await Beaxy.beaxyAuth({ ...data });
    if (result && result.status === 200) {
        switch(result.data.response) {
            case 'SUCCESS' :
                if (um_session) {
                    res.setHeader('um_session', um_session.value);
                }
                return res.status(200).json({ result: result.data });
            case 'TWO_FA_VERIFICATION_NEEDED' :
                if(_.get(result, 'data.payload.token2fa')) {
                    return res.status(200).json({ result: result.data });
                }
                return res.status(422).json({ error: { message: '2fa token not provided' } });
            default :
                return res.status(403).json({ error: { message: result.data.response } });
        }
    }
    return res.status(503).json({ error: { message: 'Bad gateway' } });
};
