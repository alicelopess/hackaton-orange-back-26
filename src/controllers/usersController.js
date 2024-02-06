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

function getIdFromToken(token){
    const idDecoded = jwt.verify(token, process.env.JWT_SECRET)
    return idDecoded.user
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

    //cria o hash da senha
    const hash = bcrypt.hashSync(password, saltRounds)
    const user = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        // profileImage,
        password: hash
    }
    try {
        const newUser = await usersModel.create(user)
        return response.status(201).send({UserID: newUser.id, User: newUser.firstName, message: "Usuário criado!"})
        //Redirect .redirect(url) - fiz no front mas precisa mudar
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
                token: generateToken({id: user.id})
            })
            //redirect - pagina incial
        } else {
            return response.status(400).send("Senha incorreta!")
        }
    }
}

//PUT - Atualiza dados de um usuário
const update = async (request, response) => {
    const userId = request.params.id
    const {email, password, firstName, lastName} = request.body
    const authorizationHeader = request.headers['authorization']
    const token = authorizationHeader.split(" ")[1]
    const userIdLogged = getIdFromToken(token)
    if(userIdLogged !== userId){
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
    const emailAlreadyExists = await usersModel.findOne({email})
    if(emailAlreadyExists && userId != emailAlreadyExists.id){
        return response.status(400).send(/* "E-mail já consta na base de dados!" */)
    }
    if(!email){
        email = emailAlreadyExists.email
    }
    if(!password){
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
    }
    await usersModel.updateOne({id: userId}, userUpdated)
    return response.status(203).send(userUpdated)
}

export default { register, login, update }