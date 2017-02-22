module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "app.bundle.js",
    path: "./dist"
  },
  module:{
    loaders: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
                     presets: ['es2015']
                 }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader"
      }
    ]
  }
};
