import projectsModel from '../models/projectsModel.js'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

function getIdFromToken(token){
    const idDecoded = jwt.verify(token, process.env.JWT_SECRET)
    return idDecoded //idDecoded.user
}

//GET - Liste todos os projetos
const getAll = async (request, response) => { //DEIXOU DE EXISTIR
    try {
        //listando dados
        const projects = await projectsModel.find()
        //devolvendo resposta
        return response.status(200).json(projects)
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

const getAllFromUser = async (request, response) => {
    const userToken = request.headers.authorization.split(" ")[1]
    const user = jwt.decode(userToken)

    try {
        //listando dados
        const projects = await projectsModel.find({creatorId: user.user})
        //devolvendo resposta
        return response.status(200).json(projects)
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

//POST - Crie um projeto
const create = async (request, response) => {
    const {title, tag, link, description, image} = request.body
    // validação tamanho das strings
    // validação de imagem
    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const user = getIdFromToken(token)
    const project = {
        id: uuidv4(),
        title,
        tag,
        link,
        description,
        image,
        creatorId: user.user, //receber id do usuaŕio logado - userIdLogged
    }
    try {
        //criando dados
        const newProject = await projectsModel.create(project)
        const projects = await projectsModel.find({creatorId: user.user})
        //devolvendo resposta
        return response.status(201).json({ message: 'Projeto Criado com Sucesso!', data: projects })
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

//GET com ID- Liste UM projeto
const getOne = async (request, response) => {
    const projectId = request.params.id

    try {
        //criando dados
        const project = await projectsModel.findOne({_id: projectId})
        if(!project) {
            return response.status(422).json({message: 'Projeto não encontrado!'})
        }
        return response.status(200).json(project)
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

//PUT - Atualize um projeto
const update = async (request, response) => {
    const projectId = request.params.id
    const {title, tag, link, description, image} = request.body

    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const user = getIdFromToken(token)

    var project = {
        id: projectId, //REMOVIDO
        title,
        tag,
        link,
        description,
        image
    }

    try {
        //criando dados
        const updatedProject = await projectsModel.updateOne({_id: projectId}, project) //TEM QUE MUDAR O _ID
        const projects = await projectsModel.find({creatorId: user.user})
        //devolvendo resposta
        return response.status(203).send({message: 'Edição concluída com sucesso!', projectsArray: projects})
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

//DELETE - Remova um projeto
const remove = async (request, response) => {
    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const user = getIdFromToken(token)

    const projectId = request.params.id
    const project = await projectsModel.findOne({_id: projectId}) //TEM QUE MUDAR O _ID

    if(!project) {
        return response.status(422).json({message: 'Projeto não encontrado!'})
    }
    try {
        await projectsModel.deleteOne({_id: projectId}) //TEM QUE MUDAR O _ID
        //devolvendo resposta
        const projects = await projectsModel.find({creatorId: user.user})
        return response.status(200).send({message:'Projeto Removido com Sucesso!', projectsArray: projects})
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

export default {
    create,
    getAll,
    getAllFromUser,
    getOne,
    update,
    remove
}