import projectsModel from '../models/projectsModel.js'
import { v4 as uuidv4 } from 'uuid'

//GET - Liste todos os projetos
const getAll = (request, response) => {
    const projects = projectsModel.getAll()
    
    return response.status(200).json(projects)
}

//POST - Crie um projeto
const create = (request, response) => {
    const {title, tag, link, description, image} = request.body
    
    var project = {
        id: uuidv4(),
        title,
        tag,
        link,
        description,
        image,
    }

    projectsModel.create(project)

    return response.status(201).send('Projeto Criado!')
}

//PUT - Atualize um projeto
const update = (request, response) => {

    const projectId = request.params.id

    const {title, tag, link, description, image} = request.body

    var projectUpdated = {
        id: projectId,
        title,
        tag,
        link,
        description,
        image,
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
    getAll,
    create,
    update,
    remove
}