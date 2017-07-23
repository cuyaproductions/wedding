const config = {
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

export default config;