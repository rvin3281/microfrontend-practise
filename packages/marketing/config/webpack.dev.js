// merge is a functioin that we can use to merge together 2 different webpack config object
/** So this merge function is what's going to allow us to take all the config
 * that we just wrote out inside that common file and merge it together
 * with a configuration that we're about to write inside this development file. */
const { merge } = require("webpack-merge");
// this is what is going to take some kind of HTML file inside of our project
//and inject a couple of different script tags inside of it.
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Require MFP
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// Include webpack common to webpack dev config
const commonConfig = require("./webpack.common");

// Import package.json
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing", // Name of the sub project
      filename: "remoteEntry.js", // Not a good reason
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      }, // decide what file we want to show to the outside world

      // Add shared module here
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
