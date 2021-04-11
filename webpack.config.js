const path = require('path');

module.exports = {
  // enntry file
  entry: './gentle-app/src/main.js',
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'gentle-dist'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'gentle-app/common'),
          path.resolve(__dirname, 'gentle-app/src/service'),
          path.resolve(__dirname, 'gentle-app/src/component')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  mode: 'development'
};