import usersModel from '../models/usersModel.js'
import { v4 as uuidv4 } from 'uuid'

//GET - Liste todos os projetos
const getAll = (request, response) => {
    const users = usersModel.getAll()
    return response.status(200).json(users)
}

//POST - Crie um projeto
const create = (request, response) => {
    const {title, tag, link, description, image, date} = request.body
    var user = {
        id: uuidv4(),
        title,
        tag,
        link,
        description,
        image,
        date,
    }
    usersModel.create(user)
    return response.status(201).send('Projeto Criado!')
}

//GET com ID- Liste UM projeto
const getOne = (request, response) => {
    const userId = request.params.id
    const user = usersModel.getOne(userId)
    return response.status(200).json(user)
}

//PUT - Atualize um projeto
const update = (request, response) => {
    const userId = request.params.id
    const {title, tag, link, description, image, date} = request.body
    var userUpdated = {
        id: userId,
        title,
        tag,
        link,
        description,
        image,
        date,
    }
    usersModel.update(userId, userUpdated)
    return response.status(203).send('Projeto Atualizado!')
}

export default {
    getAll,
    create,
    getOne,
    update,
}