const morgan = require('morgan')
const cors = require('cors')
const config = require('./config/index')
const express = require('express')
const { json, urlencoded } = require('body-parser')

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const start = async () => {
  try {
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
