require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
var morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const ticketsRouter = require('./api/tickets/tickets.router')
const devicesRouter = require('./api/devices/devices.router')

app.get('/', (req, res) => {
  // console.log('req data:', req)
  return res.status(200).json({
    success: 1,
    data: 'Welcome to Trops Event Manager- No cheating!',
  })
})
app.get('/api', (req, res) => {
  // console.log('req data:', req)
  return res.status(200).json({
    success: 1,
    data: 'Welcome to Trops Event Manager',
  })
})


app.use('/api/tickets', ticketsRouter)
app.use('/api/devices', devicesRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('server up and running on PORT :', port)
})
