const axios = require('axios');

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
            const r = await axios.get(url);
            if (r.status === 200) {
                return r.body;
            }

        } catch (e) {
            console.log(e.message)
        }
    }
}

module.exports = ApiClient;
