const path = require('path')

module.exports = (env, opts) => {
  const config = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'sass-loader',
              options: {
                additionalData: '@import "~/scss/main";'
              }
            }
          ]
        }
      ]
    }
  }
}
