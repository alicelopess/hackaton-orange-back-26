import mongoose from 'mongoose'
const {Schema} = mongoose

//Definição do Schema de Usuário

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
  password: {
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

//Definindo o Model
const User = mongoose.model('User', userSchema)

export default User