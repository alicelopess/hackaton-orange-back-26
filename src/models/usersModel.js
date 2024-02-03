import mongoose from 'mongoose'
const {Schema} = mongoose
const usersDb = ["Usuário"]


//Definição do Schema de Usuário
/*
const userSchema = new Schema({
  firstName: {
      type: String,
      required: true,
  },
  lastName: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
  },
  country: {
      type: String,
      required: true,
      default: 'Brasil',
  },
  profileImage: {
      type: String,
      default: 'image'
  }, //Precisa ser redefinido
  projects: {
      type: Array,
  }, //Precisa ser redefinido
  createdAt: {
    type: Date,
    default: Date.now(),
},
})
*/

const register = (user) => {
  usersDb.push(user)
}

const findOne = (userEmail) => {
  const index = usersDb.findIndex(user => user.email === userEmail)
  return usersDb[index]
}

const update = (userId, userUpdated) => {
  const index = usersDb.findIndex(user => user.id === userId)
  usersDb[index] = userUpdated
}

export default {
  usersDb,
  register,
  update,
  findOne
}