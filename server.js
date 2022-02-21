const morgan = require('morgan')
const cors = require('cors')
const config = require('./config/index')
const express = require('express')
const { json, urlencoded } = require('body-parser')
const { connect } = require('./utils/db')
const noteRouter = require('./resources/note/note.router')

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/note', noteRouter)

const start = async () => {
  try {
    await connect()

    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  start,
  app
}
