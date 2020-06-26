//import webpack from 'webpack'
let webpack = require('webpack');
module.exports = {
    database: "mongodb://localhost:27017/",
    //database: "mongodb://127.0.1.1:27017/",
    components: true,
    mode: 'universal',
    server: {
        port: 4000, // default: 3000
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
        //'~/plugins/datepicker'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        //'@nuxtjs/eslint-module'
        '@nuxt/components'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'http://127.0.0.1:4000/api'
            //baseURL: 'https://panel.big-blue.ir/api'
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
    ]
}