const { resolve } = require('path')

module.exports = {
    entry: resolve('./', 'src/index.ts'),
    output: {
        path: resolve('./', 'dist'),
        filename: 'hym_utils.js',
        library: 'hymUtils',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                //ts文件使用了babel，ts-loader
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                                        },
                                        'corejs': '3',
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        alias: {
            '@': resolve('./', 'src'),
            'utils': resolve('./src', 'utils')
        },
        extensions: ['.ts', '.js', '.json'],
    },
    optimization: {
        // 表示只导出那些外部使用了的那些成员
        usedExports: true,
        // 压缩模块
        minimize: true,
        // 合并模块
        concatenateModules: true
    },
}