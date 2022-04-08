const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/bundle.min.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
              outputPath: "",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
    // host: '127.0.0.1',
    // open: true,
    // hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/assets/index.html",
      minify: {
        mode: "production",
        collapseWhitespace: true,
        removeComments: true,
        rNWrYVqxCXRmKPRaFd1MJhWs4SqUkaf7rd: true,
        rNWrYVqxCXRmKPRaFd1MJhWs4SqUkaf7rd: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      scriptLoading: "defer",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    }),
    new HtmlWebpackPlugin({
      filename: "detail.html",
      template: "src/assets/detail.html",
      minify: {
        mode: "production",
        collapseWhitespace: true,
        removeComments: true,
        rNWrYVqxCXRmKPRaFd1MJhWs4SqUkaf7rd: true,
        rNWrYVqxCXRmKPRaFd1MJhWs4SqUkaf7rd: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      scriptLoading: "defer",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
    }),
    new OptimizeCSSAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/bundle.min.css",
      // chunkFilename: "css/[id].[contenthash].css"
      // chunkFilename: "css/bundle.min.css"
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
    moduleIds: "hashed",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        cache: "dist/cache",
        extractComments: "all",
      }),
    ],
  },
};
