import usersModel from '../models/usersModel.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const saltRounds = 10

function generateToken(user){
    return jwt.sign({user: user.id}, process.env.JWT_SECRET, {
        expiresIn: 86400,
    })
}

//POST - Cria um novo usuário
const register = (request, response) => {
    const {email, password, firstname, lastname} = request.body
    // verifica se o email já está cadastrado

    const emailAlreadyExists = usersModel.findOne(email)
    if(!email || !password || !firstname || !lastname){
        return response.status(400).send("Faltaram dados")        
    }

    if(emailAlreadyExists){
        return response.status(400).send("Email already exists!")
    }
    //cria o hash da senha
    const hash = bcrypt.hashSync(password, saltRounds)
    const user = {
        id: uuidv4(),
        email,
        password: hash,
        firstname,
        lastname,
        country: "Brasil",
    }
    usersModel.register(user)
    return response.send({user, token: generateToken({id: user.id })})
}

const login = (request, response) => {
    const {email, password} = request.body
    const user = usersModel.findOne(email) 
    if(!user){
        return response.status(400).send("Usuário não encontrado!")
    } else {
        if(bcrypt.compareSync(password, user.password)){
            return response.send({ user, token: generateToken({id: user.id})})
        } else {
            return response.status(400).send("Senha incorreta!")
        }
    }
}

//PUT - Atualiza dados de um usuário
const update = (request, response) => {
    const userId = request.params.id
    const {email, password, firstname, lastname, country} = request.body
    // verifica se o email já está cadastrado
    const emailAlreadyExists = usersModel.findOne(email) 
    if(emailAlreadyExists){
        return response.status(400).send("Email already exists!")
    }
    const userUpdated = {
        email,
        password,
        firstname,
        lastname,
        country,
    }
    usersModel.update(userId, userUpdated)
    return response.status(203).send(userUpdated)
}

export default {
    register,
    update,
    login
}