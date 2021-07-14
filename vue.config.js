const moment = require('moment');
const package = require('./package');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

// const { BASE_PATH, SITE_ORIGIN, META } = require("./src/assets/constants.json");
const devMode = process.env.NODE_ENV !== 'production';
const date = moment().format('YYYY.MM.DD HH:mm');

// vue inspect zeigt die webpack.js an
const templateParams = {
    VUE_APP_VERSION: package.version,
    VUE_APP_DEV_MODE: devMode,
    VUE_APP_PUBLISHED: date,
};

// https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
process.env.VUE_APP_VERSION = templateParams.VUE_APP_VERSION;
process.env.VUE_APP_DEV_MODE = templateParams.VUE_APP_DEV_MODE;
process.env.VUE_APP_PUBLISHED = templateParams.VUE_APP_PUBLISHED;

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

    // Wird z.B. für das Host-UI verwendet
    // outputDir: '../../../../DevJava/Production/WebAppCore/MobiAd/resources/templates',

    configureWebpack: (config) => {
        config.entry = {
            app: './src/main.ts',
            mobile: './src/mobile.ts',
        };

    },

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

        // config.plugin("vuetify-loader").use(VuetifyLoaderPlugin);
    },

    // configure autoprefixer
    // autoprefixer: {
    //    browsers: ['last 2 versions'],
    //},
};
