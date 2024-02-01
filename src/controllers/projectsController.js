import projectsModel from '../models/projectsModel.js'
import { v4 as uuidv4 } from 'uuid'


//GET - Liste todos os projetos
const getAll = (request, response) => {
    const projects = projectsModel.getAll()
    
    return response.status(200).json(projects)
}

//POST - Crie um projeto
const create = (request, response) => {
    const {title, tag, link, description, image, date} = request.body
    
    var project = {
        id: uuidv4(),
        title,
        tag,
        link,
        description,
        image,
        date,
    }

    projectsModel.register(project)

    return response.status(201).send('Projeto Criado!')
}

//GET com ID- Liste UM projeto
const getOne = (request, response) => {
    const projectId = request.params.id

    const project = projectsModel.getOne(projectId)

    return response.status(200).json(project)
}

//PUT - Atualize um projeto
const update = (request, response) => {

    const projectId = request.params.id

    const {title, tag, link, description, image, date} = request.body

    var projectUpdated = {
        id: projectId,
        title,
        tag,
        link,
        description,
        image,
        date,
    }
    
    projectsModel.update(projectId, projectUpdated)

    return response.status(203).send('Projeto Atualizado!')
}

//DELETE - Remova um projeto
const remove = (request, response) => {

    const projectId = request.params.id

    projectsModel.remove(projectId)

    return response.status(201).send('Projeto Removido!')
}

export default {
    create,
    getAll,
    getOne,
    update,
    remove
}