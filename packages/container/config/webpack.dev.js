// merge is a functioin that we can use to merge together 2 different webpack config object
/** So this merge function is what's going to allow us to take all the config
 * that we just wrote out inside that common file and merge it together
 * with a configuration that we're about to write inside this development file. */
const { merge } = require("webpack-merge");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");

// Import package.json
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // Setup key value pairs for remotes

        // the word marketing before @ symbol must match with the name setup on MFR
        // marketing: key -> write out an import statement inside of our container
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      // Add shared
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
