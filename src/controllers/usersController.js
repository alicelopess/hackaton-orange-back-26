import usersModel from '../models/usersModel.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const saltRounds = 10

function generateToken(user){
    return jwt.sign({user: user.id}, process.env.JWT_SECRET, {
        expiresIn: 86400,
    })
}

//POST - Cria um novo usuário
const register = async (request, response) => {
    const {email, password, firstName, lastName, profileImage} = request.body
    //Limita tamanho dos textos
    if(email.length > 256 || password.length > 32 || firstName.length > 32 || lastName.length > 32){
        return response.status(400).send({error: "Dados inválidos!"})       
    }
    //Verifica se o nome tem caracteres especiais
    if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(firstName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(lastName)){
        return response.status(400).send({error: "Dados inválidos!"})
    }
    //Verifica se email é válido com REGEX
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return response.status(400).send({error: "E-mail inválido!"})
    } 
    //Verifica se todos os dados foram enviados
    if(!email || !password || !firstName || !lastName){
        return response.status(400).send({error: "Faltaram dados!"})        
    }
    //Verifica se o email já está cadastrado
    const emailAlreadyExists = await usersModel.findOne({email: email})
    if(emailAlreadyExists){
        return response.status(400).send({error: "E-mail já consta na base de dados!"})
    }
    //Verifica se a imagem
    if (!(/image\//g).test(profileImage)){
        return response.status(400).send({error: "Imagem inválida!"})
    }
    if(profileImage && (/image\//g).test(profileImage)){
        const fileLength = Buffer.from(profileImage, 'base64').length;
        if(fileLength/1024 > 1024){
            return response.status(400).send({error: "Imagem inválida!"})
        }
    }
    //cria o hash da senha
    const hash = bcrypt.hashSync(password, saltRounds)
    const user = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        profileImage: "sasa",
        password: hash
    }
    try {
        const newUser = await usersModel.create(user)
        return response.status(201).send({UserID: newUser.id, User: newUser.firstName, message: "Usuário criado!"})
    }
    catch(error) {
        return response.status(500).json({error: error})
    }
    
}
 
const login = async (request, response) => {
    const {email, password} = request.body
    if(email.length > 256 || password.length > 32){
        return response.status(400).send("Dados inválidos!")        
    }
    const user = await usersModel.findOne({email: email})
    if(!user){
        return response.status(400).send("Usuário não encontrado!")
    } else {
        if(bcrypt.compareSync(password, user.password)){
            return response.send({
                id: user.id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                country: user.country,
                token: generateToken({_id: user.id})
            })
        } else {
            return response.status(400).send("Senha incorreta!")
        }
    }
}

//PUT - Atualiza dados de um usuário
const update = (request, response) => {
    const userId = request.params.id
    const {email, password, firstName, lastName} = request.body
    if(request.userId !== userId){
        console.log(request.userId)
        return response.status(403).send("Não permitido")
    }
    // verifica se o email já está cadastrado
    if(email.length > 256 || password.length > 32 || firstName.length > 32 || lastName.length > 32){
        return response.status(400).send("Dados inválidos!")        
    }
    //Verifica se o nome tem caracteres especiais
    if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(firstName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(lastName)){
        return response.status(400).send({error: "Dados inválidos!"})
    }
    //Verifica se email é válido com REGEX
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return response.status(400).send("E-mail inválido!")
    } 
    const emailAlreadyExists = usersModel.findOne(email)
    if(emailAlreadyExists && userId != emailAlreadyExists.id){
        return response.status(400).send("Email already exists!")
    }
    if(!email){
        email = emailAlreadyExists.email
    }
    if(!email){
        password = emailAlreadyExists.password
    }
    if(!firstName){
        firstName = emailAlreadyExists.firstName
    }
    if(!lastName){
        lastName = emailAlreadyExists.lastName
    }
    const userUpdated = {
        email,
        password,
        firstName,
        lastName,
        country,
    }
    usersModel.update(userId, userUpdated)
    return response.status(203).send(userUpdated)
}

export default { register, login, update }