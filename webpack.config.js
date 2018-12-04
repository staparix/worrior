const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env, argv) {
    return {
        mode: env.mode,
        entry: {
            "app": "./src/app.ts"
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [
                        path.resolve(__dirname, "src")
                    ],
                    use:["awesome-typescript-loader"]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "WB",
                template: './src/index.html'
            })
        ]
    }
}
