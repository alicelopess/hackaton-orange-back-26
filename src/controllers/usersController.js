import usersModel from '../models/usersModel.js'
import { v4 as uuidv4 } from 'uuid'


//GET - Liste todos os usuários
// temporária
const getAll = (request, response) => {
    const users = usersModel.getAll()
    
    return response.status(200).json(users)
}

//POST - Cria um novo usuário
const create = (request, response) => {
    const {email, password, firstname, lastname, country} = request.body
    var user = {
        id: uuidv4(),
        email,
        password,
        firstname,
        lastname,
        country,
    }
    usersModel.create(user)
    return response.status(201).send("usuário criado")
}

//PUT - Atualiza dados de um usuário
const update = (request, response) => {
    const userId = request.params.id
    const {email, password, firstname, lastname, country} = request.body
    var userUpdated = {
        id: userId,
        email,
        password,
        firstname,
        lastname,
        country,
    }
    usersModel.update(userId, userUpdated)
    return response.status(203)
}

export default {
    create,
    update,
    getAll
}