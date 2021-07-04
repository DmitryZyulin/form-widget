const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

const entry = path.resolve(__dirname, 'src', 'index.tsx')
const outputDir = path.resolve(__dirname, 'dist')

module.exports = env => {
    const isDev = !(env && env.production)

    return [
        {
            experiments: {
                asset: true,
            },
            entry,
            output: {
                filename: 'widget.js',
                path: outputDir,
            },
            mode: isDev ? 'development' : 'production',
            devServer: {
                contentBase: path.join(__dirname, 'dist'),
                port: 3000,
            },

            module: {
                rules: [
                    {
                        test: /\.(js|ts|tsx|jsx)$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                targets: {
                                                    browsers: [
                                                        'IE 11, last 2 versions',
                                                    ],
                                                },
                                                useBuiltIns: 'usage',
                                            },
                                        ],
                                        [
                                            '@babel/typescript',
                                            { jsxPragma: 'h' },
                                        ],
                                    ],
                                    plugins: [
                                        '@babel/proposal-class-properties',
                                        '@babel/proposal-object-rest-spread',
                                        [
                                            '@babel/plugin-transform-react-jsx',
                                            {
                                                pragma: 'h',
                                            },
                                        ],
                                    ],
                                },
                            },
                        ],
                    },
                    {
                        test: /\.css$/i,
                        use: [
                            {
                                loader: 'style-loader',
                                options: { injectType: 'singletonStyleTag' },
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName:
                                            '_fw-[name]-[local]-[hash:base64:5]',
                                    },
                                    sourceMap: isDev,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif)$/i,
                        type: 'asset/resource',
                    },
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/i,
                        type: 'asset/resource',
                    },
                    {
                        test: /\.svg$/i,
                        enforce: 'pre',
                        use: ['preact-svg-loader'],
                    },
                ],
            },

            optimization: {
                minimize: !isDev,
            },
            plugins: isDev
                ? [
                      new CleanWebpackPlugin(),
                      new CopyWebpackPlugin({
                          patterns: [{ from: 'widget/' }],
                      }),
                  ]
                : [],

            resolve: {
                extensions: ['.js', '.ts', '.tsx'],

                modules: ['node_modules', path.join(__dirname, 'src')],
            },
        },
    ]
}
