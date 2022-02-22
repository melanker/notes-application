const User = require('./user.model')
const jwt = require('jsonwebtoken')
const config = require('./../../config/index')

// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code)
  const errors = {
    email: '',
    password: ''
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
  return jwt.sign({ id }, 'net ninja secret', {
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

  res.send({ message: 'login' })
}

module.exports = {
  signup,
  login
}
