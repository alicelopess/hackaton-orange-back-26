import projectsModel from '../models/projectsModel.js'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

function getIdFromToken(token){
    const idDecoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(idDecoded)
    return idDecoded
}

//GET - Liste todos os projetos
const getAll = async (request, response) => {
    try {
        //listando dados
        const projects = await projectsModel.find()
        //devolvendo resposta
        return response.status(200).json({projetos: projects})
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
    const userIdLogged = getIdFromToken(token)
    const project = {
        title,
        tag,
        link,
        description,
        image,
        creatorId: "id", //receber id do usuaŕio logado
    }
    try {
        //criando dados
        const newProject = await projectsModel.create(project)
        //devolvendo resposta
        return response.status(201).json({ message: 'Projeto Criado com Sucesso!', data: newProject})
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

    var project = {
        id: projectId,
        title,
        tag,
        link,
        description,
        image
    }

    try {
        //criando dados
        const updatedProject = await projectsModel.updateOne({_id: projectId}, project)
        //devolvendo resposta
        return response.status(203).send('Projeto Atualizado!')
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

//DELETE - Remova um projeto
const remove = async (request, response) => {
    const projectId = request.params.id
    const project = await projectsModel.findOne({_id: projectId})

    if(!project) {
        return response.status(422).json({message: 'Projeto não encontrado!'})
    }
    try {
        await projectsModel.deleteOne({_id: projectId})
        //devolvendo resposta
        return response.status(200).send('Projeto Removido com Sucesso!')
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

export default {
    create,
    getAll,
    getOne,
    update,
    remove
}