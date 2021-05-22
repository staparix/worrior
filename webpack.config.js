const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');

module.exports = function (env, argv) {
    return {
        mode: env.mode,
        entry: {
            "app": "./src/app.tsx"
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[hash].js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.tsx?$/,
                    include: [
                        path.resolve(__dirname, "src")
                    ],
                    use: ["babel-loader", "awesome-typescript-loader"]
                },
                {
                    test: /\.(png|jpg|gif|obj|mtl|babylon)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                prefetch: ['**/*.*'],
                title: "WB",
                template: './src/index.html'
            }),
            new ResourceHintWebpackPlugin(),
            new CopyWebpackPlugin([{
                from: "assets", to: "assets"
            }]),
        ]
    }
}
