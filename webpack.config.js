const path = require('path')
const postcssPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('autoprefixer'),
]

module.exports = {
    entry: './app/assets/scripts/scripts.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
        before: (app, server) => server._watch('./app/**/*.html'),
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '192.168.8.106'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader?url=false', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: postcssPlugins,
                        }
                    }
                }]
            }
        ]
    }
}