const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  isDev: env === 'development',
  port: process.env.PORT || 5000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  }
}

module.exports = baseConfig
