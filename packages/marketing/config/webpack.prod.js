const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commmonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/marketing/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      // This is the name of the remote or federated module. This name is used as a global variable in the container
      name: "marketing",
      //  Specifies the name of the manifest file that the Webpack build will produce for the federated module
      filename: "remoteEntry.js",

      // Defines which modules from the "marketing" build should be exposed for use in other applications
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },

      // Lists which dependencies (libraries, packages) are shared between this build and the container.
      shared: packageJson.dependencies,
      // The "marketing" module can specify which dependencies it's willing to share with a host (container) application.
      // When the host (container) application consumes the "marketing" module, the Module Federation system checks to see if the host already has a compatible version of those shared dependencies.
      // f the host application does have a compatible version, the "marketing" module will use the version from the host instead of loading its own, preventing duplication.
    }),
  ],
};

module.exports = merge(commmonConfig, prodConfig);
