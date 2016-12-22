import webpack from 'webpack';

export default {
  entry: './app',
  output: {
    filename: 'bundle.js',
    path: './publish',
    library: "app"
  },
  devtool: "source-map",
  devServer: {
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   progress: true,
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 8080,
    contentBase: __dirname + "/publish"
  //   stats: 'errors-only',
  },
  plugins: [
    new webpack.ProvidePlugin({_: "lodash"}),
    new webpack.LoaderOptionsPlugin({
       // test: /\.xxx$/, // may apply this only for some modules
       options: {
         loaders: [{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel'
         }]
       }
     })
  ]
}
