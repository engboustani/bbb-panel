module.exports = {
    apps: [{
        name: 'bbb', // App name that shows in `pm2 ls`
        exec_mode: 'cluster', // enables clustering
        instances: 'max', // or an integer
        // These are our updated properties
        script: "./node_modules/nuxt/bin/nuxt.js",
        args: "start",
    }],

    deploy: {
        production: {
            ref: 'origin/master',
            repo: 'https://github.com/engboustani/bbb-panel',
            path: 'https://panel.big-blue.ir',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};