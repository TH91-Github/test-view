const path = require('path')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "~": path.resolve("src"),
      },
      extensions: [".js", ".vue", ".json", ".scss"],
    },
  },
}