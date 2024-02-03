import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_PASSWORD = process.env.DB_PASSWORD
const MONGO_USER = process.env.DB_USER

const connection = mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@hackathoncluster.ozwj6qs.mongodb.net/?retryWrites=true&w=majority`)
.then(() => console.log('Database Conectado com Sucesso!'))
.catch(() => console.log('Existe algum problema de conexão!'))

export default connection