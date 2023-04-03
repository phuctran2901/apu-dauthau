import express from 'express'
import cors from 'cors'
import http from 'http'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const Route = require('./routes/index')
import Route from './routes/index.js'
const PORT = 5000
app.use('/api', Route)
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('App running is port :', PORT)
})
