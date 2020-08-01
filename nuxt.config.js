//import webpack from 'webpack'
let webpack = require('webpack');
require('dotenv').config();

module.exports = {
    database: process.env.MONGODB || 'mongodb://localhost:27017/',
    //database: "mongodb://127.0.1.1:27017/",
    components: true,
    mode: 'spa',
    server: {
        port: process.env.PORT || 4000, // default: 3000
    },

    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        'element-ui/packages/theme-chalk/src/base.scss',
        'element-ui/packages/theme-chalk/src/pagination.scss',
        'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css',
        '@fortawesome/fontawesome-free/css/all.min.css',
        'vazir-font/dist/font-face.css',
        'vue-popperjs/dist/vue-popper.css',
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui',
        '~/plugins/vuelidate',
        '~/plugins/jalali',
        { src: '~/plugins/notification', mode: 'client' },
        { src: '~/plugins/modal', mode: 'client' },
        { src: '~/plugins/paginate', mode: 'client' },
        { src: '~/plugins/popper', mode: 'client' },
        { src: '~/plugins/clipboard', mode: 'client' },
        { src: '~/plugins/chart.js', mode: 'client', ssr: false },
        //'~/plugins/datepicker'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        //'@nuxtjs/eslint-module'
        '@nuxt/components',
        '@nuxtjs/dotenv',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/proxy',
    ],
    proxy: {
        '/api': { target: 'http://127.0.0.1:4000', pathRewrite: { '^/api': '' } }
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'http://127.0.0.1:4000/api'
            //baseURL: 'https://panel.big-blue.ir/api'
    },
    auth: {
        // Options
        resetOnError: true,
        redirect: {
            login: '/login', // User will be redirected to this path if login is required.
            home: '/', // User will be redirect to this path after login. (rewriteRedirects will rewrite this path)
            logout: '/login', // User will be redirected to this path if after logout, current route is protected.
            user: '/profile',
            callback: '/callback' // User will be redirect to this path by the identity provider after login. (Should match configured Allowed Callback URLs (or similar setting) in your app/client with the identity provider)
        },
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/auth/login',
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: {
                        url: '/auth/user',
                        method: 'GET',
                        propertyName: false
                    }
                },
                tokenRequired: true,
                tokenType: 'Bearer'
            }

        },
    },
    /*
     ** Build configuration
     */
    build: {
        // transpile: [/^element-ui/],
        /*
         ** You can extend webpack config here
         */
        splitChunks: {
            layouts: true
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],
        transpile: ['vue-notification', 'vue-js-modal', 'vuejs-paginate', 'popper', 'vue-popperjs', 'vue-clipboard2', 'clipboard'],
        extend(config, ctx) {}
    },
    serverMiddleware: [
        { path: '/api/rooms', handler: '~/server/api/routes/room.js' },
        { path: '/api/meetings', handler: '~/server/api/routes/meeting.js' },
        { path: '/api/auth', handler: '~/server/api/routes/auth.js' },
        { path: '/api/attendances', handler: '~/server/api/routes/attendance.js' },
        { path: '/api/reports', handler: '~/server/api/routes/report.js' },
    ]
}