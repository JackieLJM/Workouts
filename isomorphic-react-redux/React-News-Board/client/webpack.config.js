module.exports = process.env.NODE_ENV === 'production' ? require('./webpack.production.config.js') : require('./webpack.development.config.js');