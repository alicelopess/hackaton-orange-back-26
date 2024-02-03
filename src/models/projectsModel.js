import mongoose from 'mongoose'
const { Schema } = mongoose

//Modelagem dos dados do Projeto - Schema
const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'image'
    }, //Precisa ser redefinido
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    creatorId: {
        type: String,
        default: 'userId'
    }, //Precisa ser redefinido
})

//Definindo o Model
const Project = mongoose.model('Project', projectSchema)

export default Project


/*

const projectsDb = []

const getAllMemory = () => {
    return projectsDb
}

const createMemory = (project) => {
    projectsDb.push(project)
}

const getOneMemory = (projectId) => {
    const index = projectsDb.findIndex(project => project.id === projectId)

    return projectsDb[index]
}

const updateMemory = (projectId, projectUpdated) => {
    const index = projectsDb.findIndex(project => project.id === projectId)

    projectsDb[index] = projectUpdated
}

const removeMemory = (projectId) => {
    const index = projectsDb.findIndex(project => project.id === projectId)
  
    if (index > -1) {
        projectsDb.splice(index, 1)
    }
}

export default {
    projectsDb,
    getAllMemory,
    createMemory,
    getOneMemory,
    updateMemory,
    removeMemory
}

*/