const morgan = require('morgan')
const cors = require('cors')
const config = require('./config/index')
const express = require('express')
const cookieParser = require('cookie-parser')
const { json, urlencoded } = require('body-parser')
const { connect } = require('./utils/db')
const noteRouter = require('./resources/note/note.router')
const userRouter = require('./resources/user/user.router')

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

app.get('/set-cookies', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');
  console.log('Cookie')
  res.cookie('newUser', false)
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

  res.send('you got the cookies!')
})

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies
  console.log(cookies.newUser)

  res.json(cookies)
})

module.exports = {
  start,
  app
}
