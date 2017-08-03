/** 
 * Create a webpack config with multiple entries.
 * 
 * @returns {object} The webpack config object to pass on to webpack.
 */
function config(entries) {
  return {
    entry: entries,
    output: {
      filename: '[name].js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ["es2015", "stage-2"],
          },
        },
      ],
    },
  };
}

export default config;