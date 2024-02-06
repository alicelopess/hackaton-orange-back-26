import mongoose from 'mongoose'
const { Schema } = mongoose

//Modelagem dos dados do Projeto - Schema
const projectSchema = new Schema({
    id: {
        type: String,
        required: true,
      },
    title: {
        type: String,
        required: true,
    },
    tag: { //tag:[String]
        type: String,
        required: true,
    }, //creatorName - Adicao para a tela de Descorbrir
    creatorId: {
        type: String,
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
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

//Definindo o Model
const Project = mongoose.model('Project', projectSchema)

export default Project