const currentTask = process.env.npm_lifecycle_event;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postcssPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('postcss-hexrgba'),
    require('autoprefixer'),
]

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader?url=false', {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: postcssPlugins,
            }
        }
    }]
}

const pages = fse.readdirSync('./app').filter( file => file.endsWith('.html')).map( page => {
    return new htmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    });
})

class RunAfaterCompilation {
    apply(compiler) {
        compiler.hooks.done.tap("copy images", () => {
            fse.copySync('./app/assets/images', './docs/assets/images')
        })
    }
}

const config = {
    entry: './app/assets/scripts/scripts.js',
    plugins: pages, 
    module: {
        rules: [
            cssConfig
        ]
    },
    
};

if(currentTask == 'dev') {
    cssConfig.use.unshift('style-loader');

    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }

    config.devServer = {
        before: (app, server) => server._watch('./app/**/*.html'),
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 8000,
        host: '192.168.8.106'
    }

    config.mode = "development"
}

if(currentTask == "build" ) {
    
    cssConfig.use.unshift(miniCssExtractPlugin.loader);
    postcssPlugins.push(require('cssnano'));

    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })

    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }

    config.mode = "production"

    config.optimization = {
        splitChunks: {
            chunks: "all"
        }
    }

    config.plugins.push(
        new CleanWebpackPlugin(), 
        new miniCssExtractPlugin({
        filename: 'style.[chunkhash].css'
        }),
        new RunAfaterCompilation(),
    );
}

module.exports = config;