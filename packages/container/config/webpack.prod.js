const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json"); // This will takecare all the shared dependencies

// this is the enviroment variable
// this enviroment variable will be defined when we build our application through CI/CD pipeline
// this contains a string that says exactly where our production application is hosted
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production", // Mode: production will run the webpack differently
  output: {
    /** filename:  ensures that whenever we build some
     * files for production, all the different files that are
     * built are gonna use this as a template to figure out how to name. we do this for caching issue */
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // key needs to match with the first part of import statement inside the container object
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
