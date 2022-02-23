const User = require('./user.model')
const jwt = require('jsonwebtoken')
const config = require('./../../config/index')

// handle errors
const handleErrors = (err) => {
  const errors = {
    email: '',
    password: ''
  }

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered'
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect'
  }

  if (err.code === 11000) {
    errors.email = 'that email is already registered'
    return errors
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
  return jwt.sign({ id }, config.secrets.jwt, {
    expiresIn: maxAge
  })
}

const signup = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    const token = createToken(user._id)

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ userId: user._id })
  } catch (e) {
    const errors = handleErrors(e)

    res.status(400).json({ errors })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ userId: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.status(200).send('logout')
}

const verifyToken = async (req, res) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, config.secrets.jwt, async (err, decodedToken) => {
      if (err) {
        res.status(401).end()
      } else {
        const user = await User.findById(decodedToken.id)
        res.json({ email: user.email })
      }
    })
  } else {
    res.status(401).end()
  }
}

module.exports = {
  signup,
  login,
  verifyToken,
  logout
}
