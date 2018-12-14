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
            console.log(e.message)
        }
    }
    async authorization(url) {
        try {
            const r = await axios.get(url, {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            if (r.status === 200) {
                const b  = r;
                return {
                    ...r.data,
                    um_session: r.headers["set-cookie"][0].split(';')[0].replace('um_session=',""),
                    WEBSRV: r.headers["set-cookie"][1].split(';')[0].replace('WEBSRV=',"")
                };
            }

        } catch (e) {
            console.log(e.message)
        }
    }
    async registration(url, params) {
        try {
            const r = await axios.get(url, {params}, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
            if (r.status === 200) return r.data;
        } catch (e) {
            console.log(e.message)
        }
    }
    async reconnect (url, body) {
        try {
            const r = await axios.post(url, body, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
            if (r.status === 200) {
                // console.log(r);
                return "platform connected successfully";
            }
        } catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = ApiClient;
