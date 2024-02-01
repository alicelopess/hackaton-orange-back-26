import usersModel from '../models/usersModel.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET = "teste"
const saltRounds = 10

//POST - Cria um novo usuário
const register = (request, response) => {
    const {email, password, firstname, lastname} = request.body

    // verifica se o email já está cadastrado
    const emailAlreadyExists = usersModel.findOne(email) 
    if(emailAlreadyExists){
        return response.status(400).send("Email already exists!")
    }

    //cria o hash da senha
    const hash = bcrypt.hashSync(password, saltRounds);

    const user = {
        id: uuidv4(),
        email,
        password: hash,
        firstname,
        lastname,
        country: "Brasil",
    }
    usersModel.register(user)
    return response.status(201).send(user)
}

const login = (request, response) => {
    const {email, password} = request.body

    const userAlreadyExists = usersModel.findOne(email) 
    if(!userAlreadyExists){
        return response.status(400).send("Usuário não encontrado!")
    } else {
        if(bcrypt.compareSync(password, userAlreadyExists.password)){
            const token = jwt.sign({user: userAlreadyExists.email}, SECRET)
            return response.status(200).send(token)
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
    return response.status(203).send(user)
}

export default {
    register,
    update,
    login
}