const morgan = require('morgan')
const cors = require('cors')
const config = require('./config/index')
const express = require('express')
const cookieParser = require('cookie-parser')
const { json, urlencoded } = require('body-parser')
const { connect } = require('./utils/db')
const noteRouter = require('./resources/note/note.router')
const userRouter = require('./resources/user/user.router')
const requireAuth = require('./middleware/authMiddleware')

const app = express()

app.disable('x-powered-by')

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api', requireAuth)
app.use('/api/note', noteRouter)
app.use('/user', userRouter)

const start = async () => {
  try {
    await connect()

    app.listen(config.port, () => {
      console.log(`Runs on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  start,
  app
}
