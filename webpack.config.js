const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [{
      //     loader: "babel-loader",
      //   }],
      // },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      // {
      //   test: /\.(png|img|jpg|jpeg|svg|gif)$/,
      //   use: ["file-loader"],
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      //   loader: "url-loader?limit=100000",
      // },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  devtool: 'eval-cheap-module-source-map',
  mode: 'development'
};
