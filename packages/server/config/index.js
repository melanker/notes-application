const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  isDev: env === 'development',
  port: process.env.PORT || 5000,
  secrets: {
    jwt: 'secret should be environment variable'
  },
  dbUrl: 'mongodb+srv://test:test@cluster0.kdqcz.mongodb.net/notes-app'
}

module.exports = baseConfig
