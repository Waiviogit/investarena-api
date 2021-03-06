const axios = require('axios');
const https = require('https');

class ApiClient {
    async getToken(url, body) {
        try {
            const r = await axios.post(url, body);
            if (r.status === 200) {
                return r.data.token;
            }
        } catch (e) {
            if (e.response.status === 401) {
                e.message = 'Incorrect login or password';
            }
            throw e;
        }
    }

    async authorization(url) {
        try {
            const r = await axios.get(url, {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            if (r.status === 200 && r.headers && r.headers[ 'set-cookie' ] && r.headers[ 'set-cookie' ][ 0 ]) {
                return {
                    ...r.data,
                    um_session: r.headers[ 'set-cookie' ][ 0 ].split(';')[ 0 ].replace('um_session=', ''),
                    WEBSRV: r.headers[ 'set-cookie' ][ 1 ] ? r.headers[ 'set-cookie' ][ 1 ].split(';')[ 0 ].replace('WEBSRV=', '') : r.headers[ 'set-cookie' ][ 0 ].split(';')[ 0 ].replace('WEBSRV=', '')
                };
            }

        } catch (e) {
            throw e;
        }
    }

    async registration(url, params) {
        try {
            const r = await axios.get(url, { params }, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
            if (r.status === 200) return r.data;
        } catch (e) {
            throw { message: (e.response && e.response.data && e.response.data.message) || e.message };
        }
    }

    async reconnect(url, body) {
        try {
            const r = await axios.post(url, body, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
            if (r.status === 200) {
                return 'platform connected successfully';
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = ApiClient;
