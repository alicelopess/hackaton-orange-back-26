import express from 'express'
import router from '../routes/router.js'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import cors from 'cors'
import bodyParser from 'body-parser'
import connection from '../models/connection.js'


import options from './swagger.js'

const specs = swaggerJsDoc(options)

const app = express()

app.use(cors()) //habilitando cors na aplicação
app.use(bodyParser.urlencoded({extended: true}))

connection

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(express.json())
app.use(router)

export default app