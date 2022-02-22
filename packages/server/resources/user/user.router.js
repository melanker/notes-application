const { Router } = require('express')
const { login, signup } = require('./user.controller')

const router = Router()

// /api/user
router
  .route('/signup')
  .post(signup)

// /user/login
router
  .route('/login')
  .post(login)

module.exports = router
