module.exports = {
    apps : [{
        name: 'investarena-api',
        script: './bin/service.js',

        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        instances: 1,
        watch: false,
        max_memory_restart: '1G',
        env: {
            PORT: '8091'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        env_staging: {
            NODE_ENV: 'staging'
        }
    }],

    deploy : {
        production : {
            user : 'admin',
            host : '157.230.93.18',
            ref  : 'origin/master',
            repo : 'git@github.com:Waiviogit/investarena-api.git',
            path : '/home/admin/investarena-api',
            'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env production'
        },
        staging : {
            user : 'admin',
            host : '35.157.207.192',
            ref  : 'origin/master',
            repo : 'git@github.com:Waiviogit/investarena-api.git',
            path : '/home/admin/investarena-api',
            'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env staging'
        }
    }
};
