const path = require("path");

module.exports = function (env, argv) {
    return {
        mode: env.mode,
        entry: {
            "app": "./cms/cms.ts"
        },
        output: {
            path: path.resolve(__dirname, "server"),
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
                    use: ["babel-loader", "awesome-typescript-loader"],
                    options: {
                        configFileName: 'tsconfig.server.json'
                    },
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
        plugins: []
    }
}
