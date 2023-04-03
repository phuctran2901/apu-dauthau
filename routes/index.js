import express from 'express'
import AppControllers from '../controllers/index.js'

const Route = express.Router()
// const AppControllers = require('../controllers')

Route.get('/getData', AppControllers.getData)
Route.post('/getDetail', AppControllers.getDetail)
Route.post('/getProcuringEntity', AppControllers.getProcuringEntity)

export default Route
