const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: 'http://localhost:3000/dist/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.module\.scss$/,
        use: [
          { loader: 'style-loader' }, // to inject the result into the DOM as a style block
          { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                // auto: true,
                exportGlobals: true,
                // localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentName: '[name]__[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                localIdentHashSalt: 'my-custom-hash',
                // namedExport: true,
                // exportLocalsConvention: "camelCaseOnly",
                exportOnlyLocals: false,
              },
            },
          }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
          { loader: 'sass-loader' }, // to convert SASS to CSS
          // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
        ],
      },
      {
        test: /(?<!\.module)\.scss$/,
        use: [
          { loader: 'style-loader' }, // to inject the result into the DOM as a style block
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' }, // to inject the result into the DOM as a style block
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ESLintPlugin()],
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
