const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const dist = "dist";
const public = "public";
const filename = "bundle.js";
const srcPath = path.resolve(__dirname, "src");
const entry = path.resolve(srcPath, "index.tsx");
const devServerPort = 9002;
const buildPath = path.resolve(__dirname, dist);
const publicPath = path.resolve(__dirname, public);

const isProd = process.env.NODE_ENV === "production";
const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules ? 'css-loader' : {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
      }
    }
  }, {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer']
      }
    }
  }, 'sass-loader'];
}

module.exports = (_, argv) => {
  const cfg = {
    entry: entry,
    target: !isProd ? "web" : "browserslist",
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
      path: buildPath,
    filename,
  }, 
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(false),
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new TsCheckerPlugin(),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new ESLintPlugin(),
    argv.mode !== "production" && new Dotenv(),
    new webpack.DefinePlugin({
      "process.env": "{}",
    })
    // new Dotenv()
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@components': path.join(srcPath, 'components'),
      '@config': path.join(srcPath, 'config'),
      '@hooks': path.join(srcPath, 'hooks'),
      '@store': path.join(srcPath, 'store'),
      '@utils': path.join(srcPath, 'utils'),
      '@pages': path.join(srcPath, 'pages'),
      '@styles': path.join(srcPath, 'styles'),
      '@assets': path.join(srcPath, 'assets'),
    },
  },
  devServer: {
    static: publicPath,
    host: '127.0.0.1',
    port: devServerPort,
    hot: true,
    historyApiFallback: true
  }
  }
  return cfg;
}
