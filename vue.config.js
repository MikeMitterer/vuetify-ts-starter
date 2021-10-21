const moment = require('moment');
const pkg = require('./package')
const fs = require("fs")
const path = require('path')

const date = moment().format('YYYY.MM.DD HH:mm');

const { generateSW } = require('./.vue/pwa.config')

// const { BASE_PATH, SITE_ORIGIN, META } = require("./src/assets/constants.json");
const isProductionMode = process.env.NODE_ENV === 'production'
const isDevMode = !isProductionMode

// noinspection JSUnresolvedVariable
const isAppInPWAMode = process.env.VUE_APP_USE_PWA_MODE ?? false

// vue inspect zeigt die webpack.js an
const templateParams = {
    VUE_APP_VERSION: pkg.version,
    VUE_APP_DEV_MODE: isDevMode,
    VUE_APP_PUBLISHED: date,
};

// https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
process.env.VUE_APP_VERSION = templateParams.VUE_APP_VERSION;
process.env.VUE_APP_DEV_MODE = templateParams.VUE_APP_DEV_MODE;
process.env.VUE_APP_PUBLISHED = templateParams.VUE_APP_PUBLISHED;

const webPackPluginsToUse = []
if(isAppInPWAMode) {
    webPackPluginsToUse.push( generateSW)
}

// http://bit.ly/2P5Pzdu
module.exports = {
    // By default babel-loader ignores all files inside node_modules.
    // If you want to explicitly transpile a dependency with Babel,
    // you can list it in this option.
    //
    // Ist diese Option nicht aktiv kommt es z.B. zum Fehler:
    //      Module parse failed: Unexpected token
    //
    // wenn 'optional chaining' oder so verwendet wird!!!
    //
    // https://cli.vuejs.org/config/#transpiledependencies
    //
    // Damit transpileDependencies funktioniert muss
    //      @vue/cli-plugin-babel
    //      babel-loader
    // installiert sein
    transpileDependencies: [
        // can be string or regex
        '@mmit\/.*',
    ],

    // Weitere Infos:
    //      https://webpack.js.org/configuration/dev-server/#devserverhttps
    devServer: {
        https: true,
        // host: "localhost",
        host: "mobiad.int.mikemitterer.at",
        cert: fs.readFileSync(path.join(__dirname, ".ssl/mobiad.int.pem")),
        key: fs.readFileSync(path.join(__dirname, ".ssl/mobiad.int.key"))
    },

    configureWebpack: {
        plugins: webPackPluginsToUse
    },


    // Wird z.B. für das Host-UI verwendet
    // outputDir: '../../../../DevJava/Production/WebAppCore/MobiAd/resources/templates',

    // configureWebpack: (config) => {
    //     config.entry = {
    //         app: './src/main.ts',
    //         mobile: './src/mobile.ts',
    //     };
    // },

    // vue inspect - Zeigt die Config an
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            return args.map((arg) => {
                return Object.assign({}, arg, {
                    templateParameters(params) {
                        return Object.assign({}, arg.templateParameters(params), templateParams);
                    },
                });
            });
        });

        // vue inspect entry
        config.entry('app').clear();
        config.entry('app').add('./src/main.ts')
        config.entry('mobile').clear();
        config.entry('mobile').add('./src/mobile.ts')
        
        // config.plugin("vuetify-loader").use(VuetifyLoaderPlugin);
    },

    // configure autoprefixer
    // autoprefixer: {
    //    browsers: ['last 2 versions'],
    //},
};
