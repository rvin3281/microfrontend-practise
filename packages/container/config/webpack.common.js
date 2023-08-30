// this is what is going to take some kind of HTML file inside of our project
//and inject a couple of different script tags inside of it.
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // Whenever we import file ends with an extension of mjs or just js, need too processed by bable.
        exclude: /node_modules/, // Do not run the bable on any files on node module
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
