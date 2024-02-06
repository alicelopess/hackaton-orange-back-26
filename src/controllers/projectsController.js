import projectsModel from '../models/projectsModel.js'
import usersModel from '../models/projectsModel.js'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

function getIdFromToken(token){
    const idDecoded = jwt.verify(token, process.env.JWT_SECRET)
    return idDecoded.user
}

const getUserProjects = async (request, response) => {
    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const userIdLogged = getIdFromToken(token)
    try {
        const projects = await projectsModel.find({creatorId: userIdLogged })
        return response.status(201).json(projects)
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

const getAnotherUserProjects = async (request, response) => {
    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const userIdLogged = getIdFromToken(token)
    try {
        const projects = await projectsModel.find({creatorId: { $ne: userIdLogged } })
        return response.status(201).json(projects)
    } catch(error) {
        return response.status(500).json({error: error})
    }
}


//POST - Crie um projeto
const create = async (request, response) => {
    const {title, tag, link, description, image} = request.body
    // validação tamanho das strings
    if(title.length > 50 || tag.length > 2 || tag[0].length > 20 || tag[1].length > 20 || link.length > 2083 || description.length > 200 ){
        return response.status(400).send("Dados inválidos!")        
    }

    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const userIdLogged = getIdFromToken(token)
    const userName = await usersModel.findOne({id: userIdLogged})
    const project = {
        id: uuidv4(),
        title,
        tag,
        link,
        description,
        image,
        creatorName: userName,
        creatorId: userIdLogged,
    }
    try {
        //criando dados
        const newProject = await projectsModel.create(project)
        const projects = await projectsModel.find({creatorId: userIdLogged})
        //devolvendo resposta
        return response.status(201).json({ message: 'Projeto Criado com Sucesso!', data: projects})
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

//PUT - Atualize um projeto
const update = async (request, response) => {
    const projectId = request.params.id
    const {title, tag, link, description, image} = request.body
    if(title.length > 50 || tag.length > 2 || tag[0].length > 20 || tag[1].length > 20 || link.length > 2083 || description.length > 200 ){
        return response.status(400).send("Dados inválidos!")        
    }
    //Verifica se a imagem - Removi pois nao tem imagem no cadastro
     if (!(/image\//g).test(image)){
         return response.status(400).send({error: "Imagem inválida!"})
     }
     if(image && (/image\//g).test(image)){
         const fileLength = Buffer.from(image, 'base64').length;
         if(fileLength/1024 > 102400){
             return response.status(400).send({error: "Imagem inválida!"})
         }
     }
    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const userIdLogged = getIdFromToken(token)

    const creatorProjectId = await projectsModel.findOne({id: projectId})
    
    if(!creatorProjectId){
        return response.status(400).send({error: "ID inválido!"})
    }

    if(creatorProjectId.creatorId !== userIdLogged){
        return response.status(400).send({error: "Esse projeto não é seu!"})
    }

    const project = {
        title,
        tag,
        link,
        description,
        image
    }

    try {
        //criando dados
        const updatedProject = await projectsModel.updateOne({id: projectId}, project)
        //devolvendo resposta
        const projects = await projectsModel.find({creatorId: userIdLogged})
        return response.status(203).send({message: 'Edição concluída com sucesso!', projectsArray: projects})
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

//DELETE - Remova um projeto
const remove = async (request, response) => {
    const projectId = request.params.id
    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const userIdLogged = getIdFromToken(token)
    const project = await projectsModel.findOne({id: projectId})

    if(!project) {
        return response.status(422).json({message: 'Projeto não encontrado!'})
    }
    if(project.creatorId !== userIdLogged){
        return response.status(400).json({message: 'Esse projeto não é seu!'})
    }
    try {
        await projectsModel.deleteOne({id: projectId})
        //devolvendo resposta
        const projects = await projectsModel.find({creatorId: userIdLogged})
        return response.status(200).send({message: 'Projeto Removido com Sucesso!', projectsArray: projects})
    } catch(error) {
        return response.status(500).json({error: error})
    }
}

export default {
    create,
    getUserProjects,
    getAnotherUserProjects,
    update,
    remove
}