const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizaCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TenserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (!isDev) {
    config.minimizer = [
      new OptimizaCssAssetsPlugin(),
      new TenserWebpackPlugin()
    ]
  }

  return config
}

const filename = ext => isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[hash].${ext}`;

const CSSLoaders = (extra = []) => {
  return [
    {
      loader: MiniCssExtractPlugin.loader, 
      options: {
        hmr: isDev,
        reloadAll: true,
        publicPath: '../'
      }
    },
    'css-loader',
    ...extra
  ]
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.pug',
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: CSSLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: CSSLoaders(['sass-loader'])
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: `static/images/[name]${isDev ? '' : '.[hash]'}.[ext]`
        }
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: `static/icons/[name]${isDev ? '' : '.[hash]'}.[ext]`
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: `static/fonts/[name]${isDev ? '' : '.[hash]'}.[ext]`
        }
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      }
    ]
  }
}