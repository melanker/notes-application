const { Router } = require('express')
const { login, signup, verifyToken, logout } = require('./user.controller')

const router = Router()

// /user
router
  .route('/signup')
  .post(signup)

// /user/login
router
  .route('/login')
  .post(login)

// user/verify_token
router
  .route('/verify')
  .get(verifyToken)

router
  .route('/logout')
  .get(logout)

module.exports = router
