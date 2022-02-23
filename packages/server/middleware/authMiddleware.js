const jwt = require('jsonwebtoken')
const config = require('../config/index')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  // check json web token exists & it is verified
  if (token) {
    jwt.verify(token, config.secrets.jwt, (error, decodedToken) => {
      if (error) {
        res.status(401).end()
      } else {
        next()
      }
    })
  } else {
    res.status(401).end()
  }
}

module.exports = requireAuth
